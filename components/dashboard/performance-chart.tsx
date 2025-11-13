"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Seg", processos: 12, concluídos: 10 },
  { name: "Ter", processos: 19, concluídos: 15 },
  { name: "Qua", processos: 15, concluídos: 12 },
  { name: "Qui", processos: 21, concluídos: 18 },
  { name: "Sex", processos: 18, concluídos: 16 },
  { name: "Sáb", processos: 8, concluídos: 7 },
]

export default function PerformanceChart() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Desempenho da Semana</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: `1px solid var(--color-border)`,
              borderRadius: "0.5rem",
              color: "var(--color-foreground)",
            }}
          />
          <Legend />
          <Bar dataKey="processos" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="concluídos" fill="var(--color-chart-3)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
