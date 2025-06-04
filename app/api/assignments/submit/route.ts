import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const submissionData = await request.json()
    const { assignmentId, studentId, content, attachments } = submissionData

    const { db } = await connectToDatabase()

    const submission = {
      assignmentId: new ObjectId(assignmentId),
      studentId: new ObjectId(studentId),
      content,
      attachments,
      submittedAt: new Date(),
      status: "submitted"
    }

    await db.collection("submissions").insertOne(submission)

    // Update assignment with submission reference
    await db.collection("assignments").updateOne(
      { _id: new ObjectId(assignmentId) },
      { 
        $push: { 
          submissions: submission._id 
        }
      }
    )

    return NextResponse.json({ message: "Homework submitted successfully" })
  } catch (error) {
    console.error("Submit homework error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}