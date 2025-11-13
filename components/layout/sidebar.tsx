"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  BarChart3,
  CreditCard,
  Settings,
  ChevronRight,
  AlertCircle,
  Clock,
  FileCheck,
  Bell,
  Shield,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Clientes", href: "/clientes" },
  { icon: FileText, label: "Processos", href: "/processos" },
  { icon: FileCheck, label: "Documentos", href: "/documentos" },
  { icon: Calendar, label: "Agendamentos", href: "/agendamentos" },
  { icon: Clock, label: "Protocolos", href: "/protocolos" },
  { icon: AlertCircle, label: "Prazos", href: "/prazos" },
  { icon: Bell, label: "Notificações", href: "/notificacoes" },
  { icon: FileText, label: "Templates", href: "/formularios" },
  { icon: BarChart3, label: "Relatórios", href: "/relatorios" },
  { icon: CreditCard, label: "Faturamento", href: "/faturamento" },
  { icon: Settings, label: "Configurações", href: "/configuracoes" },
  { icon: Shield, label: "Segurança", href: "/seguranca" },
]

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-center h-16">
        <div className={`flex items-center gap-2 ${!isOpen && "hidden"}`}>
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">DG</span>
          </div>
          <span className="font-bold text-sidebar-foreground truncate">Gestão DETRAN</span>
        </div>
        {!isOpen && (
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">DG</span>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  title={!isOpen ? item.label : ""}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`text-sm font-medium ${!isOpen && "hidden"}`}>{item.label}</span>
                  {isActive && isOpen && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-accent rounded-full flex-shrink-0" />
          <div className={!isOpen ? "hidden" : ""}>
            <p className="text-sm font-medium text-sidebar-foreground">Usuário</p>
            <p className="text-xs text-sidebar-foreground/70">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
