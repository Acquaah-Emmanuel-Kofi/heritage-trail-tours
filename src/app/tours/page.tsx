import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { listTours } from "@/lib/tours";

type Props = {
  searchParams: Promise<{ country?: string; category?: string }>;
};

export default async function ToursPage({ searchParams }: Props) {
  const params = await searchParams;
  const tours = await listTours({
    country: params.country,
    category: params.category,
  });

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold">Tour Listing</h1>
        <p className="mt-2 text-slate-300">Filter by country and category using query params.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.id}`}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <p className="text-sm text-emerald-300">
                {tour.country} · {tour.category}
              </p>
              <h2 className="mt-1 text-xl font-semibold">{tour.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{tour.description}</p>
              <p className="mt-3 text-sm text-slate-400">
                {tour.duration} · {tour.price}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
