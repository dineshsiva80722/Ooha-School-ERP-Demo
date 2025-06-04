import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classFilter = searchParams.get("class")
    const section = searchParams.get("section")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = (page - 1) * limit

    const { db } = await connectToDatabase()

    const query: any = {}

    if (classFilter && classFilter !== "all") {
      query["academicInfo.class"] = classFilter
    }

    if (section) {
      query["academicInfo.section"] = section
    }

    if (search) {
      query.$or = [
        { "personalInfo.firstName": { $regex: search, $options: "i" } },
        { "personalInfo.lastName": { $regex: search, $options: "i" } },
        { "academicInfo.rollNumber": { $regex: search, $options: "i" } },
        { "personalInfo.email": { $regex: search, $options: "i" } },
      ]
    }

    const [students, total] = await Promise.all([
      db.collection("students").find(query).skip(skip).limit(limit).toArray(),
      db.collection("students").countDocuments(query),
    ])

    return NextResponse.json({
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get students error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const studentData = await request.json()

    const { db } = await connectToDatabase()

    // Check if roll number already exists
    const existingStudent = await db.collection("students").findOne({
      "academicInfo.rollNumber": studentData.academicInfo.rollNumber,
    })

    if (existingStudent) {
      return NextResponse.json({ error: "Roll number already exists" }, { status: 400 })
    }

    // Check if email already exists
    const existingEmail = await db.collection("students").findOne({
      "personalInfo.email": studentData.personalInfo.email,
    })

    if (existingEmail) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    const student = {
      ...studentData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("students").insertOne(student)

    // Create user account for the student
    const userAccount = {
      email: studentData.personalInfo.email,
      password: studentData.academicInfo.rollNumber, // Default password is roll number
      name: `${studentData.personalInfo.firstName} ${studentData.personalInfo.lastName}`,
      role: "student",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection("users").insertOne(userAccount)

    return NextResponse.json({
      message: "Student created successfully",
      studentId: result.insertedId,
    })
  } catch (error) {
    console.error("Create student error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
