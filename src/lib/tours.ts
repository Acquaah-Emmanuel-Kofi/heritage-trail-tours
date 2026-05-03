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

const fallbackTours: TourCard[] = [
  {
    id: "ghana-heritage-loop",
    title: "Ghana Heritage Loop",
    description: "Cape Coast, Elmina, and vibrant Accra storytelling experiences.",
    itinerary:
      "Day 1: Arrival in Accra. Day 2: Cape Coast Castle. Day 3: Elmina and Kakum.",
    price: "$1,250 / person",
    duration: "5 days / 4 nights",
    category: "Historical",
    country: "Ghana",
    imageUrl: null,
    featured: true,
  },
  {
    id: "senegal-goree-legacy",
    title: "Senegal Goree Legacy Trail",
    description: "A reflective trip through Dakar and Goree Island's history.",
    itinerary:
      "Day 1: Dakar city immersion. Day 2: Goree Island memory walk. Day 3: Cultural exchange.",
    price: "$1,480 / person",
    duration: "4 days / 3 nights",
    category: "Cultural",
    country: "Senegal",
    imageUrl: null,
    featured: true,
  },
];

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
    return fallbackTours.filter((tour) => {
      if (filters?.country && tour.country !== filters.country) return false;
      if (filters?.category && tour.category !== filters.category) return false;
      return true;
    });
  }
}

export async function getTourById(id: string): Promise<TourCard | null> {
  try {
    const db = getDb();
    const [tour] = await db.select().from(tours).where(eq(tours.id, id)).limit(1);
    return tour ?? null;
  } catch {
    return fallbackTours.find((tour) => tour.id === id) ?? null;
  }
}
