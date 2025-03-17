import { db } from "../../database/database.ts";
import { TRANSACTION_TYPE } from "./transaction-types.constants.ts";

export async function getTransactionType(
  typeName: (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE],
) {
  const transactionType = await db
    .selectFrom("transaction_type")
    .selectAll()
    .where("name", "=", typeName)
    .executeTakeFirstOrThrow();

  return transactionType;
}
