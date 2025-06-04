import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classFilter = searchParams.get("class")
    const section = searchParams.get("section")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const { db } = await connectToDatabase()

    const query: any = {}

    if (classFilter && classFilter !== "all") {
      query.class = classFilter
    }

    if (section) {
      query.section = section
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const attendance = await db.collection("attendance").find(query).toArray()

    return NextResponse.json({ attendance })
  } catch (error) {
    console.error("Get attendance error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const attendanceData = await request.json()

    const { db } = await connectToDatabase()

    // Calculate attendance statistics
    const presentCount = attendanceData.students.filter((s) => s.status === "present").length
    const absentCount = attendanceData.students.filter((s) => s.status === "absent").length
    const totalStudents = attendanceData.students.length
    const attendancePercentage = (presentCount / totalStudents) * 100

    const attendance = {
      ...attendanceData,
      facultyId: new ObjectId(attendanceData.facultyId),
      students: attendanceData.students.map((s) => ({
        ...s,
        studentId: new ObjectId(s.studentId),
      })),
      totalStudents,
      presentCount,
      absentCount,
      attendancePercentage,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("attendance").insertOne(attendance)

    return NextResponse.json({
      message: "Attendance marked successfully",
      attendanceId: result.insertedId,
    })
  } catch (error) {
    console.error("Mark attendance error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
