import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    const { db } = await connectToDatabase()

    // Get basic counts
    const [
      totalStudents,
      totalFaculty,
      totalStaff,
      activeUsers,
      pendingLeaveRequests,
      unreadNotifications,
      totalAssignments,
      completedAssignments,
    ] = await Promise.all([
      db.collection("students").countDocuments(),
      db.collection("faculty").countDocuments(),
      db.collection("staff").countDocuments(),
      db.collection("users").countDocuments({ status: "active" }),
      db.collection("leave_requests").countDocuments({ status: "pending" }),
      db.collection("notifications").countDocuments({ "recipients.read": false }),
      db.collection("assignments").countDocuments(),
      db.collection("assignments").countDocuments({ status: "completed" }),
    ])

    // Get recent activities
    const recentActivities = await db.collection("audit_logs").find({}).sort({ timestamp: -1 }).limit(10).toArray()

    // Get attendance statistics for the current month
    const currentMonth = new Date()
    currentMonth.setDate(1)
    const nextMonth = new Date(currentMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    const attendanceStats = await db
      .collection("attendance")
      .aggregate([
        {
          $match: {
            date: { $gte: currentMonth, $lt: nextMonth },
          },
        },
        {
          $group: {
            _id: null,
            totalClasses: { $sum: 1 },
            averageAttendance: { $avg: "$attendancePercentage" },
          },
        },
      ])
      .toArray()

    const analytics = {
      overview: {
        totalStudents,
        totalFaculty,
        totalStaff,
        activeUsers,
        pendingLeaveRequests,
        unreadNotifications,
        totalAssignments,
        completedAssignments,
      },
      attendance: {
        totalClasses: attendanceStats[0]?.totalClasses || 0,
        averageAttendance: Math.round(attendanceStats[0]?.averageAttendance || 0),
      },
      recentActivities: recentActivities.slice(0, 5),
    }

    return NextResponse.json({ analytics })
  } catch (error) {
    console.error("Get analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
