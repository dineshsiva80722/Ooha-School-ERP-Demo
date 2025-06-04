"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "superadmin" | "admin" | "faculty" | "student"
  department?: string
  profileImage?: string
  lastLogin?: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  loading: boolean
}

interface LoginCredentials {
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database for demo purposes
const mockUsers: Record<string, User & { password: string }> = {
  "superadmin@school.edu": {
    id: "1",
    email: "superadmin@school.edu",
    password: "admin123",
    name: "System Administrator",
    role: "superadmin",
    profileImage: "/placeholder.svg?height=40&width=40",
    lastLogin: "2024-01-20T10:00:00Z",
    permissions: ["all"],
  },
  "admin@school.edu": {
    id: "2",
    email: "admin@school.edu",
    password: "admin123",
    name: "School Admin",
    role: "admin",
    department: "Administration",
    profileImage: "/placeholder.svg?height=40&width=40",
    lastLogin: "2024-01-20T09:30:00Z",
    permissions: ["student_management", "faculty_management", "reports", "fees", "communication"],
  },
  "faculty@school.edu": {
    id: "3",
    email: "faculty@school.edu",
    password: "faculty123",
    name: "Dr. Sarah Johnson",
    role: "faculty",
    department: "Mathematics",
    profileImage: "/placeholder.svg?height=40&width=40",
    lastLogin: "2024-01-20T08:45:00Z",
    permissions: ["class_management", "student_grades", "attendance", "communication"],
  },
  "student@school.edu": {
    id: "4",
    email: "student@school.edu",
    password: "student123",
    name: "John Doe",
    role: "student",
    department: "Grade 10-A",
    profileImage: "/placeholder.svg?height=40&width=40",
    lastLogin: "2024-01-20T08:00:00Z",
    permissions: ["view_grades", "view_schedule", "library_access", "communication"],
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored authentication on mount
    const checkStoredAuth = () => {
      try {
        const storedUser = localStorage.getItem("erp_user")
        const storedToken = localStorage.getItem("erp_token")

        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser)
          
          // Normalize role to lowercase
          userData.role = userData.role.toLowerCase()
          
          // Map role to consistent format
          const roleMap = {
            "super_admin": "superadmin",
            "admin": "admin",
            "faculty": "faculty",
            "student": "student"
          }
          
          userData.role = roleMap[userData.role] || userData.role
          
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Error checking stored auth:", error)
        localStorage.removeItem("erp_user")
        localStorage.removeItem("erp_token")
      } finally {
        setLoading(false)
      }
    }

    checkStoredAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true)

      // First try API login
      const apiResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (apiResponse.ok) {
        const data = await apiResponse.json()
        const userData = data.user

        // Normalize role to lowercase
        userData.role = userData.role.toLowerCase()
        
        // Map role to consistent format
        const roleMap = {
          "super_admin": "superadmin",
          "admin": "admin",
          "faculty": "faculty",
          "student": "student"
        }
        
        userData.role = roleMap[userData.role] || userData.role
        
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem("erp_user", JSON.stringify(userData))
        localStorage.setItem("erp_token", data.token || "demo-token")
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("erp_user")
    localStorage.removeItem("erp_token")

    // Also call API logout if available
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {
      // Ignore errors for demo
    })
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("erp_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
