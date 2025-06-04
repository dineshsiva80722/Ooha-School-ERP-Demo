import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const submissionData = await request.json()
    const { db } = await connectToDatabase()

    const submission = {
      studentId: new ObjectId(submissionData.studentId),
      submissionDate: new Date(),
      content: submissionData.content,
      attachments: submissionData.attachments || [],
      status: "submitted",
    }

    const result = await db.collection("assignments").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $push: { submissions: submission },
        $set: { updatedAt: new Date() },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Assignment submitted successfully" })
  } catch (error) {
    console.error("Submit assignment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
