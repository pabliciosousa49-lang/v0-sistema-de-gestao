"use client"

import { useState } from "react"
import { Search, Plus, Phone, Mail, MapPin, Edit2, Trash2, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Client {
  id: number
  name: string
  cpf: string
  phone: string
  email: string
  address: string
  processCount: number
  status: "Ativo" | "Inativo"
  joinDate: string
}

const mockClients: Client[] = [
  {
    id: 1,
    name: "João Silva",
    cpf: "123.456.789-10",
    phone: "(11) 98765-4321",
    email: "joao@email.com",
    address: "Rua A, 123 - São Paulo, SP",
    processCount: 3,
    status: "Ativo",
    joinDate: "2025-01-15",
  },
  {
    id: 2,
    name: "Maria Santos",
    cpf: "987.654.321-00",
    phone: "(11) 99876-5432",
    email: "maria@email.com",
    address: "Rua B, 456 - São Paulo, SP",
    processCount: 5,
    status: "Ativo",
    joinDate: "2024-12-20",
  },
  {
    id: 3,
    name: "Pedro Costa",
    cpf: "456.789.123-45",
    phone: "(11) 97654-3210",
    email: "pedro@email.com",
    address: "Rua C, 789 - São Paulo, SP",
    processCount: 2,
    status: "Ativo",
    joinDate: "2025-02-10",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    cpf: "789.123.456-78",
    phone: "(11) 96543-2109",
    email: "ana@email.com",
    address: "Rua D, 321 - São Paulo, SP",
    processCount: 1,
    status: "Inativo",
    joinDate: "2024-11-05",
  },
]

interface ClientListProps {
  onAddClient: () => void
}

export default function ClientList({ onAddClient }: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"Todos" | "Ativo" | "Inativo">("Todos")

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cpf.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "Todos" || client.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciador de Clientes</h1>
          <p className="text-muted-foreground mt-2">Gerencie todos os clientes e seus dados cadastrais</p>
        </div>
        <button
          onClick={onAddClient}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <Plus className="w-5 h-5" />
          Novo Cliente
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, CPF ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {(["Todos", "Ativo", "Inativo"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Total de Clientes</p>
          <p className="text-2xl font-bold text-foreground">{mockClients.length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Ativos</p>
          <p className="text-2xl font-bold text-chart-3">{mockClients.filter((c) => c.status === "Ativo").length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Inativos</p>
          <p className="text-2xl font-bold text-accent">{mockClients.filter((c) => c.status === "Inativo").length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Processos Totais</p>
          <p className="text-2xl font-bold text-primary">{mockClients.reduce((sum, c) => sum + c.processCount, 0)}</p>
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="text-left px-6 py-4 font-semibold text-foreground">Nome</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">CPF</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Contato</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Endereço</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Processos</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Status</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{client.name}</p>
                      <p className="text-xs text-muted-foreground">Desde {client.joinDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground font-mono">{client.cpf}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Phone className="w-4 h-4" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {client.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{client.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {client.processCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        client.status === "Ativo" ? "bg-chart-3/10 text-chart-3" : "bg-accent/10 text-accent"
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-secondary rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-2 hover:bg-secondary rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                      <button className="p-2 hover:bg-secondary rounded transition-colors">
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum cliente encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
