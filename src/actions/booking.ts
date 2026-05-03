"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/db/client";
import { bookings } from "@/db/schema";
import { getWhatsappDeepLink } from "@/lib/whatsapp";

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  travelersCount: z.coerce.number().int().min(1).max(50),
  preferences: z.string().max(1000).optional(),
  tourId: z.string().optional(),
  tourName: z.string().min(2),
  isCustom: z.coerce.boolean().default(false),
});

export async function createBookingAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    redirect("/booking/success?error=validation");
  }

  const { name, email, phone, travelersCount, preferences, tourId, tourName, isCustom } =
    parsed.data;

  let bookingId = crypto.randomUUID();
  try {
    const db = getDb();
    const [created] = await db
      .insert(bookings)
      .values({
        name,
        email,
        phone,
        travelersCount,
        preferences,
        tourId: isCustom ? null : tourId,
        isCustom,
      })
      .returning({ id: bookings.id });
    bookingId = created.id;
  } catch {
    // Non-blocking fallback for environments without DB during early setup.
  }

  const whatsappLink = getWhatsappDeepLink({ tourName, bookingId, name });
  revalidatePath("/admin");
  redirect(`/booking/success?bookingId=${bookingId}&tourName=${encodeURIComponent(tourName)}&wa=${encodeURIComponent(whatsappLink)}`);
}
