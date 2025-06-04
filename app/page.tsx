"use client"

import { LoginForm } from "@/components/auth/login-form"
import { SuperAdminDashboard } from "@/components/dashboards/super-admin-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { FacultyDashboard } from "@/components/dashboards/faculty-dashboard"
import { StudentDashboard } from "@/components/dashboards/student-dashboard"
import { AuthProvider, useAuth } from "@/components/auth/auth-context"
import { Loader2 } from "lucide-react"

function AppContent() {
  const { user, isAuthenticated, loading } = useAuth()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated || !user) {
    return <LoginForm />
  }

  // Normalize role to lowercase
  const normalizedRole = user.role.toLowerCase()

  // Map role to consistent format
  const roleMap = {
    "super_admin": "superadmin",
    "admin": "admin",
    "faculty": "faculty",
    "student": "student"
  }

  // Get the correct role
  const role = roleMap[normalizedRole] || normalizedRole

  // Render appropriate dashboard based on user role
  switch (role) {
    case "superadmin":
      return <SuperAdminDashboard />
    case "admin":
      return <AdminDashboard />
    case "faculty":
      return <FacultyDashboard />
    case "student":
      return <StudentDashboard />
    default:
      console.error("Unknown user role:", role)
      return <LoginForm />
  }
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
