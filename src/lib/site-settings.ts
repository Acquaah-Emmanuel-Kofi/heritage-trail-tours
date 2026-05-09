import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { siteSettings } from "@/db/schema";
import { config } from 'dotenv';

config({ path: '.env.local' });

export type SiteSettingsValue = {
  whatsappNumber: string;
  contactEmail: string;
};

export async function getSiteSettingsValue(): Promise<SiteSettingsValue> {
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
      };
    }
  } catch {
    // Fall back to env for local setup without database.
  }

  return {
    whatsappNumber: process.env.WHATSAPP_NUMBER || '',
    contactEmail: process.env.SITE_EMAIL || '',
  };
}
