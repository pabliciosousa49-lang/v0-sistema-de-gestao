"use client"

import { useState } from "react"
import { Save, Building2, Globe, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function GeneralSettings() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Informações da Empresa</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Nome da Empresa</label>
            <Input defaultValue="Sistema DETRAN - Despachante" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">CNPJ</label>
            <Input defaultValue="12.345.678/0001-90" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">E-mail Corporativo</label>
            <Input type="email" defaultValue="contato@detran-despachante.com.br" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Telefone</label>
            <Input defaultValue="(11) 3000-0000" className="w-full" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Endereço</label>
            <Input defaultValue="Avenida Paulista, 1000 - São Paulo, SP" className="w-full" />
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Configurações Regionais</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Idioma</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
              <option>Português (Brasil)</option>
              <option>Inglês</option>
              <option>Espanhol</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Fuso Horário</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
              <option>UTC-03:00 (Brasília)</option>
              <option>UTC-04:00 (Amazonas)</option>
              <option>UTC-05:00 (Acre)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Formato de Data</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Configurações do Sistema</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Manutenção Programada</p>
              <p className="text-sm text-muted-foreground">Ativar modo de manutenção</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Modo Demonstração</p>
              <p className="text-sm text-muted-foreground">Restringir alterações em dados</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Logs Detalhados</p>
              <p className="text-sm text-muted-foreground">Registrar todas as atividades do sistema</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <Save className="w-5 h-5" />
          Salvar Alterações
        </button>
        {saved && (
          <div className="flex items-center px-4 text-chart-3 text-sm font-medium">✓ Alterações salvas com sucesso</div>
        )}
      </div>
    </div>
  )
}
