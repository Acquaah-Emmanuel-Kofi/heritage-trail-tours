"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  MapPin,
  FileText,
  Image,
  Settings,
  LogOut,
  MessageSquare,
} from "lucide-react"
import { AdminSignOutButton } from "@/components/admin/sign-out-button"
import { cn } from "@/lib/utils"

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: MessageSquare },
  { href: "/admin/tours", label: "Tours", icon: MapPin },
  { href: "/admin/cms/blog", label: "Blog", icon: FileText },
  { href: "/admin/cms/testimonials", label: "Testimonials", icon: BookOpen },
  { href: "/admin/media/gallery", label: "Gallery", icon: Image },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <aside className="w-64 border-r border-border/50 bg-card/50 backdrop-blur-sm flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="border-b border-border/50 px-6 py-6">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
            HT
          </div>
          <span className="text-foreground">Heritage</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto px-3 py-6 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const active = isActive(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/50 px-3 py-4">
        <AdminSignOutButton />
      </div>
    </aside>
  )
}
