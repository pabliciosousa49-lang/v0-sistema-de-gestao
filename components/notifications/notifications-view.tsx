"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotificationList from "./notification-list"
import AlertsConfig from "./alerts-config"
import { Bell, Settings, AlertCircle, CheckCircle2, Clock } from "lucide-react"

export default function NotificationsView() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "document-due",
      title: "Documento vencendo",
      message: "RG de João Silva vence em 3 dias",
      client: "João Silva",
      date: new Date(Date.now() - 2 * 60000),
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "protocol-update",
      title: "Protocolo atualizado",
      message: "Seu protocolo no DETRAN foi aprovado",
      client: "Maria Santos",
      date: new Date(Date.now() - 15 * 60000),
      read: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "appointment-reminder",
      title: "Lembrete de agendamento",
      message: "Você tem um agendamento com Pedro Costa em 2 horas",
      client: "Pedro Costa",
      date: new Date(Date.now() - 30 * 60000),
      read: false,
      priority: "high",
    },
    {
      id: 4,
      type: "process-completed",
      title: "Processo concluído",
      message: "Processo de CNH de Ana Oliveira foi finalizado",
      client: "Ana Oliveira",
      date: new Date(Date.now() - 2 * 3600000),
      read: true,
      priority: "low",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "document-due":
        return <AlertCircle className="w-4 h-4" />
      case "protocol-update":
        return <CheckCircle2 className="w-4 h-4" />
      case "appointment-reminder":
        return <Clock className="w-4 h-4" />
      case "process-completed":
        return <CheckCircle2 className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notificações e Alertas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie notificações {unreadCount > 0 && `(${unreadCount} não lidas)`}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline">
            Marcar Todas como Lidas
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{unreadCount}</p>
              <p className="text-sm text-muted-foreground mt-1">Não Lidas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">
                {notifications.filter((n) => n.priority === "high").length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Urgentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-chart-3">{notifications.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Centro de Notificações
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configurar Alertas
              </TabsTrigger>
            </TabsList>
            <TabsContent value="notifications" className="mt-4">
              <NotificationList
                notifications={notifications}
                getIcon={getNotificationIcon}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDeleteNotification}
              />
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <AlertsConfig />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
