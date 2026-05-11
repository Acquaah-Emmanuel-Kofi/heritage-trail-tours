import { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { listGalleryImages } from "@/lib/gallery";
import { TourImage } from "@/components/ui/tour-image";

export const metadata: Metadata = {
  title: "Heritage Trail Gallery - Visual Stories from African Journeys",
  description: "Explore our collection of authentic images capturing the essence of African heritage tours, cultural moments, and travel experiences.",
};

export default async function GalleryPage() {
  const galleryImages = await listGalleryImages();

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
                Visual Heritage Stories
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Authentic moments captured during our heritage tours across Africa.
                Each image tells a story of culture, connection, and discovery.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {galleryImages.length === 0 ? (
            <FadeIn>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Gallery Coming Soon</h2>
                <p className="text-muted-foreground">
                  We're curating a beautiful collection of images from our heritage tours.
                  Check back soon to see the visual stories of African journeys.
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {galleryImages.map((image, idx) => (
                <FadeIn key={image.id} delay={0.02 * idx}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <TourImage
                        src={image.imageUrl}
                        alt={image.caption || "Heritage tour moment"}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {image.caption && (
                      <CardContent className="p-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {image.caption}
                        </p>
                      </CardContent>
                    )}
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