import { SiteHeader } from "@/components/site/header";

export default function AboutPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-bold">Our Story</h1>
        <p className="mt-4 text-slate-300">
          Heritage Trail Tours curates African journeys centered on culture, memory, and local
          storytelling. Our team designs meaningful experiences for families, students, and
          explorers looking to connect with history.
        </p>
      </main>
    </div>
  );
}
