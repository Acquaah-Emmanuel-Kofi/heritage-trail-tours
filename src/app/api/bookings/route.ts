import { NextResponse } from "next/server";
import { listBookings } from "@/lib/bookings";

export async function GET() {
  try {
    const bookings = await listBookings();
    return NextResponse.json({ data: bookings });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
