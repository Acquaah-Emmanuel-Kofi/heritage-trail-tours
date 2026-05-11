import { notFound } from "next/navigation"
import { MapPin, Clock, Users, DollarSign, Lightbulb, MapPinIcon } from "lucide-react"
import { SiteHeader } from "@/components/site/header"
import { FadeIn } from "@/components/motion/fade-in"
import { BookingWizard } from "@/components/booking/BookingWizard"
import { getTourById } from "@/lib/tours"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { TourImage } from "@/components/ui/tour-image"
import Link from "next/link"

type Props = {
  params: Promise<{ tourId: string }>
}

export default async function TourDetailPage({ params }: Props) {
  const { tourId } = await params
  const tour = await getTourById(tourId)
  if (!tour) notFound()

  // Parse itinerary into days (assuming format like "Day 1: ...\nDay 2: ...")
  const itineraryDays = tour.itinerary
    .split(/\n(?=Day\s+\d+:)/)
    .filter((day) => day.trim())
    .map((day, idx) => ({
      day: idx + 1,
      content: day.trim(),
    }))

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-border/50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tours", href: "/tours" },
              { label: tour.title },
            ]}
          />
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-96 overflow-hidden bg-muted sm:h-[500px]">
        {tour.imageUrl && (
          <TourImage
            src={tour.imageUrl}
            alt={tour.title}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <Badge variant="default" className="mb-4">
                {tour.category}
              </Badge>
              {tour.featured && (
                <Badge variant="accent" className="ml-2">
                  Featured Experience
                </Badge>
              )}
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground">{tour.title}</h1>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column - Tour Details */}
            <FadeIn className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Location</span>
                      </div>
                      <p className="font-semibold text-foreground">{tour.country}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Duration</span>
                      </div>
                      <p className="font-semibold text-foreground">{tour.duration}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Price</span>
                      </div>
                      <p className="font-semibold text-foreground">{tour.price}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Group Size</span>
                      </div>
                      <p className="font-semibold text-foreground">2-12 people</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-base text-muted-foreground leading-relaxed">{tour.description}</p>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Itinerary</h2>
                <div className="space-y-4">
                  {itineraryDays.map((dayItem, idx) => (
                    <FadeIn key={idx} delay={0.05 * idx}>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Day {dayItem.day}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                            {dayItem.content.replace(/^Day\s+\d+:\s*/, "")}
                          </p>
                        </CardContent>
                      </Card>
                    </FadeIn>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Experience Highlights</h2>
                <div className="grid gap-3">
                  {[
                    "Authentic cultural immersion with local communities",
                    "Expert guides with deep knowledge of heritage",
                    "Small group experience for personalized attention",
                    "Includes meals and accommodation arrangements",
                    "Photography opportunities at scenic locations",
                    "Free cancellation up to 7 days before departure",
                  ].map((highlight, idx) => (
                    <FadeIn key={idx} delay={0.05 * idx} className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{highlight}</p>
                    </FadeIn>
                  ))}
                </div>
              </div>

              {/* Map Section */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Location Map</h2>
                <Card className="overflow-hidden">
                  <div className="h-96 bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <MapPinIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground">
                        Interactive map showing tour location and key sites in {tour.country}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        (Comming Soon)
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* CTA for mobile */}
              <div className="lg:hidden">
                <Link href="#booking">
                  <Button size="lg" className="w-full">
                    Book This Tour
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* Right Column - Booking Sidebar */}
            <FadeIn className="lg:col-span-1">
              <div className="sticky top-20">
                <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle>Ready to Explore?</CardTitle>
                    <CardDescription>
                      Fill out the form and we&apos;ll follow up via WhatsApp within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent id="booking">
                    <BookingWizard tourId={tour.id} tourName={tour.title} />
                  </CardContent>
                </Card>

                {/* Info Box */}
                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-medium text-foreground mb-1">Quick Response</p>
                        <p className="text-muted-foreground">We respond to all booking requests within 24 hours</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">Flexible Dates</p>
                        <p className="text-muted-foreground">Customize your travel dates to your preference</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">Expert Planning</p>
                        <p className="text-muted-foreground">Our team handles all logistics and arrangements</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Related Tours Section */}
      <section className="border-t border-border/50 px-4 py-12 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-2xl font-bold text-foreground mb-8">Explore More Tours</h2>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/tours">Browse All Tours</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/custom-travel">Plan Custom Trip</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
