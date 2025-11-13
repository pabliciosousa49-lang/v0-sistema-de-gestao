import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"

const processes = [
  {
    id: 1,
    name: "Renovação de CNH",
    client: "João Silva",
    status: "Concluído",
    date: "2025-11-08",
  },
  {
    id: 2,
    name: "Transferência de Veículo",
    client: "Maria Santos",
    status: "Em Processamento",
    date: "2025-11-07",
  },
  {
    id: 3,
    name: "Licenciamento Anual",
    client: "Pedro Costa",
    status: "Aguardando Documentos",
    date: "2025-11-06",
  },
  {
    id: 4,
    name: "Segunda Via de CNH",
    client: "Ana Oliveira",
    status: "Concluído",
    date: "2025-11-05",
  },
]

const statusConfig = {
  Concluído: { icon: CheckCircle, color: "text-chart-3", bg: "bg-chart-3/10" },
  "Em Processamento": { icon: Clock, color: "text-chart-1", bg: "bg-chart-1/10" },
  "Aguardando Documentos": { icon: AlertCircle, color: "text-accent", bg: "bg-accent/10" },
}

export default function RecentProcesses() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Processos Recentes
        </h2>
        <a href="/processos" className="text-primary hover:underline text-sm font-medium">
          Ver todos
        </a>
      </div>

      <div className="space-y-3">
        {processes.map((process) => {
          const statusInfo = statusConfig[process.status as keyof typeof statusConfig]
          const StatusIcon = statusInfo?.icon || Clock

          return (
            <div
              key={process.id}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{process.name}</p>
                <p className="text-xs text-muted-foreground">
                  {process.client} • {process.date}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full ${statusInfo?.bg} flex items-center gap-1`}>
                <StatusIcon className={`w-3 h-3 ${statusInfo?.color}`} />
                <span className={`text-xs font-medium ${statusInfo?.color}`}>{process.status}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
