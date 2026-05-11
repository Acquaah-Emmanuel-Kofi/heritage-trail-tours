import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { testimonials } from "@/db/schema";

export type Testimonial = {
  id: string;
  travelerName: string;
  quote: string;
  location: string | null;
  published: boolean;
};

export async function listPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    const db = getDb();
    const data = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.published, true))
      .orderBy(desc(testimonials.id));
    return data;
  } catch {
    return [];
  }
}