import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classFilter = searchParams.get("class")
    const subject = searchParams.get("subject")
    const facultyId = searchParams.get("facultyId")

    const { db } = await connectToDatabase()

    const query: any = {}

    if (classFilter && classFilter !== "all") {
      query.class = classFilter
    }

    if (subject) {
      query.subject = subject
    }

    if (facultyId) {
      query.facultyId = new ObjectId(facultyId)
    }

    const assignments = await db.collection("assignments").find(query).toArray()

    return NextResponse.json({ assignments })
  } catch (error) {
    console.error("Get assignments error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const assignmentData = await request.json()

    const { db } = await connectToDatabase()

    const assignment = {
      ...assignmentData,
      facultyId: new ObjectId(assignmentData.facultyId),
      submissions: [],
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("assignments").insertOne(assignment)

    return NextResponse.json({
      message: "Assignment created successfully",
      assignmentId: result.insertedId,
    })
  } catch (error) {
    console.error("Create assignment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
