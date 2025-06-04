import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid student ID" }, { status: 400 })
    }

    const student = await db.collection("students").findOne({
      _id: new ObjectId(params.id),
    })

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ student })
  } catch (error) {
    console.error("Get student error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updateData = await request.json()

    const { db } = await connectToDatabase()

    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Student updated successfully" })
  } catch (error) {
    console.error("Update student error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid student ID" }, { status: 400 })
    }

    // Get student data before deletion to remove user account
    const student = await db.collection("students").findOne({
      _id: new ObjectId(params.id),
    })

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    // Delete student record
    const result = await db.collection("students").deleteOne({
      _id: new ObjectId(params.id),
    })

    // Delete associated user account
    if (student.personalInfo?.email) {
      await db.collection("users").deleteOne({
        email: student.personalInfo.email,
      })
    }

    // Delete related records (attendance, assignments, etc.)
    await Promise.all([
      db.collection("attendance").deleteMany({ "students.studentId": new ObjectId(params.id) }),
      db.collection("assignments").updateMany({}, { $pull: { submissions: { studentId: new ObjectId(params.id) } } }),
      db.collection("grades").deleteMany({ studentId: new ObjectId(params.id) }),
      db.collection("leave_requests").deleteMany({
        userId: new ObjectId(params.id),
        userType: "student",
      }),
    ])

    return NextResponse.json({ message: "Student deleted successfully" })
  } catch (error) {
    console.error("Delete student error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
