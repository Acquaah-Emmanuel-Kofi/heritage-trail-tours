import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-sm">
        <Link href="/" className="font-semibold tracking-wide text-white">
          Heritage Trail Tours
        </Link>
        <div className="flex gap-5 text-slate-200">
          <Link href="/tours">Tours</Link>
          <Link href="/custom-travel">Custom Travel</Link>
          <Link href="/about">About</Link>
          <Link href="/admin/bookings">Admin</Link>
        </div>
      </nav>
    </header>
  );
}
