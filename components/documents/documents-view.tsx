"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import DocumentList from "./document-list"
import DocumentForm from "./document-form"
import { AlertTriangle, Plus, FileText } from "lucide-react"

export default function DocumentsView() {
  const [activeTab, setActiveTab] = useState("pending")
  const [showForm, setShowForm] = useState(false)

  const pendingDocuments = [
    {
      id: 1,
      name: "RG",
      client: "João Silva",
      process: "Regularização de Veículo",
      status: "pending",
      dueDate: "2025-01-15",
      priority: "high",
      notes: "Cliente precisa fazer cópia",
    },
    {
      id: 2,
      name: "Comprovante de Residência",
      client: "Maria Santos",
      process: "CNH Primeira Categoria",
      status: "pending",
      dueDate: "2025-01-20",
      priority: "medium",
      notes: "Pode ser conta de água ou luz",
    },
    {
      id: 3,
      name: "Atestado Médico",
      client: "Pedro Costa",
      process: "CNH Primeira Categoria",
      status: "pending",
      dueDate: "2025-01-10",
      priority: "high",
      notes: "Urgente - vencimento próximo",
    },
  ]

  const receivedDocuments = [
    {
      id: 4,
      name: "CNH Original",
      client: "Ana Oliveira",
      process: "Renovação de CNH",
      status: "received",
      receivedDate: "2025-01-08",
      priority: "low",
      notes: "Documentação completa",
    },
    {
      id: 5,
      name: "Comprovante de Pagamento IPVA",
      client: "Carlos Mendes",
      process: "Transferência de Veículo",
      status: "received",
      receivedDate: "2025-01-07",
      priority: "medium",
      notes: "Aguardando protocolo",
    },
  ]

  const stats = {
    pending: pendingDocuments.length,
    overdue: 2,
    received: receivedDocuments.length,
    missingTotal: 5,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Controle de Documentos</h1>
          <p className="text-muted-foreground mt-1">Gerencie documentos recebidos, pendentes e vencidos</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Documento
        </Button>
      </div>

      {stats.overdue > 0 && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            Você tem <strong>{stats.overdue} documentos vencidos</strong> que precisam de atenção imediata
          </AlertDescription>
        </Alert>
      )}

      {showForm && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Registrar Novo Documento</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentForm onClose={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{stats.pending}</p>
              <p className="text-sm text-muted-foreground mt-1">Documentos Pendentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-destructive">{stats.overdue}</p>
              <p className="text-sm text-muted-foreground mt-1">Vencidos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">{stats.received}</p>
              <p className="text-sm text-muted-foreground mt-1">Documentos Recebidos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-chart-4">{stats.missingTotal}</p>
              <p className="text-sm text-muted-foreground mt-1">Faltando</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pending">Pendentes ({stats.pending})</TabsTrigger>
              <TabsTrigger value="received">Recebidos ({stats.received})</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
              <DocumentList documents={pendingDocuments} type="pending" />
            </TabsContent>
            <TabsContent value="received" className="mt-4">
              <DocumentList documents={receivedDocuments} type="received" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
