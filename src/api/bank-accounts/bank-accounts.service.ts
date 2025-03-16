import { db } from "../../database/database.ts";
import { bankAccount } from "../../database/models/database.schemas.ts";
import { DEFAULT_BANK_ACCOUNT_BALANCE } from "./bank-accounts.constants.ts";

// export function getBankAccountByNumber(numberAccount: string) {}

export async function createBankAccount() {
  const newBankAccount = await db
    .insert(bankAccount)
    .values({
      balance: DEFAULT_BANK_ACCOUNT_BALANCE,
      numberAccount: Date.now().toString(),
    })
    .returning({
      id: bankAccount.id,
      balance: bankAccount.balance,
      numberAccount: bankAccount.numberAccount,
    });

  return newBankAccount;
}
