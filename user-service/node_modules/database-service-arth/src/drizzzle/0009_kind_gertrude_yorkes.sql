ALTER TABLE `activities` DROP FOREIGN KEY `activities_channel_id_channels_id_fk`;
--> statement-breakpoint
ALTER TABLE `activities` DROP COLUMN `channel_id`;