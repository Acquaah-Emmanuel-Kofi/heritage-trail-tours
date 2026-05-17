import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { tours } from "@/db/schema";

export type TourCard = {
  id: string;
  title: string;
  description: string;
  itinerary: string;
  price: string;
  duration: string;
  category: string;
  country: string;
  imageUrl: string | null;
  featured: boolean;
};

export async function listTours(filters?: {
  country?: string;
  category?: string;
}): Promise<TourCard[]> {
  try {
    const db = getDb();
    const data = await db.select().from(tours).orderBy(desc(tours.createdAt));
    return data.filter((tour) => {
      if (filters?.country && tour.country !== filters.country) return false;
      if (filters?.category && tour.category !== filters.category) return false;
      return true;
    });
  } catch {
    return [] as TourCard[];
  }
}

export async function getTourById(id: string): Promise<TourCard | null> {
  try {
    const db = getDb();
    const [tour] = await db.select().from(tours).where(eq(tours.id, id)).limit(1);
    return tour ?? null;
  } catch {
    return null;
  }
}
