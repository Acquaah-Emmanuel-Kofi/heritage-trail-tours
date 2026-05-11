import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { siteSettings } from "@/db/schema";

export type SiteSettingsValue = {
  whatsappNumber: string;
  contactEmail: string;
  youtubeUrl?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  phone?: string;
};

export async function getSiteSettings(): Promise<SiteSettingsValue | null> {
  try {
    const db = getDb();
    const [settings] = await db
      .select()
      .from(siteSettings)
      .orderBy(desc(siteSettings.updatedAt))
      .limit(1);

    if (settings) {
      return {
        whatsappNumber: settings.whatsappNumber,
        contactEmail: settings.contactEmail,
        youtubeUrl: settings.youtubeUrl || undefined,
        facebook: settings.facebook || undefined,
        instagram: settings.instagram || undefined,
        tiktok: settings.tiktok || undefined,
        phone: settings.phone || undefined,
      };
    }
  } catch {
    // Fall back to env for local setup without database.
  }

  // Fallback to environment variables if database is not available
  const whatsappNumber = process.env.WHATSAPP_NUMBER;
  const contactEmail = process.env.SITE_EMAIL;

  if (whatsappNumber && contactEmail) {
    return {
      whatsappNumber,
      contactEmail,
      youtubeUrl: process.env.YOUTUBE_URL,
      facebook: process.env.FACEBOOK_URL,
      instagram: process.env.INSTAGRAM_URL,
      tiktok: process.env.TIKTOK_URL,
      phone: process.env.PHONE_NUMBER,
    };
  }

  return null;
}
