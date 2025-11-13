"use client"

import { useState } from "react"
import { Zap, Check, X, SettingsIcon, Plus } from "lucide-react"

interface Integration {
  id: number
  name: string
  description: string
  status: "connected" | "disconnected"
  lastSync?: string
}

const integrations: Integration[] = [
  {
    id: 1,
    name: "Portal DETRAN",
    description: "Integração com os sistemas oficiais do DETRAN",
    status: "connected",
    lastSync: "Hoje 14:32",
  },
  {
    id: 2,
    name: "Sistema de Notificações",
    description: "Envio de SMS e e-mail automático",
    status: "connected",
    lastSync: "Há 2 horas",
  },
  {
    id: 3,
    name: "Integração Bancária",
    description: "Processamento de pagamentos",
    status: "disconnected",
  },
  {
    id: 4,
    name: "Google Drive",
    description: "Armazenamento de documentos na nuvem",
    status: "connected",
    lastSync: "Ontem 09:15",
  },
  {
    id: 5,
    name: "Calendário",
    description: "Sincronização de agendamentos",
    status: "disconnected",
  },
]

export default function IntegrationSettings() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Integrações</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
          <Plus className="w-4 h-4" />
          Adicionar Integração
        </button>
      </div>

      {/* Integrations List */}
      <div className="grid grid-cols-1 gap-4">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-foreground">{integration.name}</h3>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      integration.status === "connected"
                        ? "bg-chart-3/10 text-chart-3"
                        : "bg-muted/10 text-muted-foreground"
                    }`}
                  >
                    {integration.status === "connected" ? (
                      <>
                        <Check className="w-3 h-3" />
                        Conectada
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3" />
                        Desconectada
                      </>
                    )}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{integration.description}</p>
                {integration.lastSync && (
                  <p className="text-xs text-muted-foreground mt-2">Última sincronização: {integration.lastSync}</p>
                )}
              </div>
              <button
                onClick={() => setExpandedId(expandedId === integration.id ? null : integration.id)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <SettingsIcon className="w-5 h-5 text-primary" />
              </button>
            </div>

            {/* Expanded Details */}
            {expandedId === integration.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div className="space-y-3">
                  {integration.status === "connected" ? (
                    <>
                      <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium">
                        Verificar Sincronização
                      </button>
                      <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-secondary/50 transition-colors text-sm font-medium">
                        Desconectar
                      </button>
                    </>
                  ) : (
                    <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                      Conectar
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
