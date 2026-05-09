import Link from "next/link";
import { AdminSignOutButton } from "@/components/admin/sign-out-button";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/tours", label: "Tours" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/media/gallery", label: "Gallery" },
  { href: "/admin/cms/blog", label: "Blog" },
  { href: "/admin/cms/testimonials", label: "Testimonials" },
];

export function AdminSidebar() {
  return (
    <aside className="w-full border-r border-slate-800 bg-slate-900/80 p-4 md:w-64">
      <h2 className="mb-4 text-lg font-semibold">Admin</h2>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-6">
        <AdminSignOutButton />
      </div>
    </aside>
  );
}
