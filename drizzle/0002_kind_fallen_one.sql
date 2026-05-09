CREATE TABLE "gallery_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" text NOT NULL,
	"caption" varchar(240),
	"created_at" timestamp DEFAULT now() NOT NULL
);
