import { db } from "../../database/database.ts";
import { DEFAULT_BANK_ACCOUNT_BALANCE } from "./bank-accounts.constants.ts";

// export function getBankAccountByNumber(numberAccount: string) {}

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
