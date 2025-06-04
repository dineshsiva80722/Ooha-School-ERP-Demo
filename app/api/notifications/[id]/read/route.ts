import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await request.json()
    const { db } = await connectToDatabase()

    const result = await db.collection("notifications").updateOne(
      {
        _id: new ObjectId(params.id),
        "recipients.userId": new ObjectId(userId),
      },
      {
        $set: {
          "recipients.$.read": true,
          "recipients.$.readAt": new Date(),
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Notification marked as read" })
  } catch (error) {
    console.error("Mark notification as read error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
