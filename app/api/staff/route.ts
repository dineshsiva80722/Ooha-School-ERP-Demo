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
      query["employmentInfo.department"] = department
    }

    if (search) {
      query.$or = [
        { "personalInfo.firstName": { $regex: search, $options: "i" } },
        { "personalInfo.lastName": { $regex: search, $options: "i" } },
        { "personalInfo.employeeId": { $regex: search, $options: "i" } },
        { "personalInfo.email": { $regex: search, $options: "i" } },
        { "employmentInfo.department": { $regex: search, $options: "i" } },
        { "employmentInfo.position": { $regex: search, $options: "i" } },
      ]
    }

    const [staff, total] = await Promise.all([
      db.collection("staff").find(query).skip(skip).limit(limit).toArray(),
      db.collection("staff").countDocuments(query),
    ])

    return NextResponse.json({
      staff,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get staff error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const staffData = await request.json()

    const { db } = await connectToDatabase()

    // Check if employee ID already exists
    const existingEmployee = await db.collection("staff").findOne({
      "personalInfo.employeeId": staffData.personalInfo.employeeId,
    })

    if (existingEmployee) {
      return NextResponse.json({ error: "Employee ID already exists" }, { status: 400 })
    }

    const staff = {
      ...staffData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("staff").insertOne(staff)

    // Create user account for the staff
    const userAccount = {
      email: staffData.personalInfo.email,
      password: staffData.personalInfo.employeeId,
      name: `${staffData.personalInfo.firstName} ${staffData.personalInfo.lastName}`,
      role: "staff",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection("users").insertOne(userAccount)

    return NextResponse.json({
      message: "Staff created successfully",
      staffId: result.insertedId,
    })
  } catch (error) {
    console.error("Create staff error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
