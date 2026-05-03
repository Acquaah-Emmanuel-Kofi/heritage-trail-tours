import { NextResponse } from "next/server";
import { listTours } from "@/lib/tours";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const tours = await listTours({ country, category });
  return NextResponse.json({ data: tours });
}
