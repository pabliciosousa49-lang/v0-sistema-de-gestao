"use client"

import { useState } from "react"
import { Database, Download, Calendar, AlertCircle, Check } from "lucide-react"

interface Backup {
  id: number
  date: string
  size: string
  status: "completed" | "failed" | "pending"
}

const mockBackups: Backup[] = [
  { id: 1, date: "Hoje 15:00", size: "2.4 GB", status: "completed" },
  { id: 2, date: "Ontem 15:00", size: "2.3 GB", status: "completed" },
  { id: 3, date: "2 dias atrás 15:00", size: "2.2 GB", status: "completed" },
  { id: 4, date: "3 dias atrás 15:00", size: "2.2 GB", status: "failed" },
]

export default function BackupSettings() {
  const [backupFrequency, setBackupFrequency] = useState("daily")

  return (
    <div className="space-y-6">
      {/* Backup Configuration */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Configuração de Backup</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Frequência de Backup</label>
            <select
              value={backupFrequency}
              onChange={(e) => setBackupFrequency(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-border rounded-lg bg-input text-foreground"
            >
              <option value="hourly">A cada hora</option>
              <option value="daily" selected>
                Diariamente
              </option>
              <option value="weekly">Semanalmente</option>
              <option value="monthly">Mensalmente</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Hora do Backup Diário</label>
            <input
              type="time"
              defaultValue="15:00"
              className="w-full md:w-64 px-4 py-2 border border-border rounded-lg bg-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Período de Retenção (dias)</label>
            <input
              type="number"
              defaultValue="30"
              min="7"
              className="w-full md:w-64 px-4 py-2 border border-border rounded-lg bg-input text-foreground"
            />
          </div>
          <label className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm font-medium text-foreground">Fazer backup automático na nuvem</span>
          </label>
        </div>
        <button className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
          Salvar Configurações
        </button>
      </div>

      {/* Manual Backup */}
      <div className="bg-chart-3/10 border border-chart-3/20 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-chart-3" />
          <h3 className="font-semibold text-foreground">Backup Manual</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Faça um backup agora ou restaure um backup anterior</p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-chart-3 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
            <Download className="w-4 h-4" />
            Fazer Backup Agora
          </button>
          <button className="px-4 py-2 border border-chart-3 text-chart-3 rounded-lg hover:bg-chart-3/5 transition-colors text-sm font-medium">
            Restaurar
          </button>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Histórico de Backups</h2>
        <div className="space-y-3">
          {mockBackups.map((backup) => (
            <div key={backup.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-4 flex-1">
                <Database className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{backup.date}</p>
                  <p className="text-xs text-muted-foreground">{backup.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {backup.status === "completed" && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-chart-3/10 text-chart-3 rounded text-xs font-medium">
                    <Check className="w-3 h-3" />
                    Completo
                  </span>
                )}
                {backup.status === "failed" && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-destructive/10 text-destructive rounded text-xs font-medium">
                    <AlertCircle className="w-3 h-3" />
                    Falhou
                  </span>
                )}
                <button className="p-2 hover:bg-primary/10 rounded transition-colors">
                  <Download className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
