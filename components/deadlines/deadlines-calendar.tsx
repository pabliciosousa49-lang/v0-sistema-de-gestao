"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function DeadlineCalendar({ deadlines }) {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 8))

  const getDayDeadlines = (date) => {
    return deadlines.filter((d) => {
      const deadlineDate = new Date(d.dueDate)
      return (
        deadlineDate.getDate() === date.getDate() &&
        deadlineDate.getMonth() === date.getMonth() &&
        deadlineDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const selectedDayDeadlines = getDayDeadlines(selectedDate)

  const getStatusColor = (status) => {
    switch (status) {
      case "overdue":
        return "destructive"
      case "urgent":
        return "secondary"
      case "upcoming":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-lg border"
          disabled={(date) => {
            const dayDeadlines = getDayDeadlines(date)
            return dayDeadlines.length === 0
          }}
        />
      </div>

      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">
                {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{selectedDayDeadlines.length} prazos neste dia</p>
            </div>

            {selectedDayDeadlines.length > 0 ? (
              <div className="space-y-3">
                {selectedDayDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="flex items-start justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{deadline.name}</p>
                      <p className="text-xs text-muted-foreground">{deadline.client}</p>
                    </div>
                    <Badge variant={getStatusColor(deadline.status)} className="text-xs">
                      {deadline.status === "overdue" && "Vencido"}
                      {deadline.status === "urgent" && "Urgente"}
                      {deadline.status === "upcoming" && "Próximo"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum prazo neste dia</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
