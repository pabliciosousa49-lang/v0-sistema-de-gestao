"use client"

import { useState } from "react"
import { Search, Plus, Eye, Edit2, Trash2, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Process {
  id: number
  type: string
  client: string
  status: "Aguardando" | "Em Processamento" | "Concluído" | "Cancelado"
  createdDate: string
  dueDate: string
  documents: number
  priority: "Baixa" | "Média" | "Alta"
}

const mockProcesses: Process[] = [
  {
    id: 1,
    type: "Renovação de CNH",
    client: "João Silva",
    status: "Em Processamento",
    createdDate: "2025-10-15",
    dueDate: "2025-11-15",
    documents: 4,
    priority: "Alta",
  },
  {
    id: 2,
    type: "Transferência de Veículo",
    client: "Maria Santos",
    status: "Aguardando",
    createdDate: "2025-10-20",
    dueDate: "2025-11-20",
    documents: 6,
    priority: "Média",
  },
  {
    id: 3,
    type: "Licenciamento Anual",
    client: "Pedro Costa",
    status: "Concluído",
    createdDate: "2025-10-10",
    dueDate: "2025-11-10",
    documents: 3,
    priority: "Baixa",
  },
  {
    id: 4,
    type: "Segunda Via de CNH",
    client: "Ana Oliveira",
    status: "Concluído",
    createdDate: "2025-10-05",
    dueDate: "2025-11-05",
    documents: 2,
    priority: "Baixa",
  },
  {
    id: 5,
    type: "Ativação de Acúmulo de Pontos",
    client: "Carlos Mendes",
    status: "Em Processamento",
    createdDate: "2025-10-18",
    dueDate: "2025-11-18",
    documents: 2,
    priority: "Média",
  },
]

const statusConfig = {
  Concluído: { icon: CheckCircle, color: "text-chart-3", bg: "bg-chart-3/10" },
  "Em Processamento": { icon: Clock, color: "text-chart-1", bg: "bg-chart-1/10" },
  Aguardando: { icon: AlertCircle, color: "text-accent", bg: "bg-accent/10" },
  Cancelado: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
}

const priorityConfig = {
  Baixa: "bg-chart-3/10 text-chart-3",
  Média: "bg-accent/10 text-accent",
  Alta: "bg-destructive/10 text-destructive",
}

interface ProcessListProps {
  onAddProcess: () => void
  onViewProcess: (id: number) => void
}

export default function ProcessList({ onAddProcess, onViewProcess }: ProcessListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"Todos" | "Aguardando" | "Em Processamento" | "Concluído">("Todos")
  const [filterPriority, setFilterPriority] = useState<"Todos" | "Baixa" | "Média" | "Alta">("Todos")

  const filteredProcesses = mockProcesses.filter((process) => {
    const matchesSearch =
      process.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.client.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "Todos" || process.status === filterStatus
    const matchesPriority = filterPriority === "Todos" || process.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciador de Processos</h1>
          <p className="text-muted-foreground mt-2">Acompanhe e gerencie todos os processos DETRAN</p>
        </div>
        <button
          onClick={onAddProcess}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <Plus className="w-5 h-5" />
          Novo Processo
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por tipo ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {(["Todos", "Aguardando", "Em Processamento", "Concluído"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {(["Todos", "Baixa", "Média", "Alta"] as const).map((priority) => (
            <button
              key={priority}
              onClick={() => setFilterPriority(priority)}
              className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterPriority === priority
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-foreground">{mockProcesses.length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Concluídos</p>
          <p className="text-2xl font-bold text-chart-3">
            {mockProcesses.filter((p) => p.status === "Concluído").length}
          </p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Em Processamento</p>
          <p className="text-2xl font-bold text-chart-1">
            {mockProcesses.filter((p) => p.status === "Em Processamento").length}
          </p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Aguardando</p>
          <p className="text-2xl font-bold text-accent">
            {mockProcesses.filter((p) => p.status === "Aguardando").length}
          </p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Prioridade Alta</p>
          <p className="text-2xl font-bold text-destructive">
            {mockProcesses.filter((p) => p.priority === "Alta").length}
          </p>
        </div>
      </div>

      {/* Process Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="text-left px-6 py-4 font-semibold text-foreground">Tipo de Processo</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Cliente</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Status</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Prioridade</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Documentos</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Vencimento</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcesses.map((process) => {
                const statusInfo = statusConfig[process.status as keyof typeof statusConfig]
                const StatusIcon = statusInfo?.icon || AlertCircle

                return (
                  <tr key={process.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{process.type}</p>
                    </td>
                    <td className="px-6 py-4 text-foreground">{process.client}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${statusInfo?.bg}`}>
                        <StatusIcon className={`w-3 h-3 ${statusInfo?.color}`} />
                        <span className={`text-xs font-medium ${statusInfo?.color}`}>{process.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig[process.priority]}`}
                      >
                        {process.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {process.documents}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground text-sm">{process.dueDate}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onViewProcess(process.id)}
                          className="p-2 hover:bg-secondary rounded transition-colors"
                        >
                          <Eye className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded transition-colors">
                          <Edit2 className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredProcesses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum processo encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
