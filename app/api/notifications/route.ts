import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const userType = searchParams.get("userType")
    const unreadOnly = searchParams.get("unreadOnly") === "true"

    const { db } = await connectToDatabase()

    const query: any = {}

    if (userId && userType) {
      query.recipients = {
        $elemMatch: {
          userId: new ObjectId(userId),
          userType: userType,
        },
      }

      if (unreadOnly) {
        query["recipients.read"] = false
      }
    }

    const notifications = await db.collection("notifications").find(query).sort({ createdAt: -1 }).limit(50).toArray()

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("Get notifications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const notificationData = await request.json()

    const { db } = await connectToDatabase()

    const notification = {
      ...notificationData,
      sender: new ObjectId(notificationData.sender),
      recipients: notificationData.recipients.map((r) => ({
        ...r,
        userId: new ObjectId(r.userId),
        read: false,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("notifications").insertOne(notification)

    return NextResponse.json({
      message: "Notification created successfully",
      notificationId: result.insertedId,
    })
  } catch (error) {
    console.error("Create notification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
