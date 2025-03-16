import { db } from "../database.ts";
import { transactionType } from "../models/database.schemas.ts";

export async function addTypeTransactions() {
  await db
    .insert(transactionType)
    .values([
      {
        name: "withdrawal",
      },
      { name: "deposit" },
    ])
    .onConflictDoNothing();
}
