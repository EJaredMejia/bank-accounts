import { Generated } from "kysely";

export interface BankAccountTable {
  id: Generated<number>;
  number_account: string;
  balance: number;
}

export interface TransactionTable {
  id: Generated<number>;
  balance_after_transaction: number;
  bank_account_id: number;
  transaction_type_id: number;
}

export interface TransactionTypeTable {
  id: Generated<number>;
  name: string;
}

export interface Database {
  bank_account: BankAccountTable;
  transaction: TransactionTable;
  transaction_type: TransactionTypeTable;
}
