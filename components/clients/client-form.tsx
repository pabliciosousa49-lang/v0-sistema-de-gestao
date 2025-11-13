"use client"

import { ArrowLeft, Save } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ClientFormProps {
  onClose: () => void
}

export default function ClientForm({ onClose }: ClientFormProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Novo Cliente</h1>
          <p className="text-muted-foreground mt-2">Preencha os dados para registrar um novo cliente</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <form className="space-y-8">
          {/* Personal Info */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Informações Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nome Completo *</label>
                <Input placeholder="Ex: João Silva" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">CPF *</label>
                <Input placeholder="Ex: 123.456.789-10" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">RG *</label>
                <Input placeholder="Ex: 12.345.678-9" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Data de Nascimento</label>
                <Input type="date" className="w-full" />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Informações de Contato</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <Input type="email" placeholder="Ex: joao@email.com" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Telefone *</label>
                <Input placeholder="Ex: (11) 98765-4321" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Celular Secundário</label>
                <Input placeholder="Ex: (11) 97654-3210" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">WhatsApp</label>
                <Input placeholder="Ex: (11) 98765-4321" className="w-full" />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Endereço</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Rua *</label>
                <Input placeholder="Ex: Rua A" className="w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Número *</label>
                  <Input placeholder="Ex: 123" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Complemento</label>
                  <Input placeholder="Ex: Apto 201" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CEP *</label>
                  <Input placeholder="Ex: 01234-567" className="w-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bairro *</label>
                  <Input placeholder="Ex: Centro" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Cidade *</label>
                  <Input placeholder="Ex: São Paulo" className="w-full" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Estado *</label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
                  <option value="">Selecione...</option>
                  <option value="SP">São Paulo (SP)</option>
                  <option value="RJ">Rio de Janeiro (RJ)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Observations */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Observações</h2>
            <textarea
              placeholder="Adicione informações adicionais sobre o cliente..."
              className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-32"
            />
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
              Salvar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
