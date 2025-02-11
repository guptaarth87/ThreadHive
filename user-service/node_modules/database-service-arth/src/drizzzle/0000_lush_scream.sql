CREATE TABLE `activities` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`activity` varchar(500) NOT NULL,
	`created_at` timestamp NOT NULL,
	`action_by` bigint NOT NULL,
	`additional_data` json,
	`channel_id` bigint NOT NULL,
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `channel` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp NOT NULL,
	`modified_at` timestamp,
	`deleted_at` timestamp,
	`is_deleted` boolean NOT NULL,
	CONSTRAINT `channel_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`description` varchar(800) NOT NULL,
	`created_at` timestamp NOT NULL,
	`modified_at` timestamp,
	`deleted_at` timestamp,
	`is_deleted` boolean NOT NULL,
	`created_by` bigint NOT NULL,
	`modified_by` bigint NOT NULL,
	`post_id` bigint NOT NULL,
	`channel_id` bigint NOT NULL,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`type` varchar(10) NOT NULL,
	`type_id` bigint NOT NULL,
	`liked_by` bigint NOT NULL,
	`count` bigint NOT NULL,
	`post_id` bigint NOT NULL,
	`channel_id` bigint NOT NULL,
	CONSTRAINT `likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` varchar(100) NOT NULL,
	`description` varchar(800) NOT NULL,
	`created_at` timestamp NOT NULL,
	`modified_at` timestamp,
	`deleted_at` timestamp,
	`is_deleted` boolean NOT NULL,
	`created_by` bigint NOT NULL,
	`modified_by` bigint NOT NULL,
	`channel_id` bigint NOT NULL,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `replies` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`description` varchar(800) NOT NULL,
	`created_at` timestamp NOT NULL,
	`modified_at` timestamp,
	`deleted_at` timestamp,
	`is_deleted` boolean NOT NULL,
	`created_by` bigint NOT NULL,
	`modified_by` bigint NOT NULL,
	`post_id` bigint NOT NULL,
	`comment_id` bigint NOT NULL,
	`channel_id` bigint NOT NULL,
	CONSTRAINT `replies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(500) NOT NULL,
	`role` varchar(10) NOT NULL,
	`created_at` timestamp NOT NULL,
	`dob` date NOT NULL,
	`modified_at` timestamp,
	`deleted_at` timestamp,
	`is_deleted` boolean NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_channel_mapping` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`channel_id` bigint NOT NULL,
	CONSTRAINT `users_channel_mapping_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `activities` ADD CONSTRAINT `activities_action_by_users_id_fk` FOREIGN KEY (`action_by`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `activities` ADD CONSTRAINT `activities_channel_id_channel_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channel`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_modified_by_users_id_fk` FOREIGN KEY (`modified_by`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_post_id_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_channel_id_channel_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channel`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `likes` ADD CONSTRAINT `likes_liked_by_users_id_fk` FOREIGN KEY (`liked_by`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `likes` ADD CONSTRAINT `likes_post_id_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `likes` ADD CONSTRAINT `likes_channel_id_channel_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channel`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_modified_by_users_id_fk` FOREIGN KEY (`modified_by`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_channel_id_channel_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channel`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replies` ADD CONSTRAINT `replies_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replies` ADD CONSTRAINT `replies_modified_by_users_id_fk` FOREIGN KEY (`modified_by`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replies` ADD CONSTRAINT `replies_post_id_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replies` ADD CONSTRAINT `replies_comment_id_comments_id_fk` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replies` ADD CONSTRAINT `replies_channel_id_channel_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channel`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_channel_mapping` ADD CONSTRAINT `users_channel_mapping_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_channel_mapping` ADD CONSTRAINT `users_channel_mapping_channel_id_channel_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channel`(`id`) ON DELETE cascade ON UPDATE no action;