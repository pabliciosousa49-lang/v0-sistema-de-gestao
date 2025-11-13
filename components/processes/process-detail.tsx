"use client"

import { ArrowLeft, FileText, Download, Upload, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface ProcessDetailProps {
  processId: number
  onClose: () => void
}

const processData = {
  1: {
    type: "Renovação de CNH",
    client: "João Silva",
    status: "Em Processamento",
    priority: "Alta",
    createdDate: "2025-10-15",
    dueDate: "2025-11-15",
    progress: 65,
    documents: [
      { name: "RG.pdf", size: "2.4 MB", uploadedDate: "2025-10-15", status: "approved" },
      { name: "CPF.pdf", size: "1.8 MB", uploadedDate: "2025-10-15", status: "approved" },
      { name: "Comprovante_Residencia.pdf", size: "3.1 MB", uploadedDate: "2025-10-16", status: "pending" },
    ],
    timeline: [
      { date: "2025-10-15", action: "Processo criado", status: "completed" },
      { date: "2025-10-16", action: "Documentos recebidos", status: "completed" },
      { date: "2025-10-17", action: "Análise em andamento", status: "in-progress" },
      { date: "2025-11-15", action: "Data de vencimento", status: "pending" },
    ],
  },
}

export default function ProcessDetail({ processId, onClose }: ProcessDetailProps) {
  const process = processData[processId as keyof typeof processData] || processData[1]

  const statusIcon =
    {
      "Em Processamento": Clock,
      Concluído: CheckCircle,
      Aguardando: AlertCircle,
    }[process.status] || AlertCircle

  const StatusIcon = statusIcon

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">{process.type}</h1>
            <span className="px-3 py-1 bg-chart-1/10 text-chart-1 rounded-full text-sm font-medium">
              {process.status}
            </span>
          </div>
          <p className="text-muted-foreground mt-2">Cliente: {process.client}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Progresso</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Conclusão</span>
                  <span className="text-sm font-bold text-primary">{process.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <div className="bg-primary h-full transition-all" style={{ width: `${process.progress}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground">Criado em</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{process.createdDate}</p>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground">Vencimento</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{process.dueDate}</p>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground">Prioridade</p>
                  <p className="text-sm font-semibold text-destructive mt-1">{process.priority}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documentos ({process.documents.length})
            </h2>
            <div className="space-y-3">
              {process.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.size} • {doc.uploadedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.status === "approved" && (
                      <span className="px-2 py-1 bg-chart-3/10 text-chart-3 rounded text-xs font-medium">Aprovado</span>
                    )}
                    {doc.status === "pending" && (
                      <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium">Pendente</span>
                    )}
                    <button className="p-2 hover:bg-primary/10 rounded transition-colors">
                      <Download className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Adicionar Documento
            </button>
          </div>

          {/* Timeline */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Histórico</h2>
            <div className="space-y-4">
              {process.timeline.map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        event.status === "completed"
                          ? "bg-chart-3 border-chart-3"
                          : event.status === "in-progress"
                            ? "bg-primary border-primary"
                            : "bg-secondary border-border"
                      }`}
                    />
                    {idx < process.timeline.length - 1 && <div className="w-0.5 h-12 bg-border my-2" />}
                  </div>
                  <div className="pt-1 pb-4">
                    <p className="font-medium text-foreground">{event.action}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Comments */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Anotações
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm text-foreground">Documentos recebidos e em análise</p>
                <p className="text-xs text-muted-foreground mt-1">Hoje 14:30</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm text-foreground">Cliente contatado para completar informações</p>
                <p className="text-xs text-muted-foreground mt-1">Ontem 10:15</p>
              </div>
            </div>
            <input
              type="text"
              placeholder="Adicione uma anotação..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Ações</h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                Aprovar Processo
              </button>
              <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                Contatar Cliente
              </button>
              <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                Gerar Documento
              </button>
              <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors text-sm font-medium">
                Enviar para Detran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
