"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import TopBar from "@/components/layout/top-bar"
import CalendarView from "@/components/scheduling/calendar-view"
import SchedulingForm from "@/components/scheduling/scheduling-form"

export default function AgendamentosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          {showForm ? (
            <SchedulingForm onClose={() => setShowForm(false)} />
          ) : (
            <CalendarView onAddSchedule={() => setShowForm(true)} />
          )}
        </main>
      </div>
    </div>
  )
}
