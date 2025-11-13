"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function DocumentForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    process: "",
    priority: "medium",
    dueDate: "",
    notes: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Documento adicionado:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome do Documento</Label>
          <Input
            id="name"
            placeholder="Ex: RG, CNH, IPVA"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="client">Cliente</Label>
          <Input
            id="client"
            placeholder="Nome do cliente"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="process">Processo</Label>
          <Select value={formData.process} onValueChange={(value) => setFormData({ ...formData, process: value })}>
            <SelectTrigger id="process">
              <SelectValue placeholder="Selecione um processo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cnh">CNH Primeira Categoria</SelectItem>
              <SelectItem value="renew-cnh">Renovação de CNH</SelectItem>
              <SelectItem value="regularization">Regularização de Veículo</SelectItem>
              <SelectItem value="transfer">Transferência de Veículo</SelectItem>
              <SelectItem value="licensing">Licenciamento</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="priority">Prioridade</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
            <SelectTrigger id="priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Baixa</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="dueDate">Data de Vencimento</Label>
        <Input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          placeholder="Adicione observações sobre o documento..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Salvar Documento</Button>
      </div>
    </form>
  )
}
