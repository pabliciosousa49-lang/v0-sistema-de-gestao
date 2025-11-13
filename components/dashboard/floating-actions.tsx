"use client"

import { Plus } from "lucide-react"
import { useState } from "react"

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { label: "Novo Cliente", icon: "👤", color: "bg-blue-500" },
    { label: "Novo Processo", icon: "📄", color: "bg-green-500" },
    { label: "Agendar Visita", icon: "📅", color: "bg-purple-500" },
  ]

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
          {actions.map((action, index) => (
            <button
              key={action.label}
              className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span>{action.icon}</span>
              <span className="text-sm font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center"
      >
        <Plus className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
      </button>
    </div>
  )
}
