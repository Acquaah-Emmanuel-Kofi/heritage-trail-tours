import Link from "next/link";
import { createTourAction } from "@/actions/tours";
import { TourFormSubmitButton } from "@/components/admin/tour-form-submit-button";

const errorMessages: Record<string, string> = {
  validation: "Please complete all required tour fields with valid values.",
  image_validation: "Please upload a valid image file (JPG, PNG, WebP, or GIF) up to 8MB.",
  image_upload: "Unable to upload the tour image. Try again with a smaller file or check your Cloudinary configuration.",
  server: "Unable to create the tour right now. Please try again later.",
};

const successMessages: Record<string, string> = {
  created: "Tour created successfully.",
};

type Props = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function NewTourPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams?.error;
  const success = resolvedSearchParams?.success;

  return (
    <div className="max-w-3xl">
      <Link href="/admin/tours" className="text-sm text-sky-300 underline">
        Back to tours
      </Link>
      <h1 className="mt-3 text-3xl font-bold">Create Tour</h1>

      {error && (
        <div className="rounded-md border border-rose-500 bg-rose-950/50 px-4 py-3 text-sm text-rose-200">
          {errorMessages[error] ?? "There was a problem creating the tour."}
        </div>
      )}
      {success && (
        <div className="rounded-md border border-emerald-500 bg-emerald-950/50 px-4 py-3 text-sm text-emerald-200">
          {successMessages[success] ?? "Tour action completed successfully."}
        </div>
      )}

      <form
        action={createTourAction}
        className="mt-6 space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5"
      >
        <input name="title" maxLength={200} placeholder="Tour title" className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        <textarea name="description" minLength={10} placeholder="Description" className="h-24 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        <textarea name="itinerary" minLength={10} placeholder="Itinerary details" className="h-28 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        <div className="grid gap-3 md:grid-cols-2">
          <input name="price" maxLength={100} placeholder="Price (display only)" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
          <input name="duration" maxLength={80} placeholder="Duration" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
          <input name="category" maxLength={80} placeholder="Category" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
          <input name="country" maxLength={80} placeholder="Country" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" required />
        </div>
        <label className="block">
          <span className="mb-1 block text-sm text-slate-300">Tour image</span>
          <input type="file" name="image" accept="image/jpeg,image/png,image/webp,image/gif" className="block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" />
          <span className="mt-1 block text-xs text-slate-400">Optional. Max file size: 8MB.</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" />
          Featured on homepage
        </label>
        <TourFormSubmitButton idleLabel="Create tour" pendingLabel="Creating tour..." />
      </form>
    </div>
  );
}
