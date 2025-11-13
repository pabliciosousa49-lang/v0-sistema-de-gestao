"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import TopBar from "@/components/layout/top-bar"
import ProcessList from "@/components/processes/process-list"
import ProcessForm from "@/components/processes/process-form"
import ProcessDetail from "@/components/processes/process-detail"

type View = "list" | "form" | "detail"

export default function ProcessosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [view, setView] = useState<View>("list")
  const [selectedProcess, setSelectedProcess] = useState<number | null>(null)

  const handleViewProcess = (id: number) => {
    setSelectedProcess(id)
    setView("detail")
  }

  const handleAddProcess = () => {
    setSelectedProcess(null)
    setView("form")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          {view === "list" && <ProcessList onAddProcess={handleAddProcess} onViewProcess={handleViewProcess} />}
          {view === "form" && <ProcessForm onClose={() => setView("list")} />}
          {view === "detail" && selectedProcess && (
            <ProcessDetail processId={selectedProcess} onClose={() => setView("list")} />
          )}
        </main>
      </div>
    </div>
  )
}
