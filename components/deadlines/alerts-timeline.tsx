"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function AlertsTimeline({ deadlines }) {
  const sortedDeadlines = [...deadlines].sort((a, b) => {
    const statusOrder = { overdue: 0, urgent: 1, upcoming: 2 }
    return statusOrder[a.status] - statusOrder[b.status]
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "overdue":
        return <AlertTriangle className="w-5 h-5 text-destructive" />
      case "urgent":
        return <Clock className="w-5 h-5 text-accent" />
      case "upcoming":
        return <AlertCircle className="w-5 h-5 text-primary" />
      default:
        return <CheckCircle2 className="w-5 h-5 text-chart-3" />
    }
  }

  return (
    <div className="space-y-4">
      {sortedDeadlines.map((deadline, index) => (
        <div key={deadline.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center">{getStatusIcon(deadline.status)}</div>
            {index < sortedDeadlines.length - 1 && <div className="w-0.5 h-12 bg-border my-2" />}
          </div>

          <Card className="flex-1 p-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold">{deadline.name}</h4>
                  <p className="text-sm text-muted-foreground">{deadline.client}</p>
                </div>
                <Badge variant={deadline.status === "overdue" ? "destructive" : "secondary"} className="shrink-0">
                  {deadline.status === "overdue" && "Vencido"}
                  {deadline.status === "urgent" && "Urgente"}
                  {deadline.status === "upcoming" && "Próximo"}
                </Badge>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                <span>{format(new Date(deadline.dueDate), "dd/MM/yyyy", { locale: ptBR })}</span>
                <span>
                  {Math.abs(deadline.daysDue)} dia{Math.abs(deadline.daysDue) !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
