import { and, count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { getDb } from "@/db/client";
import { bookings, tours } from "@/db/schema";

type OverviewData = {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  publishedTours: number;
  recentBookings: Array<{
    id: string;
    name: string;
    status: string;
    createdAt: Date;
  }>;
};

async function getOverviewData(): Promise<OverviewData> {
  try {
    const db = getDb();
    const [total] = await db.select({ value: count() }).from(bookings);
    const [pending] = await db
      .select({ value: count() })
      .from(bookings)
      .where(eq(bookings.status, "PENDING"));
    const [confirmed] = await db
      .select({ value: count() })
      .from(bookings)
      .where(eq(bookings.status, "CONFIRMED"));
    const [published] = await db
      .select({ value: count() })
      .from(tours)
      .where(and(eq(tours.featured, true)));
    const recentBookings = await db
      .select({
        id: bookings.id,
        name: bookings.name,
        status: bookings.status,
        createdAt: bookings.createdAt,
      })
      .from(bookings)
      .orderBy(desc(bookings.createdAt))
      .limit(8);

    return {
      totalBookings: total?.value ?? 0,
      pendingBookings: pending?.value ?? 0,
      confirmedBookings: confirmed?.value ?? 0,
      publishedTours: published?.value ?? 0,
      recentBookings,
    };
  } catch {
    return {
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      publishedTours: 0,
      recentBookings: [],
    };
  }
}

export default async function AdminOverviewPage() {
  const data = await getOverviewData();
  const cards = [
    { label: "Total Bookings", value: data.totalBookings },
    { label: "Pending", value: data.pendingBookings },
    { label: "Confirmed", value: data.confirmedBookings },
    { label: "Featured Tours", value: data.publishedTours },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <p className="mt-2 text-slate-300">
        Snapshot of lead intake and tour publishing activity.
      </p>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-2 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm text-sky-300 underline">
            View all bookings
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {data.recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between rounded-md border border-slate-800 px-3 py-2"
            >
              <div>
                <p className="font-semibold">{booking.name}</p>
                <p className="text-xs text-slate-400">{booking.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{booking.status}</p>
                <p className="text-xs text-slate-400">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {data.recentBookings.length === 0 && (
            <p className="text-sm text-slate-400">No booking activity yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
