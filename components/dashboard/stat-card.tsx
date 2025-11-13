import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  trend: string
  trendDirection: "up" | "down" | "neutral"
}

export default function StatCard({ icon: Icon, label, value, trend, trendDirection }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {trendDirection === "up" && <TrendingUp className="w-4 h-4 text-chart-3" />}
        {trendDirection === "down" && <TrendingDown className="w-4 h-4 text-destructive" />}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      <p className="text-xs text-muted-foreground mt-2">{trend}</p>
    </div>
  )
}
