import { db } from "../../database/database.ts";
import { DEFAULT_BANK_ACCOUNT_BALANCE } from "./bank-accounts.constants.ts";
import { HTTPException } from "hono/http-exception";

export async function getBankAccountByNumber(numberAccount: string) {
  const bankAccount = await db
    .selectFrom("bank_account")
    .selectAll()
    .where("bank_account.number_account", "=", numberAccount)
    .executeTakeFirst();

  if (!bankAccount) {
    throw new HTTPException(404, { message: "Bank account not found" });
  }

  return bankAccount;
}

export async function createBankAccount() {
  const newBankAccount = await db
    .insertInto("bank_account")
    .values({
      balance: DEFAULT_BANK_ACCOUNT_BALANCE,
      number_account: Date.now().toString(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return newBankAccount;
}
