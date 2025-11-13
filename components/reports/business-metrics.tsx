"use client"

import type React from "react"

import { TrendingUp, TrendingDown, DollarSign, Users, Target, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

interface MetricCard {
  title: string
  value: string | number
  change: number
  unit?: string
  icon: React.ReactNode
  trend: "up" | "down" | "stable"
  benchmark?: string
}

export default function BusinessMetrics() {
  const metrics: MetricCard[] = [
    {
      title: "Receita Total",
      value: "R$ 45.230",
      change: 18,
      unit: "mês",
      icon: <DollarSign className="w-6 h-6" />,
      trend: "up",
      benchmark: "Meta: R$ 50k",
    },
    {
      title: "Processos Conclusão",
      value: "94%",
      change: 5,
      icon: <Target className="w-6 h-6" />,
      trend: "up",
      benchmark: "Meta: 95%",
    },
    {
      title: "Clientes Ativos",
      value: 48,
      change: 8,
      icon: <Users className="w-6 h-6" />,
      trend: "up",
      benchmark: "Mês anterior: 44",
    },
    {
      title: "Tempo Médio",
      value: "8.5",
      change: -12,
      unit: "dias",
      icon: <Clock className="w-6 h-6" />,
      trend: "down",
      benchmark: "Meta: < 10 dias",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <Card key={idx} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg text-primary">
              {metric.icon}
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-semibold ${
                metric.trend === "up"
                  ? "bg-chart-3/10 text-chart-3"
                  : metric.trend === "down"
                    ? "bg-accent/10 text-accent"
                    : "bg-muted/10 text-muted-foreground"
              }`}
            >
              {metric.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(metric.change)}%
            </div>
          </div>
          <h3 className="text-sm text-muted-foreground mb-1">{metric.title}</h3>
          <p className="text-2xl font-bold text-foreground mb-1">
            {metric.value}
            {metric.unit && <span className="text-sm font-normal text-muted-foreground"> {metric.unit}</span>}
          </p>
          {metric.benchmark && <p className="text-xs text-muted-foreground">{metric.benchmark}</p>}
        </Card>
      ))}
    </div>
  )
}
