"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import Sidebar from "@/components/layout/sidebar"
import TopBar from "@/components/layout/top-bar"
import Dashboard from "@/components/dashboard/dashboard"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto">
            <Dashboard />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
