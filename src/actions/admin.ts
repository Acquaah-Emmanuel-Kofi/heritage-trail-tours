"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "@/db/client";
import { bookings, bookingStatusEnum } from "@/db/schema";
import { getEmailService } from "@/lib/email";
import { getSiteSettings } from "@/lib/site-settings";
import { bookingStatusChangedEmail } from "@/lib/email-templates/status-update";
import { logEmail } from "@/lib/email-logger";

const statusSchema = z.object({
  bookingId: z.string().uuid(),
  status: z.enum(bookingStatusEnum.enumValues),
});

export async function updateBookingStatusAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = statusSchema.safeParse(raw);

  if (!parsed.success) {
    return;
  }

  const db = getDb();

  // Get current booking details before update
  const [currentBooking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, parsed.data.bookingId))
    .limit(1);

  if (!currentBooking) {
    return;
  }

  // Update status
  await db
    .update(bookings)
    .set({ status: parsed.data.status })
    .where(eq(bookings.id, parsed.data.bookingId));

  // Send email notification if status changed
  if (currentBooking.status !== parsed.data.status) {
    const emailService = getEmailService();
    const siteSettings = await getSiteSettings();

    if (emailService && siteSettings && currentBooking.email) {
      const statusEmail = bookingStatusChangedEmail({
        customerName: currentBooking.name,
        tourName: currentBooking.tourId ? "Tour" : "Custom Trip", // Could be enhanced to get actual tour name
        bookingId: parsed.data.bookingId,
        newStatus: parsed.data.status,
        whatsappNumber: siteSettings.whatsappNumber,
      });

      const emailSent = await emailService.sendEmail(
        currentBooking.email,
        statusEmail.subject,
        statusEmail.html
      );

      await logEmail(
        currentBooking.email,
        'booking_status_changed',
        statusEmail.subject,
        emailSent
      );
    }
  }

  revalidatePath("/admin/bookings");
}

const notesSchema = z.object({
  bookingId: z.string().uuid(),
  followUpNotes: z.string().max(3000).optional(),
});

export async function updateBookingNotesAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = notesSchema.safeParse(raw);

  if (!parsed.success) {
    return;
  }

  const db = getDb();
  await db
    .update(bookings)
    .set({ followUpNotes: parsed.data.followUpNotes || null })
    .where(eq(bookings.id, parsed.data.bookingId));

  revalidatePath("/admin/bookings");
}
