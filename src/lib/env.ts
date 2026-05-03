import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  WHATSAPP_NUMBER: z.string().min(8).default("233200000000"),
  SITE_EMAIL: z.string().email().default("hello@heritagetrailtours.com"),
  ADMIN_SECRET: z.string().min(8).default("change-me-in-production"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
  SITE_EMAIL: process.env.SITE_EMAIL,
  ADMIN_SECRET: process.env.ADMIN_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
