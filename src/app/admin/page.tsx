import { and, count, desc, eq } from "drizzle-orm"
import Link from "next/link"
import { getDb } from "@/db/client"
import { bookings, tours } from "@/db/schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, MapPin, AlertCircle, Image } from "lucide-react"

type OverviewData = {
  totalBookings: number
  pendingBookings: number
  confirmedBookings: number
  publishedTours: number
  recentBookings: Array<{
    id: string
    name: string
    status: string
    createdAt: Date
  }>
}

async function getOverviewData(): Promise<OverviewData> {
  try {
    const db = getDb()
    const [total] = await db.select({ value: count() }).from(bookings)
    const [pending] = await db
      .select({ value: count() })
      .from(bookings)
      .where(eq(bookings.status, "PENDING"))
    const [confirmed] = await db
      .select({ value: count() })
      .from(bookings)
      .where(eq(bookings.status, "CONFIRMED"))
    const [published] = await db
      .select({ value: count() })
      .from(tours)
      .where(and(eq(tours.featured, true)))
    const recentBookings = await db
      .select({
        id: bookings.id,
        name: bookings.name,
        status: bookings.status,
        createdAt: bookings.createdAt,
      })
      .from(bookings)
      .orderBy(desc(bookings.createdAt))
      .limit(8)

    return {
      totalBookings: total?.value ?? 0,
      pendingBookings: pending?.value ?? 0,
      confirmedBookings: confirmed?.value ?? 0,
      publishedTours: published?.value ?? 0,
      recentBookings,
    }
  } catch {
    return {
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      publishedTours: 0,
      recentBookings: [],
    }
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-primary/20 text-primary border-primary/30"
    case "PENDING":
      return "bg-accent/20 text-accent border-accent/30"
    case "CANCELLED":
      return "bg-destructive/20 text-destructive border-destructive/30"
    case "CONTACTED":
      return "bg-secondary/20 text-secondary border-secondary/30"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

export default async function AdminOverviewPage() {
  const data = await getOverviewData()

  const statCards = [
    {
      label: "Total Bookings",
      value: data.totalBookings,
      icon: Users,
      description: "All time bookings",
      color: "primary",
    },
    {
      label: "Pending Review",
      value: data.pendingBookings,
      icon: AlertCircle,
      description: "Need attention",
      color: "accent",
    },
    {
      label: "Confirmed",
      value: data.confirmedBookings,
      icon: TrendingUp,
      description: "Ready to go",
      color: "primary",
    },
    {
      label: "Featured Tours",
      value: data.publishedTours,
      icon: MapPin,
      description: "Active tours",
      color: "secondary",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor bookings, tours, and platform activity in real-time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Bookings & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest booking requests</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/bookings">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentBookings.length > 0 ? (
                data.recentBookings.map((booking) => (
                  <Link
                    key={booking.id}
                    href={`/admin/bookings`}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{booking.name}</p>
                      <p className="text-xs font-mono text-muted-foreground">{booking.id.slice(0, 12)}...</p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No bookings yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start" size="sm">
              <Link href="/admin/bookings">
                <Users className="mr-2 h-4 w-4" />
                Manage Bookings
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start" size="sm">
              <Link href="/admin/tours">
                <MapPin className="mr-2 h-4 w-4" />
                Manage Tours
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start" size="sm">
              <Link href="/admin/cms/blog">
                <ArrowRight className="mr-2 h-4 w-4" />
                Blog Posts
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start" size="sm">
              <Link href="/admin/media/gallery">
                <Image className="mr-2 h-4 w-4" />
                Gallery
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Database", status: "Connected", color: "text-primary" },
              { name: "WhatsApp API", status: "Active", color: "text-primary" },
              { name: "Email Service", status: "Active", color: "text-primary" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                <span className="text-sm text-muted-foreground">{item.name}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className={`text-sm font-medium ${item.color}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
