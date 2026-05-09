"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/db/client";
import { tours } from "@/db/schema";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

const baseTourSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  itinerary: z.string().min(10),
  price: z.string().min(1),
  duration: z.string().min(1),
  category: z.string().min(1),
  country: z.string().min(1),
});

function asBoolean(value: FormDataEntryValue | undefined) {
  return value === "on" || value === "true";
}

export async function createTourAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = baseTourSchema.safeParse(raw);
  if (!parsed.success) {
    redirect("/admin/tours/new?error=validation");
  }

  const imageFile = formData.get("image") as File | null;
  const imageUrl = imageFile ? await uploadImageToCloudinary(imageFile) : null;
  const featured = asBoolean(formData.get("featured") ?? undefined);

  const db = getDb();
  await db.insert(tours).values({
    ...parsed.data,
    featured,
    imageUrl,
  });

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  redirect("/admin/tours");
}

const updateTourSchema = baseTourSchema.extend({
  tourId: z.string().uuid(),
  existingImageUrl: z.string().optional(),
});

export async function updateTourAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = updateTourSchema.safeParse(raw);
  if (!parsed.success) {
    redirect(`/admin/tours/${raw.tourId}/edit?error=validation`);
  }

  const imageFile = formData.get("image") as File | null;
  const uploadedImageUrl = imageFile ? await uploadImageToCloudinary(imageFile) : null;
  const featured = asBoolean(formData.get("featured") ?? undefined);

  const db = getDb();
  await db
    .update(tours)
    .set({
      title: parsed.data.title,
      description: parsed.data.description,
      itinerary: parsed.data.itinerary,
      price: parsed.data.price,
      duration: parsed.data.duration,
      category: parsed.data.category,
      country: parsed.data.country,
      featured,
      imageUrl: uploadedImageUrl ?? parsed.data.existingImageUrl ?? null,
    })
    .where(eq(tours.id, parsed.data.tourId));

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  redirect("/admin/tours");
}

const deleteSchema = z.object({
  tourId: z.string().uuid(),
});

export async function deleteTourAction(formData: FormData) {
  const parsed = deleteSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return;
  }

  const db = getDb();
  await db.delete(tours).where(eq(tours.id, parsed.data.tourId));
  revalidatePath("/admin/tours");
  revalidatePath("/tours");
}
