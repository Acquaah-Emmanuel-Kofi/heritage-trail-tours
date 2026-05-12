"use server";

import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "@/db/client";
import { siteSettings, tours } from "@/db/schema";
import { getSiteSettings } from "@/lib/site-settings";

const siteSettingsSchema = z.object({
  whatsappNumber: z.string().min(8),
  contactEmail: z.string().email(),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  tiktok: z.string().url().optional().or(z.literal("")),
  phone: z.string().optional(),
});

export async function upsertSiteSettingsAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = siteSettingsSchema.safeParse(raw);
  if (!parsed.success) {
    return;
  }

  const selectedTourIds = formData.getAll("featuredTourIds").map((value) => String(value));
  const db = getDb();

  const current = await getSiteSettings() || {
    whatsappNumber: process.env.WHATSAPP_NUMBER || '',
    contactEmail: process.env.SITE_EMAIL || '',
  };
  const [existing] = await db.select().from(siteSettings).limit(1);

  if (existing) {
    await db
      .update(siteSettings)
      .set({
        whatsappNumber: parsed.data.whatsappNumber,
        contactEmail: parsed.data.contactEmail,
        youtubeUrl: parsed.data.youtubeUrl || null,
        facebook: parsed.data.facebook || null,
        instagram: parsed.data.instagram || null,
        tiktok: parsed.data.tiktok || null,
        phone: parsed.data.phone || null,
      })
      .where(eq(siteSettings.id, existing.id));
  } else {
    await db.insert(siteSettings).values({
      whatsappNumber: parsed.data.whatsappNumber || current.whatsappNumber,
      contactEmail: parsed.data.contactEmail || current.contactEmail,
      youtubeUrl: parsed.data.youtubeUrl || null,
      facebook: parsed.data.facebook || null,
      instagram: parsed.data.instagram || null,
      tiktok: parsed.data.tiktok || null,
      phone: parsed.data.phone || null,
    });
  }

  await db.update(tours).set({ featured: false });
  if (selectedTourIds.length > 0) {
    await db.update(tours).set({ featured: true }).where(inArray(tours.id, selectedTourIds));
  }

  revalidatePath("/admin/settings");
  revalidatePath("/admin/tours");
  revalidatePath("/");
  revalidatePath("/tours");
}
