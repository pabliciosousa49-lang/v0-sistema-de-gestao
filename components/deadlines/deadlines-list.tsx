"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Clock, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function DeadlinesList({ deadlines }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />
      case "urgent":
        return <Clock className="w-4 h-4" />
      case "upcoming":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

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

  const getStatusLabel = (status) => {
    switch (status) {
      case "overdue":
        return "Vencido"
      case "urgent":
        return "Urgente"
      case "upcoming":
        return "Próximo"
      default:
        return status
    }
  }

  const getTypeLabel = (type) => {
    const types = {
      document: "Documento",
      protocol: "Protocolo",
      appointment: "Agendamento",
      process: "Processo",
    }
    return types[type] || type
  }

  return (
    <div className="rounded-lg border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Item</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data Limite</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deadlines.map((deadline) => (
            <TableRow key={deadline.id} className={deadline.status === "overdue" ? "bg-destructive/5" : ""}>
              <TableCell className="font-medium">{deadline.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{getTypeLabel(deadline.type)}</Badge>
              </TableCell>
              <TableCell>{deadline.client}</TableCell>
              <TableCell className="font-mono text-sm">
                {format(new Date(deadline.dueDate), "dd/MM/yyyy", { locale: ptBR })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{getStatusIcon(deadline.status)}</span>
                  <Badge variant={getStatusColor(deadline.status)}>{getStatusLabel(deadline.status)}</Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Marcar Concluído
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
