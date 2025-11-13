"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"
import BusinessMetrics from "./business-metrics"
import AdvancedAnalytics from "./advanced-analytics"
import CustomReportBuilder from "./custom-report-builder"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const processesPerMonth = [
  { month: "Jan", processos: 15, concluidos: 12 },
  { month: "Fev", processos: 18, concluidos: 15 },
  { month: "Mar", processos: 22, concluidos: 20 },
  { month: "Abr", processos: 19, concluidos: 17 },
  { month: "Mai", processos: 25, concluidos: 23 },
  { month: "Jun", processos: 28, concluidos: 26 },
]

const processTypes = [
  { name: "Renovação CNH", value: 35, percentage: 28 },
  { name: "Transferência Veículo", value: 28, percentage: 22 },
  { name: "Licenciamento", value: 26, percentage: 21 },
  { name: "Segunda Via", value: 20, percentage: 16 },
  { name: "Outros", value: 16, percentage: 13 },
]

const revenueData = [
  { mes: "Jan", revenue: 8500, expense: 2100 },
  { mes: "Fev", revenue: 9200, expense: 2300 },
  { mes: "Mar", revenue: 10100, expense: 2500 },
  { mes: "Abr", revenue: 9800, expense: 2400 },
  { mes: "Mai", revenue: 11200, expense: 2700 },
  { mes: "Jun", revenue: 12500, expense: 3000 },
]

const clientsPerformance = [
  { name: "João Silva", processos: 8, taxa: 100 },
  { name: "Maria Santos", processos: 12, taxa: 95 },
  { name: "Pedro Costa", processos: 5, taxa: 100 },
  { name: "Ana Oliveira", processos: 3, taxa: 80 },
  { name: "Carlos Mendes", processos: 6, taxa: 90 },
]

const COLORS = ["#3563AE", "#F97316", "#22C55E", "#8B5CF6", "#EC4899"]

export default function ReportsView() {
  const [dateRange, setDateRange] = useState("mes")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios e Analytics</h1>
          <p className="text-muted-foreground mt-2">Análise completa de performance e dados</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
          <Download className="w-5 h-5" />
          Exportar Relatório
        </button>
      </div>

      {/* Tabs for better organization */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-secondary">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="custom">Customizados</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg border border-border p-6">
              <p className="text-sm text-muted-foreground mb-1">Processos Totais</p>
              <p className="text-3xl font-bold text-foreground mb-2">127</p>
              <p className="text-xs text-chart-3 font-semibold">↑ 12% vs. mês anterior</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <p className="text-sm text-muted-foreground mb-1">Taxa de Conclusão</p>
              <p className="text-3xl font-bold text-foreground mb-2">94%</p>
              <p className="text-xs text-chart-3 font-semibold">↑ 5% vs. mês anterior</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <p className="text-sm text-muted-foreground mb-1">Clientes Ativos</p>
              <p className="text-3xl font-bold text-foreground mb-2">48</p>
              <p className="text-xs text-chart-3 font-semibold">↑ 8% vs. mês anterior</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <p className="text-sm text-muted-foreground mb-1">Receita Mês</p>
              <p className="text-3xl font-bold text-foreground mb-2">R$ 12.5K</p>
              <p className="text-xs text-chart-3 font-semibold">↑ 18% vs. mês anterior</p>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Processes per Month */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Processos por Mês</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={processesPerMonth}>
                  <defs>
                    <linearGradient id="colorProcessos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: `1px solid var(--color-border)`,
                      borderRadius: "0.5rem",
                      color: "var(--color-foreground)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="processos"
                    stroke="var(--color-chart-1)"
                    fillOpacity={1}
                    fill="url(#colorProcessos)"
                  />
                  <Area
                    type="monotone"
                    dataKey="concluidos"
                    stroke="var(--color-chart-3)"
                    fillOpacity={0.3}
                    fill="var(--color-chart-3)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Process Types */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Distribuição por Tipo</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={processTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {processTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: `1px solid var(--color-border)`,
                      borderRadius: "0.5rem",
                      color: "var(--color-foreground)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Receita vs Despesas</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" />
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
                <Bar dataKey="revenue" fill="var(--color-chart-3)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expense" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Table */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Performance por Cliente</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Cliente</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Processos</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Taxa de Sucesso</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {clientsPerformance.map((client, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 text-foreground font-medium">{client.name}</td>
                      <td className="px-4 py-3 text-center text-foreground">{client.processos}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-chart-3 rounded-full" style={{ width: `${client.taxa}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-foreground">{client.taxa}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            client.taxa >= 95 ? "bg-chart-3/10 text-chart-3" : "bg-accent/10 text-accent"
                          }`}
                        >
                          {client.taxa >= 95 ? "Excelente" : "Bom"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics">
          <BusinessMetrics />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <AdvancedAnalytics />
        </TabsContent>

        {/* Custom Reports Tab */}
        <TabsContent value="custom">
          <CustomReportBuilder />
        </TabsContent>
      </Tabs>
    </div>
  )
}
