import Link from "next/link";
import { createTourAction } from "@/actions/tours";

export default function NewTourPage() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin/tours" className="text-sm text-sky-300 underline">
        Back to tours
      </Link>
      <h1 className="mt-3 text-3xl font-bold">Create Tour</h1>

      <form action={createTourAction} className="mt-6 space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5">
        <input name="title" placeholder="Tour title" className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        <textarea name="description" placeholder="Description" className="h-24 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        <textarea name="itinerary" placeholder="Itinerary details" className="h-28 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        <div className="grid gap-3 md:grid-cols-2">
          <input name="price" placeholder="Price (display only)" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
          <input name="duration" placeholder="Duration" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
          <input name="category" placeholder="Category" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
          <input name="country" placeholder="Country" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        </div>
        <label className="block">
          <span className="mb-1 block text-sm text-slate-300">Tour image</span>
          <input type="file" name="image" accept="image/*" className="block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" />
          Featured on homepage
        </label>
        <button className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950">Create tour</button>
      </form>
    </div>
  );
}
