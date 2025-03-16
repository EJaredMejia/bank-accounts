import { db } from "../../src/database/database.ts";

export async function up() {
  await db.schema
    .createTable("bank_account")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("number_account", "text", (col) => col.unique().notNull())
    .addColumn("balance", "real", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("transaction")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("balance_after_transaction", "real", (col) => col.notNull())
    .addColumn("bank_account_id", "integer", (col) =>
      col.references("bank_account.id")
    )
    .addColumn("transaction_type_id", "integer", (col) =>
      col.references("transaction_type.id")
    )
    .execute();

  await db.schema
    .createTable("transaction_type")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "text", (col) => col.unique().notNull())
    .execute();
}

up();
