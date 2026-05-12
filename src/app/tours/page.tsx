import { MapPin, Clock, DollarSign, Filter, X } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site/header"
import { FadeIn } from "@/components/motion/fade-in"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { listTours } from "@/lib/tours"
import { ToursGrid } from "@/components/tours/tours-grid"

export default async function ToursPage() {
  const tours = await listTours()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-border/50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tours" }]} />
        </div>
      </div>

      {/* Header */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Explore Our Tours
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Discover handpicked heritage destinations across Africa. Each tour is designed to offer authentic cultural immersion and unforgettable memories.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tours Grid with Client-side Filters */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {tours.length > 0 ? (
            <ToursGrid tours={tours} />
          ) : (
            <EmptyState
              icon={MapPin}
              title="No Tours Available"
              description="Check back soon for new heritage tours."
              action={{
                label: "Back to Home",
                href: "/",
              }}
            />
          )}
        </div>
      </section>
    </div>
  )
}
