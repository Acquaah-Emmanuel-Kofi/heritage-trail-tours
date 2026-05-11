import { updateBookingNotesAction, updateBookingStatusAction } from "@/actions/admin";
import { listBookings } from "@/lib/bookings";
import { getWhatsappDeepLink } from "@/lib/whatsapp";

const statuses = ["PENDING", "CONTACTED", "CONFIRMED", "CANCELLED"] as const;

type Props = {
  searchParams: Promise<{
    status?: (typeof statuses)[number];
    sort?: "newest" | "oldest" | "travelers";
    q?: string;
  }>;
};

export default async function AdminBookingsPage({ searchParams }: Props) {
  const params = await searchParams;
  const bookings = await listBookings({
    status: params.status,
    sort: params.sort,
    query: params.q,
  }).catch(() => []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Booking Dashboard</h1>
      <p className="mt-2 text-slate-300">
        Manage lead statuses, follow-up notes, and WhatsApp outreach.
      </p>

      <form className="mt-5 grid gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 md:grid-cols-4">
        <input
          type="text"
          name="q"
          defaultValue={params.q}
          placeholder="Search name, email, phone"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
        />
        <select
          name="status"
          defaultValue={params.status ?? ""}
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
        >
          <option value="">All statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          name="sort"
          defaultValue={params.sort ?? "newest"}
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="travelers">Most travelers</option>
        </select>
        <button className="rounded-md bg-slate-700 px-4 py-2">Apply filters</button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Tour</th>
              <th className="px-3 py-2">Travelers</th>
              <th className="px-3 py-2">Preferences</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">WhatsApp</th>
              <th className="px-3 py-2">CRM Notes</th>
            </tr>
          </thead>
          <tbody>
            {await Promise.all(
              bookings.map(async (booking) => {
                const whatsappLink = await getWhatsappDeepLink({
                  tourName: booking.tourTitle ?? "Custom Heritage Trip",
                  bookingId: booking.id,
                  name: booking.name,
                });
                return (
              <tr key={booking.id} className="border-t border-slate-800 align-top">
                <td className="px-3 py-3">
                  <p className="font-semibold">{booking.name}</p>
                  <p className="text-xs text-slate-400">{booking.id}</p>
                </td>
                <td className="px-3 py-3">
                  <p>{booking.email}</p>
                  <p>{booking.phone}</p>
                </td>
                <td className="px-3 py-3">{booking.tourTitle ?? "Custom request"}</td>
                <td className="px-3 py-3">{booking.travelersCount}</td>
                <td className="max-w-[240px] px-3 py-3 text-slate-300">
                  {booking.preferences || "-"}
                </td>
                <td className="px-3 py-3">
                  <form action={updateBookingStatusAction} className="flex gap-2">
                    <input type="hidden" name="bookingId" value={booking.id} />
                    <select
                      name="status"
                      defaultValue={booking.status}
                      className="rounded border border-slate-700 bg-slate-950 px-2 py-1"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button className="rounded bg-slate-700 px-2 py-1">Update</button>
                  </form>
                </td>
                <td className="px-3 py-3">{new Date(booking.createdAt).toLocaleDateString()}</td>
                <td className="px-3 py-3">
                  {whatsappLink ? (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 underline"
                    >
                      Open
                    </a>
                  ) : (
                    <span className="text-slate-400 text-sm">Not configured</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <form action={updateBookingNotesAction} className="space-y-2">
                    <input type="hidden" name="bookingId" value={booking.id} />
                    <textarea
                      name="followUpNotes"
                      defaultValue={booking.followUpNotes ?? ""}
                      className="h-20 w-56 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs"
                      placeholder="Log call notes, itinerary follow-up, next steps..."
                    />
                    <button className="rounded bg-slate-700 px-2 py-1 text-xs">Save note</button>
                  </form>
                </td>
              </tr>
                );
              }),
            )}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                  No bookings yet. Create one through a tour request form.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
