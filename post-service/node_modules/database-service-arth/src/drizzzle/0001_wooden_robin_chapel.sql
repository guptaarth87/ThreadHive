ALTER TABLE `activities` DROP FOREIGN KEY `activities_action_by_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `activities` ADD CONSTRAINT `activities_action_by_users_id_fk` FOREIGN KEY (`action_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;