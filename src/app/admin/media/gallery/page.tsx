import { desc } from "drizzle-orm";
import {
  deleteGalleryImageAction,
  uploadGalleryImageAction,
} from "@/actions/cms";
import { getDb } from "@/db/client";
import { galleryImages } from "@/db/schema";

export default async function AdminGalleryPage() {
  let images: Array<(typeof galleryImages.$inferSelect)> = [];
  try {
    const db = getDb();
    images = await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));
  } catch {
    images = [];
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Gallery Media</h1>
      <p className="mt-2 text-slate-300">Upload and manage gallery images.</p>

      <form action={uploadGalleryImageAction} className="mt-6 max-w-xl space-y-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        />
        <input
          name="caption"
          placeholder="Caption (optional)"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
        />
        <button className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950">
          Upload image
        </button>
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {images.map((image) => (
          <div key={image.id} className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
            <img src={image.imageUrl} alt={image.caption ?? "Gallery image"} className="h-48 w-full rounded-md object-cover" />
            <p className="mt-2 text-sm text-slate-300">{image.caption || "No caption"}</p>
            <form action={deleteGalleryImageAction} className="mt-3">
              <input type="hidden" name="imageId" value={image.id} />
              <button className="text-sm text-rose-300 underline">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
