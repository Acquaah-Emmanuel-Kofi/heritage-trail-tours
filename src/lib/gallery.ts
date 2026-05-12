import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { galleryImages } from "@/db/schema";

export type GalleryImage = {
  id: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
};

export async function listGalleryImages(): Promise<GalleryImage[]> {
  try {
    const db = getDb();
    const data = await db
      .select()
      .from(galleryImages)
      .orderBy(desc(galleryImages.createdAt));
    return data;
  } catch {
    return [];
  }
}