"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/useAuth"

interface SignupFormProps {
  onSwitchToLogin: () => void
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [step, setStep] = useState<"register" | "verify">("register")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { signup, verifyOtp } = useAuth()
  const router = useRouter()

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/)
    if (!match) return value
    const [, area, first, second] = match
    if (!area) return ""
    if (!first) return `(${area}`
    if (!second) return `(${area}) ${first}`
    return `(${area}) ${first}-${second}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
    setOtp(value)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const cleaned = phone.replace(/\D/g, "")

      if (!name.trim()) {
        setError("Nome é obrigatório")
        setIsLoading(false)
        return
      }

      if (cleaned.length !== 11) {
        setError("Telefone inválido. Use 11 dígitos.")
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        setError("Senha deve ter no mínimo 6 caracteres")
        setIsLoading(false)
        return
      }

      if (password !== confirmPassword) {
        setError("As senhas não coincidem")
        setIsLoading(false)
        return
      }

      await signup(name, cleaned, password)

      setSuccess("Código SMS enviado! Verifique suas mensagens.")

      setTimeout(() => {
        setStep("verify")
        setSuccess("")
      }, 2000)
    } catch (err) {
      setError("Erro ao enviar código. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      if (otp.length !== 6) {
        setError("Código deve ter 6 dígitos")
        setIsLoading(false)
        return
      }

      await verifyOtp(otp)

      setSuccess("Cadastro realizado com sucesso!")

      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (err) {
      setError("Código inválido. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (step === "verify") {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Verificar Telefone</CardTitle>
          <CardDescription>Insira o código recebido por SMS</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground text-center">
              Código enviado para <strong className="text-foreground">(XX) 9XXXX-4321</strong>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Código de Verificação</label>
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={handleOtpChange}
                disabled={isLoading}
                maxLength={6}
                className="h-10 text-center text-2xl tracking-widest font-mono"
              />
            </div>

            <Button type="submit" className="w-full h-10 bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Verificar Código"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full h-10"
              onClick={() => setStep("register")}
              disabled={isLoading}
            >
              Voltar
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>Preencha seus dados para cadastrar-se</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nome Completo</label>
            <Input
              type="text"
              placeholder="João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Telefone</label>
            <Input
              type="tel"
              placeholder="(11) 98765-4321"
              value={phone}
              onChange={handlePhoneChange}
              disabled={isLoading}
              className="h-10"
            />
            <p className="text-xs text-muted-foreground">Número com DDD</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Senha</label>
            <Input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Confirmar Senha</label>
            <Input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className="h-10"
            />
          </div>

          <Button type="submit" className="w-full h-10 bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando código...
              </>
            ) : (
              "Continuar"
            )}
          </Button>

          <Button type="button" variant="ghost" className="w-full h-10" onClick={onSwitchToLogin} disabled={isLoading}>
            Já tem conta? Fazer login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
