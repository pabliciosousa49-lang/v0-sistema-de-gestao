"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import TopBar from "@/components/layout/top-bar"
import SettingsView from "@/components/settings/settings-view"

export default function ConfiguracoesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <SettingsView />
        </main>
      </div>
    </div>
  )
}
