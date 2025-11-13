"use client"

import { ArrowLeft, Save } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SchedulingFormProps {
  onClose: () => void
}

export default function SchedulingForm({ onClose }: SchedulingFormProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Novo Agendamento</h1>
          <p className="text-muted-foreground mt-2">Agende uma visita ou consulta com cliente</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl">
        <form className="space-y-8">
          {/* Client Info */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Informações do Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cliente *</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
                  <option value="">Selecione...</option>
                  <option value="carlos">Carlos Mendes</option>
                  <option value="fernanda">Fernanda Lima</option>
                  <option value="roberto">Roberto Alves</option>
                  <option value="patricia">Patricia Oliveira</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Telefone</label>
                <Input placeholder="(11) 98765-4321" className="w-full" disabled />
              </div>
            </div>
          </div>

          {/* Schedule Details */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Detalhes do Agendamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Data *</label>
                <Input type="date" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Hora *</label>
                <Input type="time" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tipo de Compromisso *</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
                  <option value="">Selecione...</option>
                  <option value="consulta">Consulta</option>
                  <option value="entrega">Entrega de Documentos</option>
                  <option value="coleta">Coleta de Documentos</option>
                  <option value="renovacao">Renovação CNH</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Local *</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
                  <option value="">Selecione...</option>
                  <option value="escritorio">Escritório</option>
                  <option value="detran-centro">Detran - Centro</option>
                  <option value="detran-leste">Detran - Zona Leste</option>
                  <option value="detran-oeste">Detran - Zona Oeste</option>
                  <option value="cliente">Residência do Cliente</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Informações Adicionais</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <div className="space-y-2">
                  {["Pendente", "Confirmado", "Cancelado"].map((status) => (
                    <label key={status} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="status" value={status} className="w-4 h-4" />
                      <span className="text-foreground">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Observações</label>
                <textarea
                  placeholder="Adicione informações importantes sobre o agendamento..."
                  className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-32"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-foreground">Enviar lembrete ao cliente por WhatsApp</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              <Save className="w-5 h-5" />
              Agendar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
