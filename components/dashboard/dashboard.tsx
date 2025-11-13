"use client"

import { FileText, Users, Clock, TrendingUp } from "lucide-react"
import StatCard from "./stat-card"
import RecentProcesses from "./recent-processes"
import UpcomingSchedules from "./upcoming-schedules"
import PerformanceChart from "./performance-chart"
import CriticalAlerts from "./critical-alerts"
import FloatingActions from "./floating-actions"

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 pb-32">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Bem-vindo ao seu sistema de gestão DETRAN</p>
      </div>

      <CriticalAlerts />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Clientes Ativos" value="48" trend="+12% este mês" trendDirection="up" />
        <StatCard
          icon={FileText}
          label="Processos em Andamento"
          value="23"
          trend="-5% este mês"
          trendDirection="down"
        />
        <StatCard icon={Clock} label="Agendamentos Hoje" value="8" trend="4 confirmados" trendDirection="neutral" />
        <StatCard icon={TrendingUp} label="Receita do Mês" value="R$ 8.450" trend="+18% este mês" trendDirection="up" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Processes and Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <RecentProcesses />
          <PerformanceChart />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <UpcomingSchedules />
        </div>
      </div>

      <FloatingActions />
    </div>
  )
}
