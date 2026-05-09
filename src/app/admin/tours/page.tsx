import Link from "next/link";
import { desc } from "drizzle-orm";
import { deleteTourAction } from "@/actions/tours";
import { getDb } from "@/db/client";
import { tours } from "@/db/schema";

export default async function AdminToursPage() {
  let data: Array<(typeof tours.$inferSelect)> = [];
  try {
    const db = getDb();
    data = await db.select().from(tours).orderBy(desc(tours.createdAt));
  } catch {
    data = [];
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tour Management</h1>
        <Link href="/admin/tours/new" className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950">
          Add Tour
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Country</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Featured</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tour) => (
              <tr key={tour.id} className="border-t border-slate-800">
                <td className="px-3 py-3">{tour.title}</td>
                <td className="px-3 py-3">{tour.country}</td>
                <td className="px-3 py-3">{tour.category}</td>
                <td className="px-3 py-3">{tour.price}</td>
                <td className="px-3 py-3">{tour.featured ? "Yes" : "No"}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/tours/${tour.id}/edit`} className="text-sky-300 underline">
                      Edit
                    </Link>
                    <form action={deleteTourAction}>
                      <input type="hidden" name="tourId" value={tour.id} />
                      <button className="text-rose-300 underline">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No tours yet. Create your first listing.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
