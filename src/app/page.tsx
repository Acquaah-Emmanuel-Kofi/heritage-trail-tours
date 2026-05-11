import Link from "next/link"
import { ArrowRight, MapPin, Users, Heart, MessageCircle, CheckCircle, Play, Phone, MessageSquare } from "lucide-react"
import { SiteHeader } from "@/components/site/header"
import { FadeIn } from "@/components/motion/fade-in"
import { listTours } from "@/lib/tours"
import { listPublishedTestimonials } from "@/lib/testimonials"
import { getSiteSettings } from "@/lib/site-settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getYouTubeEmbedUrl } from "@/lib/youtube"

export default async function Home() {
  const tours = await listTours()
  const featured = tours.filter((tour) => tour.featured).slice(0, 3)
  const testimonials = await listPublishedTestimonials()
  const siteSettings = await getSiteSettings()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        {/* Gradient background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center">
              <Badge variant="secondary" className="mx-auto mb-4">
                Discover African Heritage
              </Badge>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Immerse Yourself in{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Authentic African Stories
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Experience curated heritage tours that go beyond sightseeing. Connect with local culture, history, and communities through immersive journeys.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  <Link href="/tours">
                    Explore Tours
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/custom-travel">
                    Plan Custom Trip
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Hero Image/Stats */}
          <FadeIn delay={0.2}>
            <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8">
              {[
                { label: "Active Tours", value: tours.length },
                { label: "Travelers", value: "5000+" },
                { label: "Countries", value: "12+" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Tours */}
      {featured.length > 0 && (
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-muted/50">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <div className="text-center mb-12">
                <Badge variant="default" className="mx-auto mb-4">
                  Featured Experiences
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Trending Tours
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Explore our most popular heritage destinations
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((tour, idx) => (
                <FadeIn key={tour.id} delay={0.1 * (idx + 1)}>
                  <Link href={`/tours/${tour.id}`}>
                    <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden">
                      {tour.imageUrl && (
                        <div className="relative h-48 overflow-hidden bg-muted">
                          <img
                            src={tour.imageUrl}
                            alt={tour.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge variant="default">{tour.category}</Badge>
                          </div>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1 mb-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-primary">{tour.country}</span>
                            </div>
                            <CardTitle className="line-clamp-2">{tour.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-2 mb-4">
                          {tour.description}
                        </CardDescription>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="text-sm font-semibold text-foreground">{tour.duration}</p>
                          </div>
                          <div className="space-y-1 text-right">
                            <p className="text-xs text-muted-foreground">Starting From</p>
                            <p className="text-sm font-semibold text-primary">{tour.price}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              ))}
            </div>

            {tours.length > 3 && (
              <FadeIn delay={0.4}>
                <div className="mt-12 text-center">
                  <Button>
                    <Link href="/tours">
                      View All Tours
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Why Heritage Trail Tours?
              </h2>
              <p className="mt-2 text-muted-foreground">
                We&apos;re committed to authentic experiences and lasting connections
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Heart,
                title: "Authentic Stories",
                description: "Learn from local guides who live and breathe the heritage"
              },
              {
                icon: Users,
                title: "Community Focus",
                description: "Support local communities and sustainable tourism"
              },
              {
                icon: MessageCircle,
                title: "WhatsApp Support",
                description: "Fast follow-up and personalized trip planning"
              },
              {
                icon: MapPin,
                title: "Curated Routes",
                description: "Thoughtfully designed itineraries for real connection"
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <FadeIn key={idx} delay={0.1 * (idx + 1)}>
                  <Card className="relative hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* How Booking Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                How Booking Works
              </h2>
              <p className="mt-2 text-muted-foreground">
                Simple steps to your authentic African heritage experience
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Choose Your Tour",
                description: "Browse our curated heritage tours or request a custom itinerary"
              },
              {
                step: "2",
                title: "Submit Details",
                description: "Fill out our booking form with your travel preferences and group information"
              },
              {
                step: "3",
                title: "WhatsApp Follow-up",
                description: "Our team contacts you within 24 hours to discuss details and answer questions"
              },
              {
                step: "4",
                title: "Confirm & Pay",
                description: "Finalize your booking and complete secure payment when ready"
              },
            ].map((step, idx) => (
              <FadeIn key={idx} delay={0.1 * (idx + 1)}>
                <Card className="relative text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <div className="text-center mb-12">
                <Badge variant="default" className="mx-auto mb-4">
                  Traveler Stories
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  What Our Travelers Say
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Authentic experiences from real heritage journeys
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 6).map((testimonial, idx) => (
                <FadeIn key={testimonial.id} delay={0.1 * (idx + 1)}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <MessageCircle className="h-8 w-8 text-primary mb-4 opacity-50" />
                      <blockquote className="text-foreground mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {testimonial.travelerName}
                          </p>
                          {testimonial.location && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {testimonial.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>

            {testimonials.length > 6 && (
              <FadeIn delay={0.4}>
                <div className="mt-12 text-center">
                  <Button variant="outline">
                    <Link href="/testimonials">
                      View All Testimonials
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            )}
          </div>
        </section>
      )}

      {/* YouTube Section */}
      {siteSettings?.youtubeUrl && (
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-muted/50">
          <div className="mx-auto max-w-4xl text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Experience Heritage Through Video
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Watch authentic moments from our heritage tours and cultural experiences
              </p>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={getYouTubeEmbedUrl(siteSettings.youtubeUrl)}
                  title="Heritage Trail Tours"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
        </div>
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to Start Your Heritage Journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose a curated tour or create your own custom adventure. We'll handle the details and keep you updated every step of the way.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                <Link href="/tours">
                  Browse Tours
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary/50 hover:border-primary">
                <Link href="/custom-travel">
                  Custom Request
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg text-foreground mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                  HT
                </div>
                <span>Heritage Trail</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Authentic African heritage experiences through immersive travel.
              </p>
              {/* Social Links */}
              <div className="flex gap-4">
                {siteSettings?.facebook && (
                  <Link href={siteSettings.facebook} className="text-muted-foreground hover:text-primary transition-colors">
                    <span className="sr-only">Facebook</span>
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10">
                      <span className="text-sm font-bold">f</span>
                    </div>
                  </Link>
                )}
                {siteSettings?.instagram && (
                  <Link href={siteSettings.instagram} className="text-muted-foreground hover:text-primary transition-colors">
                    <span className="sr-only">Instagram</span>
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10">
                      <span className="text-sm font-bold">i</span>
                    </div>
                  </Link>
                )}
                {siteSettings?.tiktok && (
                  <Link href={siteSettings.tiktok} className="text-muted-foreground hover:text-primary transition-colors">
                    <span className="sr-only">TikTok</span>
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10">
                      <span className="text-sm font-bold">t</span>
                    </div>
                  </Link>
                )}
                {siteSettings?.youtubeUrl && (
                  <Link href={siteSettings.youtubeUrl} className="text-muted-foreground hover:text-primary transition-colors">
                    <span className="sr-only">YouTube</span>
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10">
                      <span className="text-sm font-bold">y</span>
                    </div>
                  </Link>
                )}
              </div>
              {/* Contact Links */}
              <div className="mt-4 space-y-2">
                {siteSettings?.whatsappNumber && (
                  <Link href={`https://wa.me/${siteSettings.whatsappNumber.replace(/\D/g, '')}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp: +{siteSettings.whatsappNumber}
                  </Link>
                )}
                {siteSettings?.phone && (
                  <Link href={`tel:${siteSettings.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    Phone: {siteSettings.phone}
                  </Link>
                )}
              </div>
            </div>
            {[
              { title: "Explore", links: [
                { label: "Tours", href: "/tours" },
                { label: "Blogs", href: "/blogs" },
                { label: "Gallery", href: "/gallery" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "About", href: "/about" }
              ]},
              { title: "Company", links: [
                { label: "Contact", href: "#" },
                { label: "Custom Travel", href: "/custom-travel" }
              ]},
              { title: "Support", links: [
                { label: "FAQ", href: "#" },
                { label: "Terms", href: "#" }
              ]},
            ].map((col) => (
              <div key={col.title}>
                <h3 className="font-semibold text-foreground mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Heritage Trail Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
