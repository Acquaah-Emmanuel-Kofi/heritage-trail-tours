"use server";

import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "@/db/client";
import { siteSettings, tours } from "@/db/schema";
import { getSiteSettingsValue } from "@/lib/site-settings";

const siteSettingsSchema = z.object({
  whatsappNumber: z.string().min(8),
  contactEmail: z.string().email(),
});

export async function upsertSiteSettingsAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = siteSettingsSchema.safeParse(raw);
  if (!parsed.success) {
    return;
  }

  const selectedTourIds = formData.getAll("featuredTourIds").map((value) => String(value));
  const db = getDb();

  const current = await getSiteSettingsValue();
  const [existing] = await db.select().from(siteSettings).limit(1);

  if (existing) {
    await db
      .update(siteSettings)
      .set({
        whatsappNumber: parsed.data.whatsappNumber,
        contactEmail: parsed.data.contactEmail,
      })
      .where(eq(siteSettings.id, existing.id));
  } else {
    await db.insert(siteSettings).values({
      whatsappNumber: parsed.data.whatsappNumber || current.whatsappNumber,
      contactEmail: parsed.data.contactEmail || current.contactEmail,
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
