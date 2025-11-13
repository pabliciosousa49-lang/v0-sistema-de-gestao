"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ProtocolList from "./protocol-list"
import ProtocolForm from "./protocol-form"
import ProtocolTracking from "./protocol-tracking"
import { Plus, AlertCircle, FileText } from "lucide-react"

export default function ProtocolsView() {
  const [activeTab, setActiveTab] = useState("list")
  const [showForm, setShowForm] = useState(false)
  const [selectedProtocol, setSelectedProtocol] = useState(null)

  const protocols = [
    {
      id: 1,
      number: "DETRAN-2025-001234",
      client: "João Silva",
      process: "Regularização de Veículo",
      submittedDate: "2025-01-08",
      expectedDate: "2025-01-15",
      status: "processing",
      organ: "DETRAN - Brasília",
      description: "Regularização de documentação veicular",
      steps: [
        { step: 1, name: "Recebimento", completed: true, date: "2025-01-08" },
        { step: 2, name: "Verificação de Documentos", completed: true, date: "2025-01-09" },
        { step: 3, name: "Análise da Solicitação", completed: false, date: null },
        { step: 4, name: "Aprovação", completed: false, date: null },
        { step: 5, name: "Entrega", completed: false, date: null },
      ],
    },
    {
      id: 2,
      number: "DETRAN-2025-001233",
      client: "Maria Santos",
      process: "CNH Primeira Categoria",
      submittedDate: "2025-01-05",
      expectedDate: "2025-01-12",
      status: "completed",
      organ: "DETRAN - São Paulo",
      description: "Processo de CNH primeira categoria com exames",
      steps: [
        { step: 1, name: "Recebimento", completed: true, date: "2025-01-05" },
        { step: 2, name: "Verificação de Documentos", completed: true, date: "2025-01-05" },
        { step: 3, name: "Agendamento de Exames", completed: true, date: "2025-01-06" },
        { step: 4, name: "Realização de Exames", completed: true, date: "2025-01-10" },
        { step: 5, name: "Entrega de CNH", completed: true, date: "2025-01-11" },
      ],
    },
    {
      id: 3,
      number: "DETRAN-2025-001232",
      client: "Pedro Costa",
      process: "Transferência de Veículo",
      submittedDate: "2025-01-02",
      expectedDate: "2025-01-09",
      status: "pending",
      organ: "DETRAN - Rio de Janeiro",
      description: "Transferência de propriedade veicular",
      steps: [
        { step: 1, name: "Recebimento", completed: true, date: "2025-01-02" },
        { step: 2, name: "Verificação de Documentos", completed: false, date: null },
        { step: 3, name: "Análise da Transferência", completed: false, date: null },
        { step: 4, name: "Pagamento de Taxas", completed: false, date: null },
        { step: 5, name: "Finalização", completed: false, date: null },
      ],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "chart-3"
      case "processing":
        return "primary"
      case "pending":
        return "accent"
      default:
        return "muted"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Concluído"
      case "processing":
        return "Em Processamento"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  const pendingProtocols = protocols.filter((p) => p.status === "pending")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Controle de Protocolos</h1>
          <p className="text-muted-foreground mt-1">Acompanhe protocolos e processos nos órgãos</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Protocolo
        </Button>
      </div>

      {pendingProtocols.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Você tem <strong>{pendingProtocols.length} protocolo(s)</strong> aguardando processamento
          </AlertDescription>
        </Alert>
      )}

      {showForm && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Registrar Novo Protocolo</CardTitle>
          </CardHeader>
          <CardContent>
            <ProtocolForm onClose={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{protocols.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total de Protocolos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">{protocols.filter((p) => p.status === "pending").length}</p>
              <p className="text-sm text-muted-foreground mt-1">Pendentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">
                {protocols.filter((p) => p.status === "processing").length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Em Processamento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-chart-3">
                {protocols.filter((p) => p.status === "completed").length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Concluídos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Protocolos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list">Listagem</TabsTrigger>
              <TabsTrigger value="tracking">Rastreamento</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-4">
              <ProtocolList
                protocols={protocols}
                getStatusColor={getStatusColor}
                getStatusLabel={getStatusLabel}
                onSelectProtocol={setSelectedProtocol}
              />
            </TabsContent>
            <TabsContent value="tracking" className="mt-4">
              <ProtocolTracking protocols={protocols} />
            </TabsContent>
            <TabsContent value="timeline" className="mt-4">
              {selectedProtocol ? (
                <div className="space-y-4">
                  {protocols
                    .find((p) => p.id === selectedProtocol)
                    ?.steps.map((step) => (
                      <div key={step.step} className="flex gap-4 items-start">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                            step.completed ? "bg-chart-3" : "bg-muted"
                          }`}
                        >
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{step.name}</h3>
                          {step.date && <p className="text-sm text-muted-foreground">{step.date}</p>}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Selecione um protocolo na listagem</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
