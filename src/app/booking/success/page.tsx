import Link from "next/link"
import { SiteHeader } from "@/components/site/header"
import { FadeIn } from "@/components/motion/fade-in"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, MessageCircle, Clock, MapPin } from "lucide-react"

type Props = {
  searchParams: Promise<{
    bookingId?: string
    tourName?: string
    wa?: string
    error?: string
  }>
}

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams

  if (params.error) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <div className="mb-4 flex items-center gap-3">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                    <CardTitle className="text-destructive">Unable to Submit Booking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    There was an issue processing your booking request. Please try again or contact us directly.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Contact our team:</p>
                    <div className="space-y-1">
                      <a href="mailto:support@heritagetrailtours.com" className="text-primary hover:underline">
                        support@heritagetrailtours.com
                      </a>
                      <p className="text-sm text-muted-foreground">
                        WhatsApp: <a href="https://wa.me/1234567890" className="text-primary hover:underline">+1 (555) 123-4567</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button asChild variant="outline">
                      <Link href="/tours">Back to Tours</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/">Home</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-primary/20 p-6 animate-pulse">
                  <CheckCircle className="h-16 w-16 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Booking Request Submitted!
              </h1>
              <p className="text-lg text-muted-foreground">
                Thank you for choosing Heritage Trail Tours. We&apos;ll be in touch shortly with the next steps.
              </p>
            </div>
          </FadeIn>

          {/* Booking Details */}
          <FadeIn delay={0.1}>
            <Card className="mb-8 border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle>Your Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">Booking Reference</p>
                    <p className="mt-1 font-mono text-lg font-semibold text-primary">{params.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">Tour</p>
                    <p className="mt-1 font-semibold text-foreground">{params.tourName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Next Steps */}
          <FadeIn delay={0.2}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">What Happens Next?</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Clock,
                    title: "Within 24 Hours",
                    description: "Our team will review your booking and send you a WhatsApp message with more details and any questions.",
                  },
                  {
                    icon: MessageCircle,
                    title: "Via WhatsApp",
                    description: "We'll finalize your itinerary, confirm dates, and discuss any special requests via WhatsApp.",
                  },
                  {
                    icon: MapPin,
                    title: "Confirmed & Ready",
                    description: "Once confirmed, we'll send you a full trip document with all logistics, guides, and helpful travel tips.",
                  },
                ].map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <FadeIn key={idx} delay={0.1 * (idx + 1)}>
                      <Card>
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-primary/10 p-2 mt-1 flex-shrink-0">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-base">{step.title}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </CardContent>
                      </Card>
                    </FadeIn>
                  )
                })}
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div className="space-y-4">
            <Button asChild size="lg" className="w-full">
              <a
                href={params.wa || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Continue on WhatsApp
              </a>
            </Button>
              <p className="text-xs text-muted-foreground text-center">
                or visit your messages to find our team
              </p>
            </div>
          </FadeIn>

          {/* Additional Info */}
          <FadeIn delay={0.4} className="mt-12 p-6 rounded-lg border border-border/50 bg-muted/30">
            <h3 className="font-semibold text-foreground mb-3">Questions?</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <a href="mailto:support@heritagetrailtours.com" className="text-primary hover:underline">
                  support@heritagetrailtours.com
                </a>
              </p>
              <p>
                <a href="https://wa.me/1234567890" className="text-primary hover:underline">
                  WhatsApp: +1 (555) 123-4567
                </a>
              </p>
            </div>
          </FadeIn>

          {/* Footer Links */}
          <FadeIn delay={0.5} className="mt-8 flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/tours">Explore More Tours</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
