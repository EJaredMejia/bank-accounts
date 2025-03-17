import { addTypeTransactions } from "./type-transaction.seeders.ts";

export async function runSeeders() {
  await addTypeTransactions();
}

runSeeders();
