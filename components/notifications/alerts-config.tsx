"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"

export default function AlertsConfig() {
  const [config, setConfig] = useState({
    documentDue: { enabled: true, daysBefore: 3 },
    appointmentReminder: { enabled: true, hoursBefore: 2 },
    protocolUpdates: { enabled: true, daysBefore: 0 },
    processCompleted: { enabled: true, daysBefore: 0 },
    emailNotifications: true,
    browserNotifications: true,
  })

  const handleSave = () => {
    console.log("Configurações salvas:", config)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tipos de Alertas</CardTitle>
          <CardDescription>Escolha quais notificações deseja receber</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-semibold">Documentos Vencendo</Label>
                <p className="text-sm text-muted-foreground">Alertas para documentos próximos do vencimento</p>
              </div>
              <Switch
                checked={config.documentDue.enabled}
                onCheckedChange={(checked) =>
                  setConfig({
                    ...config,
                    documentDue: { ...config.documentDue, enabled: checked },
                  })
                }
              />
            </div>
            {config.documentDue.enabled && (
              <div className="ml-6 flex items-center gap-2">
                <Label htmlFor="docDays">Alertar com antecedência de:</Label>
                <Input
                  id="docDays"
                  type="number"
                  min="1"
                  max="30"
                  value={config.documentDue.daysBefore}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      documentDue: { ...config.documentDue, daysBefore: Number.parseInt(e.target.value) },
                    })
                  }
                  className="w-20"
                />
                <span>dias</span>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-semibold">Lembretes de Agendamento</Label>
                <p className="text-sm text-muted-foreground">Alertas para agendamentos próximos</p>
              </div>
              <Switch
                checked={config.appointmentReminder.enabled}
                onCheckedChange={(checked) =>
                  setConfig({
                    ...config,
                    appointmentReminder: { ...config.appointmentReminder, enabled: checked },
                  })
                }
              />
            </div>
            {config.appointmentReminder.enabled && (
              <div className="ml-6 flex items-center gap-2 mt-2">
                <Label htmlFor="apptHours">Alertar com antecedência de:</Label>
                <Input
                  id="apptHours"
                  type="number"
                  min="1"
                  max="24"
                  value={config.appointmentReminder.hoursBefore}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      appointmentReminder: {
                        ...config.appointmentReminder,
                        hoursBefore: Number.parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-20"
                />
                <span>horas</span>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-semibold">Atualizações de Protocolos</Label>
                <p className="text-sm text-muted-foreground">Notificações quando protocolos são atualizados</p>
              </div>
              <Switch
                checked={config.protocolUpdates.enabled}
                onCheckedChange={(checked) =>
                  setConfig({
                    ...config,
                    protocolUpdates: { ...config.protocolUpdates, enabled: checked },
                  })
                }
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-semibold">Processos Concluídos</Label>
                <p className="text-sm text-muted-foreground">Notificações quando processos são finalizados</p>
              </div>
              <Switch
                checked={config.processCompleted.enabled}
                onCheckedChange={(checked) =>
                  setConfig({
                    ...config,
                    processCompleted: { ...config.processCompleted, enabled: checked },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Canais de Notificação</CardTitle>
          <CardDescription>Escolha como deseja receber as notificações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Notificações por Email</Label>
              <p className="text-sm text-muted-foreground">Receba alertas por email</p>
            </div>
            <Switch
              checked={config.emailNotifications}
              onCheckedChange={(checked) => setConfig({ ...config, emailNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Notificações do Navegador</Label>
              <p className="text-sm text-muted-foreground">Receba notificações push no navegador</p>
            </div>
            <Switch
              checked={config.browserNotifications}
              onCheckedChange={(checked) => setConfig({ ...config, browserNotifications: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="gap-2 w-full md:w-auto">
        <Save className="w-4 h-4" />
        Salvar Configurações
      </Button>
    </div>
  )
}
