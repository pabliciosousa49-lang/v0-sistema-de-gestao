import { Calendar, MapPin, Clock } from "lucide-react"

const schedules = [
  {
    id: 1,
    client: "Carlos Mendes",
    time: "09:00",
    type: "Renovação CNH",
    location: "Detran - Centro",
  },
  {
    id: 2,
    client: "Fernanda Lima",
    time: "10:30",
    type: "Consulta",
    location: "Escritório",
  },
  {
    id: 3,
    client: "Roberto Alves",
    time: "14:00",
    type: "Entrega Documentos",
    location: "Detran - Centro",
  },
]

export default function UpcomingSchedules() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Agendamentos de Hoje
      </h2>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="p-4 bg-secondary rounded-lg border border-border/50">
            <div className="flex items-start justify-between mb-2">
              <p className="font-medium text-foreground">{schedule.client}</p>
              <div className="flex items-center gap-1 text-primary">
                <Clock className="w-3 h-3" />
                <span className="text-xs font-medium">{schedule.time}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{schedule.type}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {schedule.location}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
        Ver Calendário Completo
      </button>
    </div>
  )
}
