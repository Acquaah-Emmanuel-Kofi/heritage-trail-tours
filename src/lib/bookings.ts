import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { bookings, type BookingStatus } from "@/db/schema";

export type BookingRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  travelersCount: number;
  status: BookingStatus;
  preferences: string | null;
  createdAt: Date;
};

export async function listBookings(): Promise<BookingRow[]> {
  const db = getDb();
  return db.select().from(bookings).orderBy(desc(bookings.createdAt));
}
