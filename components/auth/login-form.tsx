"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "./auth-context"
import { GraduationCap, Loader2, Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(credentials)
      if (!success) {
        setError("Invalid email or password")
      }
      // No need to manually redirect - the auth context will trigger a re-render
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const demoCredentials = [
    { role: "SuperAdmin", email: "superadmin@school.edu", password: "admin123" },
    { role: "Admin", email: "admin@school.edu", password: "admin123" },
    { role: "Faculty", email: "faculty@school.edu", password: "faculty123" },
    { role: "Student", email: "student@school.edu", password: "student123" },
  ]

  const handleDemoLogin = async (email: string, password: string) => {
    setCredentials({ email, password })
    setIsLoading(true)
    setError("")

    try {
      const success = await login({ email, password })
      if (!success) {
        setError("Demo login failed")
      }
    } catch (err) {
      setError("Demo login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const setupDemoData = async () => {
    try {
      const response = await fetch("/api/setup", { method: "POST" })
      const data = await response.json()
      alert(data.message || "Demo data setup completed!")
    } catch (error) {
      alert("Setup failed. Using local demo data.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <img src="https://res.cloudinary.com/do7dw5dwq/image/upload/v1748500394/7629ecf5-3fe2-4ed4-88c5-60ecf092ff11.png" alt="Logo" className="w-full h- full text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EduManage Pro</h1>
          </div>
          <p className="text-gray-600">Comprehensive School Management System</p>
        </div>

        <Tabs defaultValue="login" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access the system</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo">
            <Card>
              <CardHeader>
                <CardTitle>Demo Accounts</CardTitle>
                <CardDescription>Try different user roles with these demo accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {demoCredentials.map((demo, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{demo.role}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDemoLogin(demo.email, demo.password)}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Use Account"}
                      </Button>
                    </div>
                    <div className="text-xs text-gray-600">
                      <div>Email: {demo.email}</div>
                      <div>Password: {demo.password}</div>
                    </div>
                  </div>
                ))}

                <div className="pt-3 border-t">
                  <Button variant="secondary" size="sm" className="w-full" onClick={setupDemoData} disabled={isLoading}>
                    Setup Demo Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-500">Secure access with role-based permissions</div>
      </div>
    </div>
  )
}
