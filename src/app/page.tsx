import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { SiteHeader } from "@/components/site/header";
import { listTours } from "@/lib/tours";
import { config } from 'dotenv';

config({ path: '.env.local' });

export default async function Home() {
  const tours = await listTours();
  const featured = tours.filter((tour) => tour.featured).slice(0, 3);
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl space-y-14 px-6 py-10">
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-blue-950 p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-sky-300">
            Heritage Trail Tours
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight">
            Discover African heritage journeys powered by storytelling.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Request your trip in minutes. We follow up directly on WhatsApp to plan your journey.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/tours" className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950">
              Explore Tours
            </Link>
            <Link href="/custom-travel" className="rounded-md border border-slate-400 px-4 py-2">
              Custom Trip Request
            </Link>
          </div>
        </section>

        <FadeIn>
          <section>
          <h2 className="mb-5 text-2xl font-semibold">Featured Tours</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.id}`}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:-translate-y-0.5"
              >
                <p className="text-sm text-emerald-300">{tour.country}</p>
                <h3 className="mt-1 text-lg font-semibold">{tour.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-300">{tour.description}</p>
                <p className="mt-4 text-sm text-slate-400">
                  {tour.duration} · {tour.price}
                </p>
              </Link>
            ))}
          </div>
          </section>
        </FadeIn>
      </main>
    </div>
  );
}
