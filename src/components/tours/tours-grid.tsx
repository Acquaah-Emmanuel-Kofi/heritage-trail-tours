"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { MapPin, Clock, DollarSign, Filter, X } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/ui/empty-state"

interface Tour {
  id: string
  title: string
  description: string
  category: string
  country: string
  price: string
  duration: string
  imageUrl: string | null
  featured?: boolean
}

interface ToursGridProps {
  tours: Tour[]
}

export function ToursGrid({ tours }: ToursGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  // Get unique categories and countries
  const categories = useMemo(() => [...new Set(tours.map((t) => t.category))], [tours])
  const countries = useMemo(() => [...new Set(tours.map((t) => t.country))], [tours])

  // Filter tours
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || tour.category === selectedCategory
      const matchesCountry = !selectedCountry || tour.country === selectedCountry
      return matchesSearch && matchesCategory && matchesCountry
    })
  }, [tours, searchQuery, selectedCategory, selectedCountry])

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Filters Sidebar */}
      <FadeIn className="lg:col-span-1">
        <div className="space-y-6 rounded-lg border border-border bg-card p-6">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4" />
              Filters
            </h3>
          </div>

          {/* Search */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Search Tours
            </label>
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Category
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  !selectedCategory
                    ? "bg-primary/20 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Country Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Country
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCountry(null)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  !selectedCountry
                    ? "bg-primary/20 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                All Countries
              </button>
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCountry === country
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCategory || selectedCountry) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
                setSelectedCountry(null)
              }}
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </FadeIn>

      {/* Tours Grid */}
      <FadeIn className="lg:col-span-3">
        {filteredTours.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTours.length} tour{filteredTours.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {filteredTours.map((tour, idx) => (
                <FadeIn key={tour.id} delay={0.05 * (idx % 6)}>
                  <Link href={`/tours/${tour.id}`}>
                    <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden">
                      {tour.imageUrl && (
                        <div className="relative h-56 overflow-hidden bg-muted">
                          <img
                            src={tour.imageUrl}
                            alt={tour.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3C/svg%3E"
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
                          <div className="absolute top-3 right-3">
                            <Badge variant="default">{tour.category}</Badge>
                          </div>
                          {tour.featured && (
                            <Badge variant="accent" className="absolute top-3 left-3">
                              Featured
                            </Badge>
                          )}
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-1 mb-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-primary">{tour.country}</span>
                            </div>
                            <CardTitle className="line-clamp-2">{tour.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3 mb-4">
                          {tour.description}
                        </CardDescription>
                        <div className="space-y-3 pt-4 border-t border-border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{tour.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                              <DollarSign className="h-4 w-4" />
                              <span>{tour.price}</span>
                            </div>
                          </div>
                          <Button className="w-full mt-2" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={MapPin}
            title="No Tours Found"
            description="Try adjusting your filters or search query to find the perfect tour."
            action={{
              label: "Clear Filters",
              onClick: () => {
                setSearchQuery("")
                setSelectedCategory(null)
                setSelectedCountry(null)
              },
            }}
          />
        )}
      </FadeIn>
    </div>
  )
}
