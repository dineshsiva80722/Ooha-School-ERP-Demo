import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    const { db } = await connectToDatabase()

    const query: any = {}

    if (userId) {
      query.userId = new ObjectId(userId)
    }

    if (status && status !== "all") {
      query.status = status
    }

    const leaveRequests = await db.collection("leave_requests").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ leaveRequests })
  } catch (error) {
    console.error("Get leave requests error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const leaveData = await request.json()

    const { db } = await connectToDatabase()

    // Calculate total days
    const startDate = new Date(leaveData.startDate)
    const endDate = new Date(leaveData.endDate)
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

    const leaveRequest = {
      ...leaveData,
      userId: new ObjectId(leaveData.userId),
      startDate,
      endDate,
      totalDays,
      status: "pending",
      appliedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("leave_requests").insertOne(leaveRequest)

    return NextResponse.json({
      message: "Leave request submitted successfully",
      leaveRequestId: result.insertedId,
    })
  } catch (error) {
    console.error("Create leave request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
