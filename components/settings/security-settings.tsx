"use client"

import { useState } from "react"
import { Lock, Key, Shield, AlertTriangle, Save } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SecuritySettings() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Password Policy */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Key className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Política de Senhas</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Comprimento Mínimo da Senha</label>
            <Input type="number" defaultValue="12" min="8" className="w-full md:w-48" />
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm font-medium text-foreground">Exigir letras maiúsculas</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm font-medium text-foreground">Exigir números</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm font-medium text-foreground">Exigir caracteres especiais</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm font-medium text-foreground">Forçar alteração periódica (60 dias)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Autenticação em Duas Etapas</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-4 p-4 bg-secondary rounded-lg cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Exigir 2FA para Todos os Usuários</p>
              <p className="text-sm text-muted-foreground">Melhor segurança para a plataforma</p>
            </div>
          </label>
          <div className="p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
            <p className="text-sm text-foreground">
              <span className="font-medium">Métodos Disponíveis:</span> E-mail, SMS, Authenticator
            </p>
          </div>
        </div>
      </div>

      {/* Session Security */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Segurança de Sessão</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tempo de Inatividade (minutos)</label>
            <Input type="number" defaultValue="30" min="5" className="w-full md:w-48" />
          </div>
          <label className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm font-medium text-foreground">Encerrar todas as sessões ao alterar senha</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm font-medium text-foreground">Permitir apenas um login por usuário</span>
          </label>
        </div>
      </div>

      {/* IP Whitelist */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <h2 className="text-lg font-semibold text-foreground">Lista Branca de IPs</h2>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Apenas IPs permitidos podem acessar o sistema</p>
          <div className="space-y-2">
            <div className="p-3 bg-secondary rounded-lg flex items-center justify-between">
              <span className="text-foreground text-sm font-mono">192.168.1.100</span>
              <button className="text-destructive hover:text-destructive/80 text-sm font-medium">Remover</button>
            </div>
            <div className="p-3 bg-secondary rounded-lg flex items-center justify-between">
              <span className="text-foreground text-sm font-mono">10.0.0.0/24</span>
              <button className="text-destructive hover:text-destructive/80 text-sm font-medium">Remover</button>
            </div>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Adicionar IP ou CIDR" className="flex-1" />
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
              Adicionar
            </button>
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
