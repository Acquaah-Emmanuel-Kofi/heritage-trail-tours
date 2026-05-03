CREATE TYPE "public"."booking_status" AS ENUM('PENDING', 'CONTACTED', 'CONFIRMED', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"slug" varchar(220) NOT NULL,
	"body" text NOT NULL,
	"cover_image_url" text,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(200) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"tour_id" uuid,
	"travelers_count" integer NOT NULL,
	"preferences" text,
	"is_custom" boolean DEFAULT false NOT NULL,
	"status" "booking_status" DEFAULT 'PENDING' NOT NULL,
	"follow_up_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"whatsapp_number" varchar(40) NOT NULL,
	"contact_email" varchar(200) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"traveler_name" varchar(120) NOT NULL,
	"quote" text NOT NULL,
	"location" varchar(140),
	"published" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"itinerary" text NOT NULL,
	"price" varchar(100) NOT NULL,
	"duration" varchar(80) NOT NULL,
	"category" varchar(80) NOT NULL,
	"country" varchar(80) NOT NULL,
	"image_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE restrict ON UPDATE no action;