"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

export default function ProtocolTracking({ protocols }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-chart-3" />
      case "processing":
        return <Clock className="w-5 h-5 text-primary" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-accent" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {protocols.map((protocol) => {
        const totalSteps = protocol.steps.length
        const completedSteps = protocol.steps.filter((s) => s.completed).length
        const progress = (completedSteps / totalSteps) * 100

        return (
          <Card key={protocol.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(protocol.status)}
                    <h3 className="font-semibold">{protocol.number}</h3>
                    <Badge variant="secondary">{protocol.client}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{protocol.process}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progresso:</span>
                  <span className="font-semibold">
                    {completedSteps} de {totalSteps} etapas
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {protocol.steps.map((step) => (
                  <div
                    key={step.step}
                    className={`text-center p-2 rounded-lg text-xs font-medium ${
                      step.completed ? "bg-chart-3/10 text-chart-3" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <div className="font-bold">{step.step}</div>
                    <div className="truncate">{step.name}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                <span>Enviado: {format(new Date(protocol.submittedDate), "dd/MM/yyyy", { locale: ptBR })}</span>
                <span>Previsto: {format(new Date(protocol.expectedDate), "dd/MM/yyyy", { locale: ptBR })}</span>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
