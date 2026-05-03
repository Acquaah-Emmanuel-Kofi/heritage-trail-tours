import { updateBookingStatusAction } from "@/actions/admin";
import { SiteHeader } from "@/components/site/header";
import { listBookings } from "@/lib/bookings";
import { config } from 'dotenv';

config({ path: '.env.local' });

const statuses = ["PENDING", "CONTACTED", "CONFIRMED", "CANCELLED"] as const;

export default async function AdminBookingsPage() {
  const bookings = await listBookings().catch(() => []);

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold">Admin Booking Dashboard</h1>
        <p className="mt-2 text-slate-300">
          Manage lead statuses and continue conversations on WhatsApp.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Contact</th>
                <th className="px-3 py-2">Travelers</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-slate-800">
                  <td className="px-3 py-3">
                    <p className="font-semibold">{booking.name}</p>
                    <p className="text-xs text-slate-400">{booking.id}</p>
                  </td>
                  <td className="px-3 py-3">
                    <p>{booking.email}</p>
                    <p>{booking.phone}</p>
                  </td>
                  <td className="px-3 py-3">{booking.travelersCount}</td>
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
                  <td className="px-3 py-3">
                    <a
                      href={`https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi ${booking.name}, following up on your booking ${booking.id}.`)}`}
                      className="text-emerald-300 underline"
                    >
                      Open
                    </a>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                    No bookings yet. Create one through a tour request form.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
