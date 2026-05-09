import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateTourAction } from "@/actions/tours";
import { getDb } from "@/db/client";
import { tours } from "@/db/schema";

type Props = {
  params: Promise<{ tourId: string }>;
};

export default async function EditTourPage({ params }: Props) {
  const { tourId } = await params;
  let tour: (typeof tours.$inferSelect) | undefined;
  try {
    const db = getDb();
    [tour] = await db.select().from(tours).where(eq(tours.id, tourId)).limit(1);
  } catch {
    tour = undefined;
  }
  if (!tour) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/tours" className="text-sm text-sky-300 underline">
        Back to tours
      </Link>
      <h1 className="mt-3 text-3xl font-bold">Edit Tour</h1>

      <form action={updateTourAction} className="mt-6 space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5">
        <input type="hidden" name="tourId" value={tour.id} />
        <input type="hidden" name="existingImageUrl" value={tour.imageUrl ?? ""} />
        <input name="title" defaultValue={tour.title} placeholder="Tour title" className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        <textarea name="description" defaultValue={tour.description} placeholder="Description" className="h-24 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        <textarea name="itinerary" defaultValue={tour.itinerary} placeholder="Itinerary details" className="h-28 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        <div className="grid gap-3 md:grid-cols-2">
          <input name="price" defaultValue={tour.price} placeholder="Price (display only)" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
          <input name="duration" defaultValue={tour.duration} placeholder="Duration" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
          <input name="category" defaultValue={tour.category} placeholder="Category" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
          <input name="country" defaultValue={tour.country} placeholder="Country" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        </div>
        <label className="block">
          <span className="mb-1 block text-sm text-slate-300">Replace image</span>
          <input type="file" name="image" accept="image/*" className="block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={tour.featured} />
          Featured on homepage
        </label>
        <button className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950">Save changes</button>
      </form>
    </div>
  );
}
