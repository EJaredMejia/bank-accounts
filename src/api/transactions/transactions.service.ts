import { z } from "zod";
import { TRANSACTION_TYPE } from "../transaction-types/transaction-types.constants.ts";
import { getTransactionType } from "../transaction-types/transaction-types.service.ts";
import { depostiTransactionSchema } from "./transactions.schemas.ts";
import { getBankAccountByNumber } from "../bank-accounts/bank-accounts.service.ts";
import { db } from "../../database/database.ts";

export async function depositTransaction(
  data: z.infer<typeof depostiTransactionSchema>
) {
  const transactionType = await getTransactionType(TRANSACTION_TYPE.DEPOSIT);

  const bankAccount = await getBankAccountByNumber(data.accountNumber);

  const transaction = db.transaction();

  const newBalance = bankAccount.balance + data.amount;
  const [updatedBankAccount] = await transaction.execute(async (tx) => {
    return await Promise.all([
      tx
        .updateTable("bank_account")
        .where("id", "=", bankAccount.id)
        .set({
          balance: newBalance,
        })
        .returningAll()
        .executeTakeFirst(),
      tx
        .insertInto("transaction")
        .values({
          balance_after_transaction: newBalance,
          transaction_type_id: transactionType.id,
          bank_account_id: bankAccount.id,
        })
        .execute(),
    ]);
  });

  return updatedBankAccount;
}
