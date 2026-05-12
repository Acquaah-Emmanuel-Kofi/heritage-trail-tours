import { Metadata } from "next";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listPublishedBlogPosts } from "@/lib/blogs";
import { TourImage } from "@/components/ui/tour-image";

export const metadata: Metadata = {
  title: "Heritage Trail Blogs - Stories from African Heritage Journeys",
  description: "Read authentic stories and insights from our heritage tours across Africa. Discover the rich cultural narratives and travel experiences.",
};

export default async function BlogsPage() {
  const blogPosts = await listPublishedBlogPosts();

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
                Heritage Stories & Insights
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Discover authentic narratives from our heritage tours across Africa.
                Stories that connect cultures, preserve memories, and inspire journeys.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {blogPosts.length === 0 ? (
            <FadeIn>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Coming Soon</h2>
                <p className="text-muted-foreground">
                  We're working on bringing you amazing stories from our heritage tours.
                  Check back soon for inspiring narratives and travel insights.
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, idx) => (
                <FadeIn key={post.id} delay={0.05 * idx}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      {post.coverImageUrl ? (
                        <TourImage
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted flex items-center justify-center">
                          <User className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        <Link href={`/blogs/${post.slug}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">
                        {post.body.replace(/<[^>]*>/g, '').substring(0, 150)}...
                      </CardDescription>
                      <div className="mt-4">
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="text-primary hover:text-primary/80 font-medium text-sm"
                        >
                          Read More →
                        </Link>
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