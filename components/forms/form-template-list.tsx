"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { MoreVertical, Download, Copy, Edit2, Eye, Trash2, FileText } from "lucide-react"

export default function FormTemplateList({ templates }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.length > 0 ? (
        templates.map((template) => (
          <Card key={template.id} className="hover:border-primary transition-colors">
            <div className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">{template.name}</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Eye className="w-4 h-4" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Copy className="w-4 h-4" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Download className="w-4 h-4" />
                      Exportar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>

              <div className="space-y-2 py-2 border-y">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Campos:</span>
                  <span className="font-semibold">{template.fields}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Usos:</span>
                  <span className="font-semibold">{template.usage}x</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Modificado:</span>
                <span>{format(new Date(template.lastModified), "dd/MM/yyyy", { locale: ptBR })}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                  <Copy className="w-4 h-4" />
                  Usar
                </Button>
                <Button size="sm" className="flex-1 gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Nenhum template encontrado</p>
        </div>
      )}
    </div>
  )
}
