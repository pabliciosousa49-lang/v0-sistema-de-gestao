"use client"

import type React from "react"
import { createContext, useCallback, useEffect, useState } from "react"

export interface User {
  name?: string
  phone: string
  verified?: boolean
  timestamp: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (phone: string, password: string) => Promise<void>
  signup: (name: string, phone: string, password: string) => Promise<void>
  verifyOtp: (otp: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
          setIsAuthenticated(true)
        } catch (err) {
          console.error("Failed to parse user from localStorage:", err)
          localStorage.removeItem("user")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = useCallback(async (phone: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const userData: User = {
        phone,
        timestamp: new Date().toISOString(),
      }

      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (err) {
      console.error("Login error:", err)
      throw new Error("Failed to login")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = useCallback(async (name: string, phone: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulating API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store temp data for OTP verification
      sessionStorage.setItem("tempUser", JSON.stringify({ name, phone, password }))
    } catch (err) {
      console.error("Signup error:", err)
      throw new Error("Failed to signup")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const verifyOtp = useCallback(async (otp: string) => {
    setIsLoading(true)
    try {
      // Simulating API OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const tempUser = JSON.parse(sessionStorage.getItem("tempUser") || "{}")

      const userData: User = {
        name: tempUser.name,
        phone: tempUser.phone,
        verified: true,
        timestamp: new Date().toISOString(),
      }

      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userData))
      sessionStorage.removeItem("tempUser")
    } catch (err) {
      console.error("OTP verification error:", err)
      throw new Error("Failed to verify OTP")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    sessionStorage.removeItem("tempUser")
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    verifyOtp,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
