"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "@/db/client";
import { bookings, bookingStatusEnum } from "@/db/schema";

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
  await db
    .update(bookings)
    .set({ status: parsed.data.status })
    .where(eq(bookings.id, parsed.data.bookingId));

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
