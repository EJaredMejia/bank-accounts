import { int, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const bankAccount = sqliteTable("bank_account", {
  id: int().primaryKey({ autoIncrement: true }),

  numberAccount: text('number_account').unique().notNull(),

  balance: real("balance").notNull(),
});

export const transaction = sqliteTable("transaction", {
  id: int().primaryKey({ autoIncrement: true }),

  balanceAfterTransaction: real("balance_after_transaction").notNull(),

  bankAccountId: int("bank_account_id").references(() => bankAccount.id),

  transactionTypeId: int("transaction_type_id").references(
    () => transactionType.id
  ),
});

export const transactionType = sqliteTable("transaction_type", {
  id: int().primaryKey({ autoIncrement: true }),

  name: text().unique().notNull(),
});
