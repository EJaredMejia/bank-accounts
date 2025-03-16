import { addTypeTransactions } from "./type-transaction.seeders.ts";

async function runSeeders() {
  await addTypeTransactions();
}

runSeeders();
