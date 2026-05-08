import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { getTourById } from "@/lib/tours";

type Props = {
  params: Promise<{ tourId: string }>;
};

export default async function TourDetailPage({ params }: Props) {
  const { tourId } = await params;
  const tour = await getTourById(tourId);
  if (!tour) notFound();

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr]">
        <section>
          <p className="text-sm text-emerald-300">
            {tour.country} · {tour.category}
          </p>
          <h1 className="mt-1 text-3xl font-bold">{tour.title}</h1>
          <p className="mt-4 text-slate-300">{tour.description}</p>
          <p className="mt-4 text-slate-300">{tour.itinerary}</p>
          <p className="mt-4 text-sm text-slate-400">
            {tour.duration} · {tour.price}
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold">Request Booking</h2>
          <BookingWizard tourId={tour.id} tourName={tour.title} />
        </section>
      </main>
    </div>
  );
}
