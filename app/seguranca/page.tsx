"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Activity, Users } from "lucide-react"
import Sidebar from "@/components/layout/sidebar"
import TopBar from "@/components/layout/top-bar"
import SecurityDashboard from "@/components/security/security-dashboard"
import AuditLogs from "@/components/security/audit-logs"
import OnboardingWizard from "@/components/security/onboarding-wizard"

export default function SegurancaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Segurança e Conformidade</h1>
                <p className="text-muted-foreground mb-6">Gerencie segurança, logs e onboarding do sistema</p>
              </div>

              <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-secondary">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Segurança</span>
                </TabsTrigger>
                <TabsTrigger value="logs" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Logs</span>
                </TabsTrigger>
                <TabsTrigger value="onboarding" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Onboarding</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-8">
                <TabsContent value="dashboard">
                  <SecurityDashboard />
                </TabsContent>
                <TabsContent value="logs">
                  <AuditLogs />
                </TabsContent>
                <TabsContent value="onboarding">
                  <OnboardingWizard />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
