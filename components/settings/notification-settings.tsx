"use client"

import { useState } from "react"
import { Bell, Mail, Smartphone, AlertCircle, Save } from "lucide-react"

export default function NotificationSettings() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Canais de Notificação</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-4 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Notificações no Sistema</p>
              <p className="text-sm text-muted-foreground">Exibir alertas dentro da plataforma</p>
            </div>
          </label>
          <label className="flex items-center gap-4 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer">
            <Mail className="w-5 h-5 text-primary" />
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Notificações por E-mail</p>
              <p className="text-sm text-muted-foreground">Enviar alertas para e-mail configurado</p>
            </div>
          </label>
          <label className="flex items-center gap-4 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer">
            <Smartphone className="w-5 h-5 text-primary" />
            <input type="checkbox" className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Notificações via SMS</p>
              <p className="text-sm text-muted-foreground">Enviar alertas críticos por SMS</p>
            </div>
          </label>
        </div>
      </div>

      {/* Event Preferences */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Preferências de Eventos</h2>
        </div>
        <div className="space-y-4">
          {[
            { title: "Processo Criado", enabled: true },
            { title: "Processo Concluído", enabled: true },
            { title: "Documento Recusado", enabled: true },
            { title: "Prazo Próximo de Vencer", enabled: true },
            { title: "Prazo Vencido", enabled: true },
            { title: "Novo Cliente Registrado", enabled: false },
          ].map((event, idx) => (
            <label
              key={idx}
              className="flex items-center gap-4 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              <input type="checkbox" defaultChecked={event.enabled} className="w-5 h-5" />
              <span className="font-medium text-foreground">{event.title}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Frequency Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Frequência de Notificações</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Resumo Diário</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
              <option>08:00</option>
              <option>10:00</option>
              <option>14:00</option>
              <option>17:00</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Resumo Semanal</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
              <option>Segunda 09:00</option>
              <option>Sexta 16:00</option>
            </select>
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
