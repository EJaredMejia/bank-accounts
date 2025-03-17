import { z } from "zod";
import { TRANSACTION_TYPE } from "../transaction-types/transaction-types.constants.ts";
import { getTransactionType } from "../transaction-types/transaction-types.service.ts";
import { depositTransactionSchema } from "./transactions.schemas.ts";
import { getBankAccountByNumber } from "../bank-accounts/bank-accounts.service.ts";
import { db } from "../../database/database.ts";
import { withdrawalTransactionSchema } from "./transactions.schemas.ts";
import { HTTPException } from "hono/http-exception";
import { jsonBuildObject } from "kysely/helpers/sqlite";

export async function depositTransaction(
  data: z.infer<typeof depositTransactionSchema>
) {
  const [transactionType, bankAccount] = await Promise.all([
    getTransactionType(TRANSACTION_TYPE.DEPOSIT),
    getBankAccountByNumber(data.accountNumber),
  ]);

  const newBalance = bankAccount.balance + data.amount;
  return updateBalance({
    newBalance,
    bankAccountId: bankAccount.id,
    transactionTypeId: transactionType.id,
    amount: data.amount,
  });
}

export async function withdrawalTransaction(
  data: z.infer<typeof withdrawalTransactionSchema>
) {
  const [transactionType, bankAccount] = await Promise.all([
    getTransactionType(TRANSACTION_TYPE.WITHDRAWL),
    getBankAccountByNumber(data.accountNumber),
  ]);

  const newBalance = bankAccount.balance - data.amount;

  if (newBalance < 0) {
    throw new HTTPException(409, { message: "Not enough balance" });
  }

  return updateBalance({
    newBalance,
    bankAccountId: bankAccount.id,
    transactionTypeId: transactionType.id,
    amount: data.amount,
  });
}

export async function getTransactionByAccount(accountNumber: string) {
  const bankAccount = await getBankAccountByNumber(accountNumber);

  const transactions = await db
    .selectFrom("transaction")
    .where("bank_account_id", "=", bankAccount.id)
    .innerJoin(
      "transaction_type",
      "transaction_type.id",
      "transaction.transaction_type_id"
    )
    .select(({ ref }) => [
      "transaction.id",
      "transaction.amount",
      "transaction.balance_after_transaction",
      "transaction.bank_account_id",
      jsonBuildObject({
        id: ref("transaction_type.id"),
        name: ref("transaction_type.name"),
      }).as("transactionType"),
    ])
    .execute();

  return {
    bankAccount,
    transactions,
  };
}

async function updateBalance({
  bankAccountId,
  newBalance,
  transactionTypeId,
  amount,
}: {
  newBalance: number;
  bankAccountId: number;
  transactionTypeId: number;
  amount: number;
}) {
  const transaction = db.transaction();
  const [updatedBankAccount] = await transaction.execute(async (tx) => {
    return await Promise.all([
      tx
        .updateTable("bank_account")
        .where("id", "=", bankAccountId)
        .set({
          balance: newBalance,
        })
        .returningAll()
        .executeTakeFirst(),
      tx
        .insertInto("transaction")
        .values({
          balance_after_transaction: newBalance,
          transaction_type_id: transactionTypeId,
          bank_account_id: bankAccountId,
          amount,
        })
        .execute(),
    ]);
  });

  return updatedBankAccount;
}
