import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { bookings, tours, type BookingStatus } from "@/db/schema";

export type BookingRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  tourTitle: string | null;
  travelersCount: number;
  status: BookingStatus;
  preferences: string | null;
  followUpNotes: string | null;
  createdAt: Date;
};

type BookingFilters = {
  status?: BookingStatus;
  query?: string;
  sort?: "newest" | "oldest" | "travelers";
};

export async function listBookings(filters?: BookingFilters): Promise<BookingRow[]> {
  const db = getDb();
  const whereConditions = [];

  if (filters?.status) {
    whereConditions.push(eq(bookings.status, filters.status));
  }

  if (filters?.query) {
    const q = `%${filters.query}%`;
    whereConditions.push(
      or(ilike(bookings.name, q), ilike(bookings.email, q), ilike(bookings.phone, q)),
    );
  }

  const orderBy =
    filters?.sort === "oldest"
      ? sql`${bookings.createdAt} asc`
      : filters?.sort === "travelers"
        ? sql`${bookings.travelersCount} desc`
        : desc(bookings.createdAt);

  return db
    .select({
      id: bookings.id,
      name: bookings.name,
      email: bookings.email,
      phone: bookings.phone,
      tourTitle: tours.title,
      travelersCount: bookings.travelersCount,
      status: bookings.status,
      preferences: bookings.preferences,
      followUpNotes: bookings.followUpNotes,
      createdAt: bookings.createdAt,
    })
    .from(bookings)
    .leftJoin(tours, eq(bookings.tourId, tours.id))
    .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
    .orderBy(orderBy);
}
