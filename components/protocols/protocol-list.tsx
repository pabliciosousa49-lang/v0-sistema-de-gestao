"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { MoreVertical, Search } from "lucide-react"

export default function ProtocolList({ protocols, getStatusColor, getStatusLabel, onSelectProtocol }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProtocols = protocols.filter(
    (p) =>
      p.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.process.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar protocolo, cliente ou processo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Protocolo</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Processo</TableHead>
              <TableHead>Órgão</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Prevista</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProtocols.length > 0 ? (
              filteredProtocols.map((protocol) => (
                <TableRow key={protocol.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono font-semibold text-sm">{protocol.number}</TableCell>
                  <TableCell>{protocol.client}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{protocol.process}</TableCell>
                  <TableCell className="text-sm">{protocol.organ}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{getStatusLabel(protocol.status)}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(protocol.expectedDate), "dd 'de' MMMM", { locale: ptBR })}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onSelectProtocol(protocol.id)}>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Atualizar Status</DropdownMenuItem>
                        <DropdownMenuItem>Gerar Relatório</DropdownMenuItem>
                        <DropdownMenuItem>Enviar para Cliente</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancelar Protocolo</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Nenhum protocolo encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
