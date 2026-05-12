import type { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="border-b border-border/50 px-6 py-4">
            <div className="max-w-7xl">
              <p className="text-sm text-muted-foreground">Heritage Trail Tours</p>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
          </div>
          <div className="p-6">
            <div className="max-w-7xl">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
