ALTER TABLE `likes` MODIFY COLUMN `type` enum('post','comment','reply') NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('ADMIN','USER','SUPERADMIN') NOT NULL;