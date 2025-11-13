"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronRight, User, Lock, Bell, FileCheck } from "lucide-react"
import { Card } from "@/components/ui/card"

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 1,
      title: "Perfil de Usuário",
      description: "Configure suas informações pessoais e preferências",
      icon: <User className="w-6 h-6" />,
      completed: false,
    },
    {
      id: 2,
      title: "Segurança",
      description: "Configure sua senha e autenticação em 2 etapas",
      icon: <Lock className="w-6 h-6" />,
      completed: false,
    },
    {
      id: 3,
      title: "Notificações",
      description: "Configure suas preferências de notificação",
      icon: <Bell className="w-6 h-6" />,
      completed: false,
    },
    {
      id: 4,
      title: "Documentos",
      description: "Envie documentos necessários para verificação",
      icon: <FileCheck className="w-6 h-6" />,
      completed: false,
    },
  ])

  const completeStep = () => {
    const newSteps = [...steps]
    newSteps[currentStep].completed = true
    setSteps(newSteps)
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const skipStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const progressPercentage = (steps.filter((s) => s.completed).length / steps.length) * 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Bem-vindo ao Sistema!</h2>
        <p className="text-muted-foreground">Complete o setup inicial para começar a usar a plataforma</p>
      </div>

      {/* Progress Bar */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Progresso</p>
          <p className="text-sm font-medium text-foreground">{Math.round(progressPercentage)}%</p>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-chart-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </Card>

      {/* Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            onClick={() => setCurrentStep(idx)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              currentStep === idx
                ? "border-primary bg-primary/5"
                : step.completed
                  ? "border-chart-3 bg-chart-3/5"
                  : "border-border hover:border-primary/50"
            }`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full mb-3 ${
                step.completed
                  ? "bg-chart-3 text-white"
                  : currentStep === idx
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground"
              }`}
            >
              {step.completed ? <Check className="w-5 h-5" /> : step.icon}
            </div>
            <p className="font-medium text-sm text-foreground">{step.title}</p>
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      <Card className="p-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
              {steps[currentStep].icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{steps[currentStep].title}</h3>
              <p className="text-muted-foreground">{steps[currentStep].description}</p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6 mb-8">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nome Completo</label>
                <input
                  type="text"
                  placeholder="João Silva"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
                <input
                  type="email"
                  placeholder="joao@empresa.com"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Telefone</label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Autenticação em 2 Etapas:</span> Recomendamos ativar 2FA para proteger
                  sua conta
                </p>
              </div>
              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm font-medium text-foreground">Ativar autenticação 2FA</span>
              </label>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm font-medium text-foreground">Notificações por e-mail</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm font-medium text-foreground">Notificações no sistema</span>
              </label>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg border border-border text-center">
                <p className="text-sm text-muted-foreground">Arraste arquivos aqui ou clique para selecionar</p>
              </div>
              <p className="text-xs text-muted-foreground">Formatos aceitos: PDF, JPG, PNG (máx. 10MB)</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={completeStep}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </button>
          {currentStep < steps.length - 1 && (
            <button
              onClick={skipStep}
              className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
            >
              Pular
            </button>
          )}
          {currentStep === steps.length - 1 && steps[currentStep].completed && (
            <button className="px-6 py-3 bg-chart-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
              Concluir Setup
            </button>
          )}
        </div>
      </Card>
    </div>
  )
}
