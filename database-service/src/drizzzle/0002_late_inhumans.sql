RENAME TABLE `channel` TO `channels`;--> statement-breakpoint
ALTER TABLE `activities` DROP FOREIGN KEY `activities_channel_id_channel_id_fk`;
--> statement-breakpoint
ALTER TABLE `comments` DROP FOREIGN KEY `comments_channel_id_channel_id_fk`;
--> statement-breakpoint
ALTER TABLE `likes` DROP FOREIGN KEY `likes_channel_id_channel_id_fk`;
--> statement-breakpoint
ALTER TABLE `posts` DROP FOREIGN KEY `posts_channel_id_channel_id_fk`;
--> statement-breakpoint
ALTER TABLE `replies` DROP FOREIGN KEY `replies_channel_id_channel_id_fk`;
--> statement-breakpoint
ALTER TABLE `users_channel_mapping` DROP FOREIGN KEY `users_channel_mapping_channel_id_channel_id_fk`;
--> statement-breakpoint
ALTER TABLE `channels` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `channels` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `activities` ADD CONSTRAINT `activities_channel_id_channels_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_channel_id_channels_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `likes` ADD CONSTRAINT `likes_channel_id_channels_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_channel_id_channels_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replies` ADD CONSTRAINT `replies_channel_id_channels_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_channel_mapping` ADD CONSTRAINT `users_channel_mapping_channel_id_channels_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE cascade ON UPDATE no action;