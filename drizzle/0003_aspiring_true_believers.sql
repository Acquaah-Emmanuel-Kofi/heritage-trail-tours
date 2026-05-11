CREATE TABLE "email_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipient" varchar(200) NOT NULL,
	"type" varchar(50) NOT NULL,
	"subject" varchar(200) NOT NULL,
	"success" boolean DEFAULT true NOT NULL,
	"error" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "site_settings" ADD COLUMN "youtube_url" varchar(500);--> statement-breakpoint
ALTER TABLE "site_settings" ADD COLUMN "facebook" varchar(500);--> statement-breakpoint
ALTER TABLE "site_settings" ADD COLUMN "instagram" varchar(500);--> statement-breakpoint
ALTER TABLE "site_settings" ADD COLUMN "tiktok" varchar(500);--> statement-breakpoint
ALTER TABLE "site_settings" ADD COLUMN "phone" varchar(40);