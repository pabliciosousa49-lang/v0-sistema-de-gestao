"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ProtocolForm({ onClose }) {
  const [formData, setFormData] = useState({
    protocolNumber: "",
    client: "",
    process: "",
    organ: "",
    submittedDate: "",
    expectedDate: "",
    description: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Protocolo adicionado:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="protocolNumber">Número do Protocolo</Label>
          <Input
            id="protocolNumber"
            placeholder="Ex: DETRAN-2025-001234"
            value={formData.protocolNumber}
            onChange={(e) => setFormData({ ...formData, protocolNumber: e.target.value })}
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
          <Label htmlFor="organ">Órgão</Label>
          <Select value={formData.organ} onValueChange={(value) => setFormData({ ...formData, organ: value })}>
            <SelectTrigger id="organ">
              <SelectValue placeholder="Selecione o órgão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="detran-brasilia">DETRAN - Brasília</SelectItem>
              <SelectItem value="detran-sp">DETRAN - São Paulo</SelectItem>
              <SelectItem value="detran-rj">DETRAN - Rio de Janeiro</SelectItem>
              <SelectItem value="detran-mg">DETRAN - Minas Gerais</SelectItem>
              <SelectItem value="detran-rs">DETRAN - Rio Grande do Sul</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="submittedDate">Data de Envio</Label>
          <Input
            id="submittedDate"
            type="date"
            value={formData.submittedDate}
            onChange={(e) => setFormData({ ...formData, submittedDate: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="expectedDate">Data Prevista</Label>
          <Input
            id="expectedDate"
            type="date"
            value={formData.expectedDate}
            onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Descreva o protocolo e seus detalhes..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Salvar Protocolo</Button>
      </div>
    </form>
  )
}
