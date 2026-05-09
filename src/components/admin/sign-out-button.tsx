"use client";

import { signOut } from "next-auth/react";

export function AdminSignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
    >
      Sign Out
    </button>
  );
}
