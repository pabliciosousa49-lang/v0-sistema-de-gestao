"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card } from "@/components/ui/card"

export default function AdvancedAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const conversionFunnelData = [
    { stage: "Leads", value: 250 },
    { stage: "Contato", value: 180 },
    { stage: "Proposta", value: 120 },
    { stage: "Aceito", value: 95 },
    { stage: "Processo", value: 87 },
    { stage: "Concluído", value: 78 },
  ]

  const timeSeriesData = [
    { date: "01/11", revenue: 1200, expenses: 300, profit: 900 },
    { date: "02/11", revenue: 1900, expenses: 320, profit: 1580 },
    { date: "03/11", revenue: 1500, expenses: 310, profit: 1190 },
    { date: "04/11", revenue: 2200, expenses: 380, profit: 1820 },
    { date: "05/11", revenue: 2290, expenses: 410, profit: 1880 },
    { date: "06/11", revenue: 2000, expenses: 390, profit: 1610 },
  ]

  const segmentData = [
    { segment: "CNH", value: 35 },
    { segment: "Veículos", value: 28 },
    { segment: "Licenciamento", value: 26 },
    { segment: "2ª Via", value: 20 },
    { segment: "Diversos", value: 16 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Analytics Avançada</h2>

        {/* Revenue Trend */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Tendência de Receita vs Despesas</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: `1px solid var(--color-border)`,
                  borderRadius: "0.5rem",
                  color: "var(--color-foreground)",
                }}
                formatter={(value) => `R$ ${value}`}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-chart-3)" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="var(--color-chart-2)" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="var(--color-chart-1)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Conversion Funnel */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Funil de Conversão</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={conversionFunnelData}
              layout="vertical"
              margin={{ top: 0, right: 30, left: 100, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" stroke="var(--color-muted-foreground)" />
              <YAxis dataKey="stage" type="category" stroke="var(--color-muted-foreground)" width={90} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: `1px solid var(--color-border)`,
                  borderRadius: "0.5rem",
                  color: "var(--color-foreground)",
                }}
              />
              <Bar dataKey="value" fill="var(--color-chart-1)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Segment Performance */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Performance por Segmento</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="segment" name="Segmento" stroke="var(--color-muted-foreground)" />
              <YAxis dataKey="value" name="Processos" stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: `1px solid var(--color-border)`,
                  borderRadius: "0.5rem",
                  color: "var(--color-foreground)",
                }}
                cursor={{ fill: "var(--color-secondary)" }}
              />
              <Scatter name="Processos" data={segmentData} fill="var(--color-chart-1)" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h4 className="text-sm text-muted-foreground mb-2">Taxa de Conversão Média</h4>
            <p className="text-3xl font-bold text-foreground">31.2%</p>
            <p className="text-xs text-chart-3 mt-2">↑ 3.5% vs. período anterior</p>
          </Card>
          <Card className="p-6">
            <h4 className="text-sm text-muted-foreground mb-2">Ticket Médio</h4>
            <p className="text-3xl font-bold text-foreground">R$ 580</p>
            <p className="text-xs text-chart-3 mt-2">↑ 8.2% vs. período anterior</p>
          </Card>
          <Card className="p-6">
            <h4 className="text-sm text-muted-foreground mb-2">Tempo Médio Processo</h4>
            <p className="text-3xl font-bold text-foreground">8.5 dias</p>
            <p className="text-xs text-chart-3 mt-2">↓ 12% vs. período anterior</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
