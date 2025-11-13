"use client"

import { AlertTriangle, Lock, Activity, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function SecurityDashboard() {
  const securityMetrics = [
    {
      title: "Sessões Ativas",
      value: 12,
      icon: <Activity className="w-6 h-6" />,
      color: "text-chart-1",
    },
    {
      title: "2FA Habilitado",
      value: "85%",
      icon: <Lock className="w-6 h-6" />,
      color: "text-chart-3",
    },
    {
      title: "Usuários em Risco",
      value: 2,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "text-destructive",
    },
    {
      title: "Políticas Ativas",
      value: 8,
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "text-chart-3",
    },
  ]

  const recentSecurityEvents = [
    { time: "Há 5 min", event: "Múltiplas tentativas de login falhas", severity: "error" },
    { time: "Há 15 min", event: "Novo dispositivo vinculado à conta", severity: "warning" },
    { time: "Há 1h", event: "Acesso 2FA confirmado", severity: "success" },
    { time: "Há 2h", event: "Política de segurança atualizada", severity: "success" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard de Segurança</h2>
        <p className="text-muted-foreground">Monitoramento e alertas de segurança em tempo real</p>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {securityMetrics.map((metric, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`${metric.color}`}>{metric.icon}</div>
              <p className="text-sm text-muted-foreground">{metric.title}</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{metric.value}</p>
          </Card>
        ))}
      </div>

      {/* Security Alerts */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Alertas de Segurança</h3>
        <div className="space-y-3">
          {recentSecurityEvents.map((event, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
              <div
                className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  event.severity === "error"
                    ? "bg-destructive"
                    : event.severity === "warning"
                      ? "bg-accent"
                      : "bg-chart-3"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{event.event}</p>
                <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
