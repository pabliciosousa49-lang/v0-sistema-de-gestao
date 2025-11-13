"use client"

import { useState } from "react"
import { Download, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"

interface AuditLog {
  id: number
  timestamp: string
  user: string
  action: string
  resource: string
  status: "success" | "warning" | "error"
  details: string
  ipAddress: string
}

const mockLogs: AuditLog[] = [
  {
    id: 1,
    timestamp: "2025-11-09 14:30:25",
    user: "João Silva",
    action: "LOGIN",
    resource: "Sistema",
    status: "success",
    details: "Login bem-sucedido via email",
    ipAddress: "192.168.1.100",
  },
  {
    id: 2,
    timestamp: "2025-11-09 14:28:15",
    user: "Maria Santos",
    action: "CREATE",
    resource: "Processo #1245",
    status: "success",
    details: "Novo processo de renovação CNH criado",
    ipAddress: "10.0.0.50",
  },
  {
    id: 3,
    timestamp: "2025-11-09 14:25:00",
    user: "Pedro Costa",
    action: "UPDATE",
    resource: "Documento #567",
    status: "success",
    details: "Documento atualizado com novo status",
    ipAddress: "192.168.1.105",
  },
  {
    id: 4,
    timestamp: "2025-11-09 14:20:30",
    user: "Admin",
    action: "DELETE",
    resource: "Usuário: Ana Silva",
    status: "warning",
    details: "Usuário deletado do sistema",
    ipAddress: "192.168.1.1",
  },
  {
    id: 5,
    timestamp: "2025-11-09 14:15:45",
    user: "Sistema",
    action: "FAILED_LOGIN",
    resource: "Sistema",
    status: "error",
    details: "Tentativa de login com credenciais inválidas",
    ipAddress: "203.0.113.45",
  },
]

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>(mockLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("todos")
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = filterAction === "todos" || log.action === filterAction
    return matchesSearch && matchesAction
  })

  const statusColors = {
    success: "bg-chart-3/10 text-chart-3",
    warning: "bg-accent/10 text-accent",
    error: "bg-destructive/10 text-destructive",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Auditoria e Logs</h2>
        <p className="text-muted-foreground">Histórico completo de ações e eventos do sistema</p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Buscar</label>
            <input
              type="text"
              placeholder="Usuário, recurso ou ação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="w-full md:w-40">
            <label className="block text-sm font-medium text-foreground mb-2">Filtrar por Ação</label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
            >
              <option value="todos">Todas</option>
              <option value="LOGIN">Login</option>
              <option value="CREATE">Criar</option>
              <option value="UPDATE">Atualizar</option>
              <option value="DELETE">Deletar</option>
              <option value="FAILED_LOGIN">Login Falhou</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </Card>

      {/* Logs Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="text-left px-6 py-4 font-semibold text-foreground text-sm">Data/Hora</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground text-sm">Usuário</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground text-sm">Ação</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground text-sm">Recurso</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground text-sm">Status</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">{log.timestamp}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{log.user}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{log.resource}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[log.status]}`}>
                      {log.status === "success" ? "Sucesso" : log.status === "warning" ? "Aviso" : "Erro"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="p-2 hover:bg-secondary rounded transition-colors"
                    >
                      <Eye className="w-4 h-4 text-primary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Log Details Modal */}
      {selectedLog && (
        <Card className="p-6 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Detalhes do Log</h3>
            <button
              onClick={() => setSelectedLog(null)}
              className="text-muted-foreground hover:text-foreground text-2xl"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
              <p className="text-foreground font-mono text-sm">{selectedLog.timestamp}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">IP Address</p>
              <p className="text-foreground font-mono text-sm">{selectedLog.ipAddress}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Usuário</p>
              <p className="text-foreground font-medium">{selectedLog.user}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Ação</p>
              <p className="text-foreground font-medium">{selectedLog.action}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Detalhes</p>
              <p className="text-foreground">{selectedLog.details}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
