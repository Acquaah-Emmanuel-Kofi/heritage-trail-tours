import Link from "next/link";
import { SiteHeader } from "@/components/site/header";

type Props = {
  searchParams: Promise<{
    bookingId?: string;
    tourName?: string;
    wa?: string;
    error?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-14">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
          {params.error ? (
            <>
              <h1 className="text-2xl font-bold text-rose-300">Unable to submit booking</h1>
              <p className="mt-3 text-slate-300">Please return to the tour page and try again.</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Booking Request Received</h1>
              <p className="mt-3 text-slate-300">
                Reference: <span className="font-semibold">{params.bookingId}</span>
              </p>
              <p className="mt-2 text-slate-300">
                Tour: <span className="font-semibold">{params.tourName}</span>
              </p>
              <a
                href={params.wa}
                className="mt-6 inline-flex rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950"
              >
                Continue on WhatsApp
              </a>
            </>
          )}
          <div className="mt-6">
            <Link href="/tours" className="text-sky-300 underline">
              Back to tours
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
