"use client"

import { ArrowLeft, Save, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ProcessFormProps {
  onClose: () => void
}

export default function ProcessForm({ onClose }: ProcessFormProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Novo Processo</h1>
          <p className="text-muted-foreground mt-2">Registre um novo processo DETRAN</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <form className="space-y-8">
          {/* Basic Info */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tipo de Processo *</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
                  <option value="">Selecione...</option>
                  <option value="renovacao-cnh">Renovação de CNH</option>
                  <option value="transferencia-veiculo">Transferência de Veículo</option>
                  <option value="licenciamento">Licenciamento Anual</option>
                  <option value="segunda-via-cnh">Segunda Via de CNH</option>
                  <option value="acumulo-pontos">Ativação de Acúmulo de Pontos</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cliente *</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
                  <option value="">Selecione...</option>
                  <option value="joao">João Silva</option>
                  <option value="maria">Maria Santos</option>
                  <option value="pedro">Pedro Costa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Prioridade *</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
                  <option value="baixa">Baixa</option>
                  <option value="media" defaultValue="media">
                    Média
                  </option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Data de Vencimento *</label>
                <Input type="date" className="w-full" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Detalhes do Processo</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descrição</label>
                <textarea
                  placeholder="Descreva os detalhes do processo..."
                  className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-32"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Observações</label>
                <textarea
                  placeholder="Adicione informações adicionais..."
                  className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
                />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Documentos Necessários</h2>
            <div className="space-y-3">
              {["RG", "CPF", "CNH", "Comprovante de Endereço"].map((doc, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-secondary/30 cursor-pointer transition-colors"
                >
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-foreground font-medium">{doc}</span>
                </label>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-foreground mb-4">Upload de Documentos</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-foreground font-medium">Arraste arquivos aqui ou clique para selecionar</p>
                <p className="text-xs text-muted-foreground mt-1">Máximo 5 MB por arquivo</p>
              </div>
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
              Criar Processo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
