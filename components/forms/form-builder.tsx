"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X } from "lucide-react"

export default function FormBuilder({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    fields: [],
  })

  const [newField, setNewField] = useState({
    type: "text",
    label: "",
    required: false,
  })

  const fieldTypes = [
    { value: "text", label: "Texto" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Telefone" },
    { value: "number", label: "Número" },
    { value: "date", label: "Data" },
    { value: "select", label: "Seleção" },
    { value: "checkbox", label: "Checkbox" },
    { value: "textarea", label: "Texto Longo" },
  ]

  const handleAddField = () => {
    if (newField.label.trim()) {
      setFormData({
        ...formData,
        fields: [...formData.fields, { ...newField, id: Date.now() }],
      })
      setNewField({ type: "text", label: "", required: false })
    }
  }

  const handleRemoveField = (id) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((f) => f.id !== id),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Template criado:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome do Template</Label>
          <Input
            id="name"
            placeholder="Ex: Solicitação de CNH"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cnh">CNH</SelectItem>
              <SelectItem value="vehicles">Veículos</SelectItem>
              <SelectItem value="authorization">Autorização</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Descreva o propósito deste template..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
        />
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold">Adicionar Campos</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fieldType">Tipo de Campo</Label>
              <Select value={newField.type} onValueChange={(value) => setNewField({ ...newField, type: value })}>
                <SelectTrigger id="fieldType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((ft) => (
                    <SelectItem key={ft.value} value={ft.value}>
                      {ft.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fieldLabel">Rótulo do Campo</Label>
              <Input
                id="fieldLabel"
                placeholder="Ex: Nome Completo"
                value={newField.label}
                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button type="button" onClick={handleAddField} className="w-full gap-2 bg-transparent" variant="outline">
                <Plus className="w-4 h-4" />
                Adicionar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {formData.fields.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Campos do Formulário ({formData.fields.length})</h3>
            <div className="space-y-2">
              {formData.fields.map((field, index) => (
                <div key={field.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm">
                    <p className="font-medium">
                      {index + 1}. {field.label}
                    </p>
                    <p className="text-muted-foreground">
                      {fieldTypes.find((ft) => ft.value === field.type)?.label}
                      {field.required && " • Obrigatório"}
                    </p>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveField(field.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={!formData.name || !formData.category || formData.fields.length === 0}>
          Criar Template
        </Button>
      </div>
    </form>
  )
}
