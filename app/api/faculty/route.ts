import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = (page - 1) * limit

    const { db } = await connectToDatabase()

    const query: any = {}

    if (department && department !== "all") {
      query["professionalInfo.department"] = department
    }

    if (search) {
      query.$or = [
        { "personalInfo.firstName": { $regex: search, $options: "i" } },
        { "personalInfo.lastName": { $regex: search, $options: "i" } },
        { "personalInfo.employeeId": { $regex: search, $options: "i" } },
        { "personalInfo.email": { $regex: search, $options: "i" } },
        { "professionalInfo.department": { $regex: search, $options: "i" } },
        { "professionalInfo.position": { $regex: search, $options: "i" } },
      ]
    }

    const [faculty, total] = await Promise.all([
      db.collection("faculty").find(query).skip(skip).limit(limit).toArray(),
      db.collection("faculty").countDocuments(query),
    ])

    return NextResponse.json({
      faculty,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get faculty error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const facultyData = await request.json()

    const { db } = await connectToDatabase()

    // Check if employee ID already exists
    const existingEmployee = await db.collection("faculty").findOne({
      "personalInfo.employeeId": facultyData.personalInfo.employeeId,
    })

    if (existingEmployee) {
      return NextResponse.json({ error: "Employee ID already exists" }, { status: 400 })
    }

    // Check if email already exists
    const existingEmail = await db.collection("faculty").findOne({
      "personalInfo.email": facultyData.personalInfo.email,
    })

    if (existingEmail) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    const faculty = {
      ...facultyData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("faculty").insertOne(faculty)

    // Create user account for the faculty
    const userAccount = {
      email: facultyData.personalInfo.email,
      password: facultyData.personalInfo.employeeId, // Default password is employee ID
      name: `${facultyData.personalInfo.firstName} ${facultyData.personalInfo.lastName}`,
      role: "faculty",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection("users").insertOne(userAccount)

    return NextResponse.json({
      message: "Faculty created successfully",
      facultyId: result.insertedId,
    })
  } catch (error) {
    console.error("Create faculty error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
