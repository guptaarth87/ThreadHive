ALTER TABLE `likes` DROP INDEX `unique_like`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('ADMIN','SUPERADMIN','USER') NOT NULL;