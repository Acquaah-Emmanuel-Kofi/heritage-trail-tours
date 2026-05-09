"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });

    setLoading(false);
    if (result?.ok) {
      window.location.href = "/admin";
      return;
    }

    setError("Invalid credentials. Please try again.");
  }

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-3xl font-bold">Admin Sign In</h1>
      <p className="mt-2 text-slate-300">Sign in to access the dashboard.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-6"
      >
        <label className="block">
          <span className="mb-1 block text-sm">Email</span>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">Password</span>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
