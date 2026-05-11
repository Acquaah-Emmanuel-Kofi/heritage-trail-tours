import { SiteHeader } from "@/components/site/header"
import { FadeIn } from "@/components/motion/fade-in"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Heart, Globe, Users, Leaf } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-border/50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <Badge variant="secondary" className="mb-4 mx-auto">
              Our Story
            </Badge>
            <h1 className="mt-4 text-5xl sm:text-6xl font-bold text-foreground leading-tight">
              Heritage Travel
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We believe travel is more than sightseeing. It's about connecting with authentic stories, preserving cultural memory, and creating meaningful relationships across continents.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* Our Mission */}
          <FadeIn>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Heritage Trail Tours, we're dedicated to creating transformative travel experiences that celebrate African heritage, empower local communities, and foster genuine cross-cultural connections.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that when travelers engage authentically with local cultures, everyone benefits. Our guides become ambassadors for their communities, sustainable tourism grows, and visitors leave with a deeper understanding of our shared humanity.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Our Values */}
          <div>
            <FadeIn>
              <h2 className="text-3xl font-bold text-foreground mb-8">Our Core Values</h2>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: Heart,
                  title: "Authenticity",
                  description: "We prioritize genuine cultural experiences over staged performances. Our itineraries are designed with local communities to showcase real heritage.",
                },
                {
                  icon: Globe,
                  title: "Community First",
                  description: "We partner directly with local guides, businesses, and cultural practitioners, ensuring tourism revenue directly supports communities.",
                },
                {
                  icon: Users,
                  title: "Meaningful Connection",
                  description: "We facilitate deep interactions between travelers and locals, creating lasting relationships and mutual understanding.",
                },
                {
                  icon: Leaf,
                  title: "Sustainability",
                  description: "We operate responsibly, minimizing environmental impact and supporting sustainable practices in every destination.",
                },
              ].map((value, idx) => {
                const Icon = value.icon
                return (
                  <FadeIn key={idx} delay={0.1 * (idx + 1)}>
                    <Card>
                      <CardHeader>
                        <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  </FadeIn>
                )
              })}
            </div>
          </div>

          {/* What We Do */}
          <FadeIn>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">What We Do</h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Heritage Trail Tours specializes in curated African heritage experiences. We don't offer generic tours—we create deeply personalized journeys that reflect each traveler's interests and pace.
                </p>
                <div className="space-y-3">
                  {[
                    "Design bespoke multi-country heritage tours",
                    "Connect travelers with exceptional local guides and cultural practitioners",
                    "Arrange authentic accommodations, meals, and experiences",
                    "Provide 24/7 support throughout your journey via WhatsApp",
                    "Handle all logistics, permits, and travel arrangements",
                    "Offer flexible customization for groups of any size",
                  ].map((item, idx) => (
                    <FadeIn key={idx} delay={0.05 * idx} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      <p className="text-muted-foreground">{item}</p>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Team Section */}
          <div>
            <FadeIn>
              <h2 className="text-3xl font-bold text-foreground mb-8">Meet the Team</h2>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Amara Okonkwo",
                  role: "Founder & Heritage Expert",
                  bio: "With 10+ years in African tourism and cultural conservation, Amara leads our mission to transform heritage travel.",
                },
                {
                  name: "Kwesi Mensah",
                  role: "Chief Experience Officer",
                  bio: "Kwesi curates every itinerary, ensuring each tour reflects authentic local culture and creates lasting connections.",
                },
                {
                  name: "Zainab Hassan",
                  role: "Community Relations Lead",
                  bio: "Zainab partners with local communities to ensure our tours benefit and celebrate the people we visit.",
                },
              ].map((member, idx) => (
                <FadeIn key={idx} delay={0.1 * (idx + 1)}>
                  <Card>
                    <CardHeader>
                      <div className="h-24 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4" />
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Stats */}
          <FadeIn className="py-12 border-t border-b border-border/50">
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { number: "5000+", label: "Happy Travelers" },
                { number: "12+", label: "African Countries" },
                { number: "200+", label: "Local Guides" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Contact CTA */}
          <FadeIn className="text-center space-y-6 py-12">
            <h2 className="text-3xl font-bold text-foreground">Get in Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our tours or want to discuss partnership opportunities? We'd love to hear from you.
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <a href="mailto:info@heritagetrailtours.com" className="text-primary hover:underline">
                  info@heritagetrailtours.com
                </a>
              </p>
              <p className="text-muted-foreground">
                WhatsApp: <a href="https://wa.me/1234567890" className="text-primary hover:underline">
                  +1 (555) 123-4567
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
