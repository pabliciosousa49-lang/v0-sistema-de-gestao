"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Phone, Trash2 } from "lucide-react"

interface Schedule {
  id: number
  date: string
  time: string
  client: string
  phone: string
  type: string
  location: string
  status: "Confirmado" | "Pendente" | "Cancelado"
  notes?: string
}

const mockSchedules: Schedule[] = [
  {
    id: 1,
    date: "2025-11-08",
    time: "09:00",
    client: "Carlos Mendes",
    phone: "(11) 98765-4321",
    type: "Renovação CNH",
    location: "Detran - Centro",
    status: "Confirmado",
    notes: "Trazer documentos originais",
  },
  {
    id: 2,
    date: "2025-11-08",
    time: "10:30",
    client: "Fernanda Lima",
    phone: "(11) 99876-5432",
    type: "Consulta",
    location: "Escritório",
    status: "Confirmado",
  },
  {
    id: 3,
    date: "2025-11-08",
    time: "14:00",
    client: "Roberto Alves",
    phone: "(11) 97654-3210",
    type: "Entrega Documentos",
    location: "Detran - Centro",
    status: "Pendente",
  },
  {
    id: 4,
    date: "2025-11-09",
    time: "08:30",
    client: "Patricia Oliveira",
    phone: "(11) 96543-2109",
    type: "Renovação CNH",
    location: "Detran - Zona Leste",
    status: "Confirmado",
  },
  {
    id: 5,
    date: "2025-11-10",
    time: "11:00",
    client: "Marco Sousa",
    phone: "(11) 95432-1098",
    type: "Transferência Veículo",
    location: "Escritório",
    status: "Confirmado",
  },
]

interface CalendarViewProps {
  onAddSchedule: () => void
}

export default function CalendarView({ onAddSchedule }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 8))
  const [selectedDate, setSelectedDate] = useState("2025-11-08")

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleSelectDate = (day: number) => {
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const date = String(day).padStart(2, "0")
    setSelectedDate(`${year}-${month}-${date}`)
  }

  const schedulesForSelectedDate = mockSchedules.filter((s) => s.date === selectedDate)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado":
        return "bg-chart-3/10 text-chart-3"
      case "Pendente":
        return "bg-accent/10 text-accent"
      case "Cancelado":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-secondary text-foreground"
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
          <p className="text-muted-foreground mt-2">Gerencie compromissos e visitas</p>
        </div>
        <button
          onClick={onAddSchedule}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <Plus className="w-5 h-5" />
          Novo Agendamento
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-secondary rounded transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="font-semibold text-foreground capitalize text-sm">{monthName}</h2>
              <button onClick={handleNextMonth} className="p-2 hover:bg-secondary rounded transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map((day) => {
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                const isSelected = dateStr === selectedDate
                const hasSchedules = mockSchedules.some((s) => s.date === dateStr)

                return (
                  <button
                    key={day}
                    onClick={() => handleSelectDate(day)}
                    className={`aspect-square p-1 rounded text-sm font-medium transition-colors relative ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : hasSchedules
                          ? "bg-primary/20 text-foreground hover:bg-primary/30"
                          : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {day}
                    {hasSchedules && !isSelected && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Com agendamentos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedules */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {new Date(selectedDate).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {schedulesForSelectedDate.length} agendamento{schedulesForSelectedDate.length !== 1 ? "s" : ""} neste
                dia
              </p>
            </div>

            <div className="space-y-4">
              {schedulesForSelectedDate.length > 0 ? (
                schedulesForSelectedDate
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((schedule) => (
                    <div
                      key={schedule.id}
                      className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl font-bold text-primary">{schedule.time}</div>
                          <div>
                            <p className="font-semibold text-foreground">{schedule.client}</p>
                            <p className="text-sm text-muted-foreground">{schedule.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}
                          >
                            {schedule.status}
                          </span>
                          <button className="p-2 hover:bg-secondary rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {schedule.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {schedule.phone}
                        </div>
                        {schedule.notes && (
                          <div className="mt-3 p-3 bg-secondary rounded text-foreground text-sm">
                            <p className="font-medium text-xs text-muted-foreground mb-1">Observações:</p>
                            {schedule.notes}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:opacity-90 transition-opacity">
                          Editar
                        </button>
                        <button className="flex-1 px-3 py-2 bg-secondary text-secondary-foreground rounded text-sm font-medium hover:opacity-90 transition-opacity">
                          Contatar
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Nenhum agendamento para esta data</p>
                  <button
                    onClick={onAddSchedule}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Criar agendamento
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
