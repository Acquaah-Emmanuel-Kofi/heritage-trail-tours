import { Metadata } from "next";
import { Quote, MapPin, User } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { listPublishedTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Traveler Testimonials - Real Stories from Heritage Tours",
  description: "Read authentic testimonials from travelers who experienced our heritage tours across Africa. Real stories of cultural discovery and meaningful journeys.",
};

export default async function TestimonialsPage() {
  const testimonials = await listPublishedTestimonials();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden bg-muted sm:h-80">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Traveler Stories
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Authentic voices from our community of heritage travelers.
                Real experiences, genuine connections, and unforgettable journeys.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {testimonials.length === 0 ? (
            <FadeIn>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Testimonials Coming Soon</h2>
                <p className="text-muted-foreground">
                  We're collecting amazing stories from our travelers.
                  Check back soon to read about transformative heritage experiences.
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, idx) => (
                <FadeIn key={testimonial.id} delay={0.05 * idx}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                      <blockquote className="text-foreground mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
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
          )}
        </div>
      </section>
    </div>
  );
}