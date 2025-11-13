"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Eye, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"

interface UserData {
  id: number
  name: string
  email: string
  role: "Admin" | "Gerente" | "Operador" | "Visualizador"
  status: "Ativo" | "Inativo"
  lastLogin: string
}

const mockUsers: UserData[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@detran.com.br",
    role: "Admin",
    status: "Ativo",
    lastLogin: "Hoje 14:30",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@detran.com.br",
    role: "Gerente",
    status: "Ativo",
    lastLogin: "Ontem 18:00",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@detran.com.br",
    role: "Operador",
    status: "Ativo",
    lastLogin: "2 dias atrás",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana@detran.com.br",
    role: "Visualizador",
    status: "Inativo",
    lastLogin: "1 semana atrás",
  },
]

const roleColors = {
  Admin: "bg-destructive/10 text-destructive",
  Gerente: "bg-primary/10 text-primary",
  Operador: "bg-chart-1/10 text-chart-1",
  Visualizador: "bg-muted/10 text-muted-foreground",
}

const statusColors = {
  Ativo: "bg-chart-3/10 text-chart-3",
  Inativo: "bg-muted/10 text-muted-foreground",
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<"Todos" | "Admin" | "Gerente" | "Operador" | "Visualizador">("Todos")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "Todos" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Gerenciar Usuários</h2>
          <p className="text-sm text-muted-foreground">Total: {mockUsers.length} usuários</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
          <Plus className="w-4 h-4" />
          Novo Usuário
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            placeholder="Buscar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          {(["Todos", "Admin", "Gerente", "Operador", "Visualizador"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                filterRole === role
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="text-left px-6 py-4 font-semibold text-foreground">Usuário</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">E-mail</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Função</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Último Acesso</th>
                <th className="text-center px-6 py-4 font-semibold text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {/* User Icon Placeholder */}
                      </div>
                      <p className="font-medium text-foreground">{user.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground text-sm">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground text-sm">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-secondary rounded transition-colors">
                        <Eye className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-2 hover:bg-secondary rounded transition-colors">
                        <Shield className="w-4 h-4 text-primary" />
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
