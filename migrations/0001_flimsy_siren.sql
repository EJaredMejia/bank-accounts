PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_bank_account` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`number_account` text NOT NULL,
	`balance` real NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_bank_account`("id", "number_account", "balance") SELECT "id", "number_account", "balance" FROM `bank_account`;--> statement-breakpoint
DROP TABLE `bank_account`;--> statement-breakpoint
ALTER TABLE `__new_bank_account` RENAME TO `bank_account`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `bank_account_number_account_unique` ON `bank_account` (`number_account`);--> statement-breakpoint
CREATE TABLE `__new_transaction` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`balance_after_transaction` real NOT NULL,
	`bank_account_id` integer,
	`transaction_type_id` integer,
	FOREIGN KEY (`bank_account_id`) REFERENCES `bank_account`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_transaction`("id", "balance_after_transaction", "bank_account_id", "transaction_type_id") SELECT "id", "balance_after_transaction", "bank_account_id", "transaction_type_id" FROM `transaction`;--> statement-breakpoint
DROP TABLE `transaction`;--> statement-breakpoint
ALTER TABLE `__new_transaction` RENAME TO `transaction`;