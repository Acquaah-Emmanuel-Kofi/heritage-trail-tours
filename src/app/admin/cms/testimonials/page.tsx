import { desc } from "drizzle-orm";
import {
  createTestimonialAction,
  deleteTestimonialAction,
  toggleTestimonialPublishedAction,
} from "@/actions/cms";
import { getDb } from "@/db/client";
import { testimonials } from "@/db/schema";

export default async function AdminTestimonialsPage() {
  let items: Array<(typeof testimonials.$inferSelect)> = [];
  try {
    const db = getDb();
    items = await db.select().from(testimonials).orderBy(desc(testimonials.id));
  } catch {
    items = [];
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Testimonials</h1>
      <p className="mt-2 text-slate-300">Manage traveler testimonials for trust and social proof.</p>

      <form action={createTestimonialAction} className="mt-6 space-y-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <input name="travelerName" placeholder="Traveler name" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
        <input name="location" placeholder="Location (optional)" className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
        <textarea name="quote" placeholder="Testimonial quote" required className="h-24 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked />
          Published
        </label>
        <button className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950">
          Add testimonial
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-3 py-2">Traveler</th>
              <th className="px-3 py-2">Quote</th>
              <th className="px-3 py-2">Published</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-slate-800">
                <td className="px-3 py-2">
                  <p>{item.travelerName}</p>
                  <p className="text-xs text-slate-400">{item.location ?? "-"}</p>
                </td>
                <td className="max-w-[460px] px-3 py-2 text-slate-300">{item.quote}</td>
                <td className="px-3 py-2">{item.published ? "Yes" : "No"}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-3">
                    <form action={toggleTestimonialPublishedAction}>
                      <input type="hidden" name="testimonialId" value={item.id} />
                      <input type="hidden" name="published" value={String(item.published)} />
                      <button className="text-sky-300 underline">
                        {item.published ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <form action={deleteTestimonialAction}>
                      <input type="hidden" name="testimonialId" value={item.id} />
                      <button className="text-rose-300 underline">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
