"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import TopBar from "@/components/layout/top-bar"
import ClientList from "@/components/clients/client-list"
import ClientForm from "@/components/clients/client-form"

export default function ClientesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          {showForm ? (
            <ClientForm onClose={() => setShowForm(false)} />
          ) : (
            <ClientList onAddClient={() => setShowForm(true)} />
          )}
        </main>
      </div>
    </div>
  )
}
