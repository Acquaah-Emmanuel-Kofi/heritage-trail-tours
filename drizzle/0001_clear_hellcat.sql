CREATE TYPE "public"."payment_status" AS ENUM('PENDING', 'PAID', 'ON_ARRIVAL');--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "emergency_contact_name" varchar(120);--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "emergency_contact_phone" varchar(40);--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "guests" jsonb;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "arrival_date" timestamp;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "departure_date" timestamp;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "flight_details" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "accommodation_address" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "pickup_location" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "preferred_tour_date" timestamp;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "private_tour" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "special_interests" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "medical_conditions" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "dietary_restrictions" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "physical_limitations" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "special_assistance" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "payment_status" "payment_status" DEFAULT 'PENDING';--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "payment_id" varchar(100);--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "payment_amount" integer;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "payment_method" varchar(50);--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "promo_code" varchar(50);--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "terms_agreed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "media_consent" boolean DEFAULT false;