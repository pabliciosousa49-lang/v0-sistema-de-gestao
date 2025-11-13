"use client"

import { useState } from "react"
import { Plus, Download, Mail, ChevronDown, Calendar, DollarSign, AlertCircle, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Invoice {
  id: string
  client: string
  process: string
  value: number
  date: string
  dueDate: string
  status: "Pago" | "Pendente" | "Vencido"
  method?: string
}

const mockInvoices: Invoice[] = [
  {
    id: "FAT-001",
    client: "João Silva",
    process: "Renovação de CNH",
    value: 350.0,
    date: "2025-11-05",
    dueDate: "2025-11-15",
    status: "Pago",
    method: "PIX",
  },
  {
    id: "FAT-002",
    client: "Maria Santos",
    process: "Transferência de Veículo",
    value: 650.0,
    date: "2025-11-03",
    dueDate: "2025-11-13",
    status: "Pendente",
  },
  {
    id: "FAT-003",
    client: "Pedro Costa",
    process: "Licenciamento Anual",
    value: 280.0,
    date: "2025-10-28",
    dueDate: "2025-11-07",
    status: "Vencido",
  },
  {
    id: "FAT-004",
    client: "Ana Oliveira",
    process: "Segunda Via de CNH",
    value: 200.0,
    date: "2025-11-01",
    dueDate: "2025-11-11",
    status: "Pago",
    method: "Cartão",
  },
  {
    id: "FAT-005",
    client: "Carlos Mendes",
    process: "Ativação de Acúmulo",
    value: 150.0,
    date: "2025-11-04",
    dueDate: "2025-11-14",
    status: "Pendente",
  },
]

export default function BillingView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"Todos" | "Pago" | "Pendente" | "Vencido">("Todos")
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null)

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "Todos" || invoice.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const totalValue = filteredInvoices.reduce((sum, inv) => sum + inv.value, 0)
  const totalPaid = filteredInvoices.filter((inv) => inv.status === "Pago").reduce((sum, inv) => sum + inv.value, 0)
  const totalPending = filteredInvoices
    .filter((inv) => inv.status === "Pendente" || inv.status === "Vencido")
    .reduce((sum, inv) => sum + inv.value, 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pago":
        return CheckCircle
      case "Pendente":
        return AlertCircle
      case "Vencido":
        return AlertCircle
      default:
        return AlertCircle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-chart-3/10 text-chart-3"
      case "Pendente":
        return "bg-accent/10 text-accent"
      case "Vencido":
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
          <h1 className="text-3xl font-bold text-foreground">Faturamento</h1>
          <p className="text-muted-foreground mt-2">Gerencie faturas e pagamentos dos clientes</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
          <Plus className="w-5 h-5" />
          Nova Fatura
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total em Faturas</h3>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">R$ {totalValue.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">{filteredInvoices.length} faturas</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Valores Recebidos</h3>
            <CheckCircle className="w-5 h-5 text-chart-3" />
          </div>
          <p className="text-3xl font-bold text-foreground">R$ {totalPaid.toFixed(2)}</p>
          <p className="text-xs text-chart-3 font-semibold mt-2">
            ↑ {Math.round((totalPaid / totalValue) * 100)}% do total
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Valores em Aberto</h3>
            <AlertCircle className="w-5 h-5 text-accent" />
          </div>
          <p className="text-3xl font-bold text-foreground">R$ {totalPending.toFixed(2)}</p>
          <p className="text-xs text-accent font-semibold mt-2">Pendente/Vencido</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Input
            placeholder="Buscar por número ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {(["Todos", "Pago", "Pendente", "Vencido"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:border-primary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="text-left px-6 py-4 font-semibold text-foreground">Fatura</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Cliente</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Processo</th>
                <th className="text-right px-6 py-4 font-semibold text-foreground">Valor</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Vencimento</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Status</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, idx) => {
                const StatusIcon = getStatusIcon(invoice.status)
                const isExpanded = expandedInvoice === invoice.id

                return (
                  <tr key={invoice.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-mono font-semibold text-foreground">{invoice.id}</p>
                      <p className="text-xs text-muted-foreground">{invoice.date}</p>
                    </td>
                    <td className="px-6 py-4 text-foreground font-medium">{invoice.client}</td>
                    <td className="px-6 py-4 text-foreground text-sm">{invoice.process}</td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-bold text-foreground">R$ {invoice.value.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {invoice.dueDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <StatusIcon
                          className={`w-4 h-4 ${
                            invoice.status === "Pago"
                              ? "text-chart-3"
                              : invoice.status === "Pendente"
                                ? "text-accent"
                                : "text-destructive"
                          }`}
                        />
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}
                        >
                          {invoice.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setExpandedInvoice(isExpanded ? null : invoice.id)}
                          className="p-2 hover:bg-primary/10 rounded transition-colors"
                        >
                          <ChevronDown
                            className={`w-4 h-4 text-primary transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                        <button className="p-2 hover:bg-primary/10 rounded transition-colors">
                          <Download className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-primary/10 rounded transition-colors">
                          <Mail className="w-4 h-4 text-primary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma fatura encontrada</p>
          </div>
        )}
      </div>

      {/* Recent Payments */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Pagamentos Recentes</h2>
          <div className="space-y-4">
            {mockInvoices
              .filter((inv) => inv.status === "Pago")
              .map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-foreground text-sm">{invoice.client}</p>
                    <p className="text-xs text-muted-foreground">
                      {invoice.id} • {invoice.method}
                    </p>
                  </div>
                  <p className="font-bold text-chart-3">R$ {invoice.value.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
              Gerar Fatura
            </button>
            <button className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
              Enviar Lembretes
            </button>
            <button className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
              Relatório Financeiro
            </button>
            <button className="w-full px-4 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors text-sm font-medium">
              Configurar Pagamentos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
