import { db } from "../../src/database/database.ts";

export async function addTypeTransactions() {
  await db
    .insertInto("transaction_type")
    .values([
      {
        name: "withdrawal",
      },
      { name: "deposit" },
    ])
    .onConflict((oc) => oc.column("name").doNothing())
    .execute();
}
