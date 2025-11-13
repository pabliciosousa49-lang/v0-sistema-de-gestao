"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeadlinesList from "./deadlines-list"
import DeadlineCalendar from "./deadlines-calendar"
import AlertsTimeline from "./alerts-timeline"
import { AlertTriangle, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

export default function DeadlinesDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const deadlines = [
    {
      id: 1,
      name: "Documentos João Silva",
      type: "document",
      dueDate: "2025-01-10",
      status: "overdue",
      priority: "high",
      client: "João Silva",
      daysDue: -2,
    },
    {
      id: 2,
      name: "Protocolo CNH Maria",
      type: "protocol",
      dueDate: "2025-01-12",
      status: "urgent",
      priority: "high",
      client: "Maria Santos",
      daysDue: 4,
    },
    {
      id: 3,
      name: "Agendamento Pedro",
      type: "appointment",
      dueDate: "2025-01-14",
      status: "upcoming",
      priority: "medium",
      client: "Pedro Costa",
      daysDue: 6,
    },
    {
      id: 4,
      name: "Documentação Ana",
      type: "document",
      dueDate: "2025-01-11",
      status: "urgent",
      priority: "high",
      client: "Ana Oliveira",
      daysDue: 3,
    },
    {
      id: 5,
      name: "Protocolo Carlos",
      type: "protocol",
      dueDate: "2025-01-20",
      status: "upcoming",
      priority: "low",
      client: "Carlos Mendes",
      daysDue: 12,
    },
    {
      id: 6,
      name: "Transferência Lucia",
      type: "process",
      dueDate: "2025-01-13",
      status: "upcoming",
      priority: "medium",
      client: "Lucia Costa",
      daysDue: 5,
    },
  ]

  const overdueCt = deadlines.filter((d) => d.status === "overdue").length
  const urgentCount = deadlines.filter((d) => d.status === "urgent").length
  const upcomingCount = deadlines.filter((d) => d.status === "upcoming").length

  const chartData = [
    { day: "Seg", overdue: 2, urgent: 3, upcoming: 1 },
    { day: "Ter", overdue: 1, urgent: 2, upcoming: 2 },
    { day: "Qua", overdue: 3, urgent: 1, upcoming: 3 },
    { day: "Qui", overdue: 2, urgent: 2, upcoming: 2 },
    { day: "Sex", overdue: 1, urgent: 1, upcoming: 4 },
    { day: "Sab", overdue: 0, urgent: 0, upcoming: 1 },
    { day: "Dom", overdue: 0, urgent: 0, upcoming: 0 },
  ]

  const trendData = [
    { week: "Sem 1", total: 12, resolved: 8 },
    { week: "Sem 2", total: 15, resolved: 10 },
    { week: "Sem 3", total: 18, resolved: 12 },
    { week: "Sem 4", total: 16, resolved: 13 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard de Prazos</h1>
          <p className="text-muted-foreground mt-1">Acompanhe todos os prazos e alertas do sistema</p>
        </div>
        <Button className="gap-2">
          <AlertCircle className="w-4 h-4" />
          Gerar Relatório de Prazos
        </Button>
      </div>

      {overdueCt > 0 && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            Atenção! Você tem <strong>{overdueCt} prazo(s) vencido(s)</strong> que precisam de atendimento imediato
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">Vencidos</span>
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <p className="text-4xl font-bold text-destructive mt-2">{overdueCt}</p>
              <p className="text-xs text-muted-foreground mt-1">Requerem ação urgente</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">Urgentes</span>
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <p className="text-4xl font-bold text-accent mt-2">{urgentCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Próximos 3 dias</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">Próximos</span>
                <AlertCircle className="w-4 h-4 text-primary" />
              </div>
              <p className="text-4xl font-bold text-primary mt-2">{upcomingCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Nos próximos 30 dias</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">Total</span>
                <CheckCircle2 className="w-4 h-4 text-chart-3" />
              </div>
              <p className="text-4xl font-bold text-chart-3 mt-2">{deadlines.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Todos os prazos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Prazos por Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="overdue" stackId="a" fill="#ef4444" name="Vencidos" />
                <Bar dataKey="urgent" stackId="a" fill="#f59e0b" name="Urgentes" />
                <Bar dataKey="upcoming" stackId="a" fill="#3b82f6" name="Próximos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendência de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total de Prazos" />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" name="Resolvidos" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visualizações</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Listagem</TabsTrigger>
              <TabsTrigger value="calendar">Calendário</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <DeadlinesList deadlines={deadlines} />
            </TabsContent>

            <TabsContent value="calendar" className="mt-4">
              <DeadlineCalendar deadlines={deadlines} />
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <AlertsTimeline deadlines={deadlines} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
