"use client"

import type React from "react"

import { AlertTriangle, Clock, AlertCircle } from "lucide-react"

interface CriticalAlert {
  id: string
  type: "critical" | "warning" | "info"
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

export default function CriticalAlerts() {
  const alerts: CriticalAlert[] = [
    {
      id: "1",
      type: "critical",
      title: "Prazos Vencidos",
      description: "3 processos com prazos vencidos",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "bg-destructive text-destructive-foreground",
    },
    {
      id: "2",
      type: "warning",
      title: "Próximos a Vencer",
      description: "7 processos vencendo em 2 dias",
      icon: <Clock className="w-5 h-5" />,
      color: "bg-yellow-500 text-white",
    },
    {
      id: "3",
      type: "info",
      title: "Documentos Pendentes",
      description: "12 clientes aguardando envio",
      icon: <AlertCircle className="w-5 h-5" />,
      color: "bg-blue-500 text-white",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {alerts.map((alert) => (
        <div key={alert.id} className={`${alert.color} rounded-lg p-4 flex items-start gap-3 shadow-lg`}>
          <div className="flex-shrink-0 mt-0.5">{alert.icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm">{alert.title}</h4>
            <p className="text-xs opacity-90">{alert.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
