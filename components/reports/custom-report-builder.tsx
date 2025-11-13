"use client"

import { useState } from "react"
import { Plus, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CustomReport {
  id: string
  name: string
  metrics: string[]
  filters: string[]
  format: "table" | "chart"
}

export default function CustomReportBuilder() {
  const [reports, setReports] = useState<CustomReport[]>([
    {
      id: "1",
      name: "Relatório Mensal de Processos",
      metrics: ["total_processos", "taxa_conclusao", "receita"],
      filters: ["mes_atual"],
      format: "table",
    },
    {
      id: "2",
      name: "Performance por Cliente",
      metrics: ["processos_cliente", "valor_medio", "taxa_sucesso"],
      filters: ["cliente_ativo"],
      format: "chart",
    },
  ])
  const [isCreating, setIsCreating] = useState(false)
  const [newReport, setNewReport] = useState<Partial<CustomReport>>({
    name: "",
    metrics: [],
    filters: [],
    format: "table",
  })

  const metricsOptions = [
    { value: "total_processos", label: "Total de Processos" },
    { value: "taxa_conclusao", label: "Taxa de Conclusão" },
    { value: "receita", label: "Receita" },
    { value: "despesas", label: "Despesas" },
    { value: "processos_cliente", label: "Processos por Cliente" },
    { value: "tempo_medio", label: "Tempo Médio de Conclusão" },
    { value: "taxa_sucesso", label: "Taxa de Sucesso" },
    { value: "valor_medio", label: "Valor Médio" },
  ]

  const filtersOptions = [
    { value: "mes_atual", label: "Mês Atual" },
    { value: "trimestre_atual", label: "Trimestre Atual" },
    { value: "ano_atual", label: "Ano Atual" },
    { value: "cliente_ativo", label: "Clientes Ativos" },
    { value: "processos_pendentes", label: "Processos Pendentes" },
    { value: "acima_prazo", label: "Acima do Prazo" },
  ]

  const handleAddReport = () => {
    if (newReport.name && newReport.metrics && newReport.metrics.length > 0) {
      const report: CustomReport = {
        id: Date.now().toString(),
        name: newReport.name,
        metrics: newReport.metrics,
        filters: newReport.filters || [],
        format: newReport.format || "table",
      }
      setReports([...reports, report])
      setNewReport({ name: "", metrics: [], filters: [], format: "table" })
      setIsCreating(false)
    }
  }

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Relatórios Personalizados</h2>
          <p className="text-sm text-muted-foreground mt-1">Crie e gerencie relatórios customizados</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Relatório
        </Button>
      </div>

      {isCreating && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Criar Novo Relatório</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nome do Relatório</label>
              <input
                type="text"
                value={newReport.name || ""}
                onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                placeholder="Ex: Relatório de Receita Mensal"
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Métricas</label>
              <div className="grid grid-cols-2 gap-3">
                {metricsOptions.map((metric) => (
                  <label
                    key={metric.value}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-secondary cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={newReport.metrics?.includes(metric.value) || false}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...(newReport.metrics || []), metric.value]
                          : (newReport.metrics || []).filter((m) => m !== metric.value)
                        setNewReport({ ...newReport, metrics: updated })
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">{metric.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Filtros (opcional)</label>
              <div className="grid grid-cols-2 gap-3">
                {filtersOptions.map((filter) => (
                  <label
                    key={filter.value}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-secondary cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={newReport.filters?.includes(filter.value) || false}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...(newReport.filters || []), filter.value]
                          : (newReport.filters || []).filter((f) => f !== filter.value)
                        setNewReport({ ...newReport, filters: updated })
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">{filter.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Formato</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="table"
                    checked={newReport.format === "table"}
                    onChange={(e) => setNewReport({ ...newReport, format: e.target.value as "table" | "chart" })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground">Tabela</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="chart"
                    checked={newReport.format === "chart"}
                    onChange={(e) => setNewReport({ ...newReport, format: e.target.value as "table" | "chart" })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground">Gráfico</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAddReport} className="bg-primary">
                Criar Relatório
              </Button>
              <Button
                onClick={() => {
                  setIsCreating(false)
                  setNewReport({ name: "", metrics: [], filters: [], format: "table" })
                }}
                variant="outline"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{report.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {report.metrics.length} métrica{report.metrics.length !== 1 ? "s" : ""} •{" "}
                  {report.format === "chart" ? "Gráfico" : "Tabela"}
                </p>
              </div>
              <button
                onClick={() => handleDeleteReport(report.id)}
                className="p-2 hover:bg-secondary rounded transition-colors"
              >
                <X className="w-4 h-4 text-destructive" />
              </button>
            </div>
            <div className="flex gap-2">
              <Button className="flex items-center gap-2 bg-primary text-sm">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
              <Button variant="outline" className="text-sm bg-transparent">
                Editar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
