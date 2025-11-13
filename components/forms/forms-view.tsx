"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormTemplateList from "./form-template-list"
import FormBuilder from "./form-builder"
import { FileText, Plus } from "lucide-react"

export default function FormsView() {
  const [activeTab, setActiveTab] = useState("templates")
  const [showBuilder, setShowBuilder] = useState(false)

  const templates = [
    {
      id: 1,
      name: "Solicitação de CNH",
      category: "CNH",
      description: "Formulário padrão para requisição de CNH primeira categoria",
      fields: 12,
      lastModified: "2025-01-08",
      usage: 45,
    },
    {
      id: 2,
      name: "Renovação de CNH",
      category: "CNH",
      description: "Formulário para renovação de CNH vencida",
      fields: 8,
      lastModified: "2025-01-07",
      usage: 32,
    },
    {
      id: 3,
      name: "Regularização de Veículo",
      category: "Veículos",
      description: "Formulário para regularização de documentação veicular",
      fields: 15,
      lastModified: "2025-01-06",
      usage: 28,
    },
    {
      id: 4,
      name: "Transferência de Veículo",
      category: "Veículos",
      description: "Formulário para transferência de propriedade veicular",
      fields: 18,
      lastModified: "2025-01-05",
      usage: 38,
    },
    {
      id: 5,
      name: "Licenciamento",
      category: "Veículos",
      description: "Formulário para licenciamento anual de veículo",
      fields: 10,
      lastModified: "2025-01-04",
      usage: 55,
    },
    {
      id: 6,
      name: "Autorização de Terceiro",
      category: "Autorização",
      description: "Formulário de autorização para terceiros",
      fields: 7,
      lastModified: "2025-01-03",
      usage: 22,
    },
  ]

  const categories = ["CNH", "Veículos", "Autorização"]
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredTemplates = selectedCategory ? templates.filter((t) => t.category === selectedCategory) : templates

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Templates de Formulários</h1>
          <p className="text-muted-foreground mt-1">Gerencie formulários padrões para automação de processos</p>
        </div>
        <Button onClick={() => setShowBuilder(!showBuilder)} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Template
        </Button>
      </div>

      {showBuilder && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Criar Novo Template</CardTitle>
          </CardHeader>
          <CardContent>
            <FormBuilder onClose={() => setShowBuilder(false)} />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{templates.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Templates Ativos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">{templates.reduce((sum, t) => sum + t.usage, 0)}</p>
              <p className="text-sm text-muted-foreground mt-1">Usos Este Mês</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-chart-3">{categories.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Categorias</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Templates Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="templates">Meus Templates</TabsTrigger>
              <TabsTrigger value="categories">Por Categoria</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="mt-4">
              <FormTemplateList templates={templates} />
            </TabsContent>

            <TabsContent value="categories" className="mt-4 space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                    size="sm"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <FormTemplateList templates={filteredTemplates} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
