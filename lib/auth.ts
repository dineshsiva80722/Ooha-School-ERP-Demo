import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "./mongodb"

const JWT_SECRET = process.env.JWT_SECRET!

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    return null
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    const { db } = await connectToDatabase()

    const user = await db.collection("users").findOne({ email })

    if (!user) {
      return { success: false, message: "User not found" }
    }

    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) {
      return { success: false, message: "Invalid password" }
    }

    // Update last login
    await db.collection("users").updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } })

    const authUser: AuthUser = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    }

    const token = generateToken(authUser)

    return {
      success: true,
      user: authUser,
      token,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return { success: false, message: "Authentication failed" }
  }
}

export async function createDefaultUsers() {
  try {
    const { db } = await connectToDatabase()

    // Check if users already exist
    const existingUsers = await db.collection("users").countDocuments()

    if (existingUsers > 0) {
      return { message: "Users already exist" }
    }

    const securePassword = await hashPassword("Admin@123") // More secure password

    const defaultUsers = [
      {
        email: "superadmin@school.edu",
        password: securePassword,
        name: "Super Administrator",
        role: "superadmin",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "admin@school.edu",
        password: securePassword,
        name: "School Administrator",
        role: "admin",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "faculty@school.edu",
        password: securePassword,
        name: "Dr. Sarah Johnson",
        role: "faculty",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "student@school.edu",
        password: securePassword,
        name: "John Doe",
        role: "student",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("users").insertMany(defaultUsers)

    return { message: "Default users created successfully" }
  } catch (error) {
    console.error("Error creating default users:", error)
    throw error
  }
}
