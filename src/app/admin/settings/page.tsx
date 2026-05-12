import { desc } from "drizzle-orm";
import { upsertSiteSettingsAction } from "@/actions/settings";
import { getDb } from "@/db/client";
import { siteSettings, tours } from "@/db/schema";
import { config } from 'dotenv';

config({ path: '.env.local' });

export default async function AdminSettingsPage() {
  let settings: (typeof siteSettings.$inferSelect) | undefined;
  let allTours: Array<(typeof tours.$inferSelect)> = [];
  try {
    const db = getDb();
    [settings] = await db.select().from(siteSettings).orderBy(desc(siteSettings.updatedAt)).limit(1);
    allTours = await db.select().from(tours).orderBy(desc(tours.createdAt));
  } catch {
    settings = undefined;
    allTours = [];
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold">Site Settings</h1>
      <p className="mt-2 text-slate-300">Manage contact details and featured tours.</p>

      <form
        action={upsertSiteSettingsAction}
        className="mt-6 space-y-5 rounded-xl border border-slate-800 bg-slate-900/70 p-5"
      >
        <label className="block">
          <span className="mb-1 block text-sm">WhatsApp Number</span>
          <input
            name="whatsappNumber"
            defaultValue={settings?.whatsappNumber ?? process.env.WHATSAPP_NUMBER}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">Contact Email</span>
          <input
            name="contactEmail"
            type="email"
            defaultValue={settings?.contactEmail ?? process.env.SITE_EMAIL}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">Contact Phone</span>
          <input
            name="phone"
            defaultValue={settings?.phone ?? process.env.PHONE_NUMBER}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
            placeholder="+1234567890"
          />
        </label>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Social Media Links</h3>
          <label className="block">
            <span className="mb-1 block text-sm">YouTube URL</span>
            <input
              name="youtubeUrl"
              type="url"
              defaultValue={settings?.youtubeUrl ?? process.env.YOUTUBE_URL}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
              placeholder="https://youtube.com/channel/..."
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">Facebook URL</span>
            <input
              name="facebook"
              type="url"
              defaultValue={settings?.facebook ?? process.env.FACEBOOK_URL}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
              placeholder="https://facebook.com/..."
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">Instagram URL</span>
            <input
              name="instagram"
              type="url"
              defaultValue={settings?.instagram ?? process.env.INSTAGRAM_URL}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
              placeholder="https://instagram.com/..."
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">TikTok URL</span>
            <input
              name="tiktok"
              type="url"
              defaultValue={settings?.tiktok ?? process.env.TIKTOK_URL}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
              placeholder="https://tiktok.com/@..."
            />
          </label>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">Homepage Featured Tours</legend>
          {allTours.map((tour) => (
            <label key={tour.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featuredTourIds" value={tour.id} defaultChecked={tour.featured} />
              {tour.title}
            </label>
          ))}
          {allTours.length === 0 && <p className="text-sm text-slate-400">No tours available yet.</p>}
        </fieldset>

        <button className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950">
          Save settings
        </button>
      </form>
    </div>
  );
}
