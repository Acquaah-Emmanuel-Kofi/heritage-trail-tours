import { SiteHeader } from "@/components/site/header"
import { FadeIn } from "@/components/motion/fade-in"
import { BookingWizard } from "@/components/booking/BookingWizard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Wand2, Clock, MapPin, Users } from "lucide-react"

export default function CustomTravelPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-border/50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Custom Trip" }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                Personalized Experiences
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                Design Your Perfect
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Heritage Journey
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                Don't see exactly what you're looking for? No problem. Tell us your vision, travel dates, group size, and interests. Our team will craft a bespoke itinerary tailored perfectly to your group's unique needs and preferences.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column - Features */}
            <FadeIn className="lg:col-span-2 space-y-8">
              {/* How It Works */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">How It Works</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: Wand2,
                      title: "Tell Us Your Vision",
                      description: "Share your interests, travel dates, group size, and any specific requests. More details help us create the perfect itinerary.",
                    },
                    {
                      icon: Clock,
                      title: "We Design Your Trip",
                      description: "Our heritage experts craft a customized itinerary with unique experiences, local guides, and authentic cultural immersion.",
                    },
                    {
                      icon: MapPin,
                      title: "Review & Refine",
                      description: "We present your custom itinerary via WhatsApp with the option to adjust dates, activities, or any other details.",
                    },
                    {
                      icon: Users,
                      title: "Book & Enjoy",
                      description: "Once you approve, we handle all bookings, logistics, and preparations for your unforgettable heritage adventure.",
                    },
                  ].map((step, idx) => {
                    const Icon = step.icon
                    return (
                      <FadeIn key={idx} delay={0.1 * (idx + 1)}>
                        <Card>
                          <CardHeader>
                            <div className="flex items-start gap-4">
                              <div className="mt-1 inline-flex rounded-lg bg-primary/10 p-2">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{step.title}</CardTitle>
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

              {/* What We Can Do */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">What We Can Customize</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    "Duration (3-30+ days)",
                    "Specific countries or regions",
                    "Cultural experiences",
                    "Adventure activities",
                    "Accommodation type",
                    "Transport arrangements",
                    "Dietary preferences",
                    "Pacing (relaxed to fast-paced)",
                  ].map((item, idx) => (
                    <FadeIn key={idx} delay={0.05 * idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-sm text-foreground">{item}</p>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right Column - Booking Form */}
            <FadeIn className="lg:col-span-1">
              <div className="sticky top-20">
                <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle>Start Planning</CardTitle>
                    <CardDescription>
                      Fill out this form with your preferences and we'll be in touch within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BookingWizard tourName="Custom Heritage Trip" isCustom />
                  </CardContent>
                </Card>

                {/* Info Box */}
                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-foreground mb-1">Average Response</p>
                        <p className="text-muted-foreground">12-24 hours</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">WhatsApp Follow-up</p>
                        <p className="text-muted-foreground">Direct team communication</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">No Hidden Fees</p>
                        <p className="text-muted-foreground">Transparent pricing from day one</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border/50 px-4 py-12 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            {[
              {
                q: "How much does a custom trip cost?",
                a: "Pricing depends on your group size, duration, activities, and accommodations. We'll provide a detailed quote after understanding your preferences.",
              },
              {
                q: "What's the minimum group size?",
                a: "We accommodate individuals and couples to large groups. We'll work with whatever size you have in mind.",
              },
              {
                q: "Can you accommodate dietary restrictions?",
                a: "Absolutely! We work with local guides and accommodations to ensure all dietary needs are met.",
              },
              {
                q: "How far in advance should I book?",
                a: "We recommend booking 2-3 months ahead, but we can accommodate shorter timelines depending on availability.",
              },
            ].map((faq, idx) => (
              <FadeIn key={idx} delay={0.05 * idx}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
