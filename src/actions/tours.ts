"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/db/client";
import { tours } from "@/db/schema";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const baseTourSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(10),
  itinerary: z.string().min(10),
  price: z.string().min(1).max(100),
  duration: z.string().min(1).max(80),
  category: z.string().min(1).max(80),
  country: z.string().min(1).max(80),
});

function getFieldValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getFileValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

function asBoolean(value: FormDataEntryValue | undefined) {
  return value === "on" || value === "true";
}

function isValidImageFile(file: File) {
  return file.size <= MAX_IMAGE_SIZE_BYTES && ALLOWED_IMAGE_TYPES.has(file.type);
}

export async function createTourAction(formData: FormData) {
  const raw = {
    title: getFieldValue(formData, "title"),
    description: getFieldValue(formData, "description"),
    itinerary: getFieldValue(formData, "itinerary"),
    price: getFieldValue(formData, "price"),
    duration: getFieldValue(formData, "duration"),
    category: getFieldValue(formData, "category"),
    country: getFieldValue(formData, "country"),
  };

  const parsed = baseTourSchema.safeParse(raw);
  if (!parsed.success) {
    redirect("/admin/tours/new?error=validation");
  }

  const imageFile = getFileValue(formData, "image");
  let imageUrl: string | null = null;
  if (imageFile) {
    if (!isValidImageFile(imageFile)) {
      redirect("/admin/tours/new?error=image_validation");
    }

    try {
      const uploadResponse = await uploadToCloudinary(imageFile);
      imageUrl = uploadResponse?.secure_url || null;
    } catch {
      redirect("/admin/tours/new?error=image_upload");
    }
    if (!imageUrl) {
      redirect("/admin/tours/new?error=image_upload");
    }
  }

  try {
    const db = getDb();
    await db.insert(tours).values({
      ...parsed.data,
      featured: asBoolean(formData.get("featured") ?? undefined),
      imageUrl,
    });
  } catch {
    redirect("/admin/tours/new?error=server");
  }

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  redirect("/admin/tours?success=created");
}

const updateTourSchema = baseTourSchema.extend({
  tourId: z.string().uuid(),
  existingImageUrl: z.string().optional(),
});

export async function updateTourAction(formData: FormData) {
  const raw = {
    tourId: getFieldValue(formData, "tourId"),
    existingImageUrl: getFieldValue(formData, "existingImageUrl"),
    title: getFieldValue(formData, "title"),
    description: getFieldValue(formData, "description"),
    itinerary: getFieldValue(formData, "itinerary"),
    price: getFieldValue(formData, "price"),
    duration: getFieldValue(formData, "duration"),
    category: getFieldValue(formData, "category"),
    country: getFieldValue(formData, "country"),
  };

  const parsed = updateTourSchema.safeParse(raw);
  if (!parsed.success) {
    redirect(`/admin/tours/${raw.tourId}/edit?error=validation`);
  }

  const imageFile = getFileValue(formData, "image");
  let uploadedImageUrl: string | null = null;
  if (imageFile) {
    if (!isValidImageFile(imageFile)) {
      redirect(`/admin/tours/${raw.tourId}/edit?error=image_validation`);
    }

    try {
      // If there's an existing image, delete it before uploading the new one
      if (parsed.data.existingImageUrl) {
        await deleteFromCloudinary(parsed.data.existingImageUrl);
      }
      const uploadResponse = await uploadToCloudinary(imageFile);
      uploadedImageUrl = uploadResponse?.secure_url || null;
    } catch {
      redirect(`/admin/tours/${raw.tourId}/edit?error=image_upload`);
    }
    if (!uploadedImageUrl) {
      redirect(`/admin/tours/${raw.tourId}/edit?error=image_upload`);
    }
  }

  try {
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
        featured: asBoolean(formData.get("featured") ?? undefined),
        imageUrl: uploadedImageUrl ?? parsed.data.existingImageUrl ?? null,
      })
      .where(eq(tours.id, parsed.data.tourId));
  } catch {
    redirect(`/admin/tours/${raw.tourId}/edit?error=server`);
  }

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  redirect("/admin/tours?success=updated");
}

const deleteSchema = z.object({
  tourId: z.string().uuid(),
});

export async function deleteTourAction(formData: FormData) {
  const parsed = deleteSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return;
  }

  // Delete tour image from Cloudinary if it exists
  const db = getDb();
  const tour = await db.select().from(tours).where(eq(tours.id, parsed.data.tourId)).limit(1).then(res => res[0]);
  if (tour?.imageUrl) {
    await deleteFromCloudinary(tour.imageUrl);
  }

  await db.delete(tours).where(eq(tours.id, parsed.data.tourId));
  revalidatePath("/admin/tours");
  revalidatePath("/tours");
}
