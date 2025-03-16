CREATE TABLE `bank_account` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`number_account` text NOT NULL,
	`balance` numeric NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bank_account_number_account_unique` ON `bank_account` (`number_account`);--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`balance_after_transaction` numeric NOT NULL,
	`bank_account_id` integer,
	`transaction_type_id` integer,
	FOREIGN KEY (`bank_account_id`) REFERENCES `bank_account`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transaction_type` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `transaction_type_name_unique` ON `transaction_type` (`name`);