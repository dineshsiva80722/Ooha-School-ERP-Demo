import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid faculty ID" }, { status: 400 })
    }

    const faculty = await db.collection("faculty").findOne({
      _id: new ObjectId(params.id),
    })

    if (!faculty) {
      return NextResponse.json({ error: "Faculty not found" }, { status: 404 })
    }

    return NextResponse.json({ faculty })
  } catch (error) {
    console.error("Get faculty error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json()
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid faculty ID" }, { status: 400 })
    }

    const result = await db.collection("faculty").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Faculty not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Faculty updated successfully" })
  } catch (error) {
    console.error("Update faculty error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid faculty ID" }, { status: 400 })
    }

    const faculty = await db.collection("faculty").findOne({
      _id: new ObjectId(params.id),
    })

    if (!faculty) {
      return NextResponse.json({ error: "Faculty not found" }, { status: 404 })
    }

    const result = await db.collection("faculty").deleteOne({
      _id: new ObjectId(params.id),
    })

    // Delete associated user account
    if (faculty.personalInfo?.email) {
      await db.collection("users").deleteOne({
        email: faculty.personalInfo.email,
      })
    }

    return NextResponse.json({ message: "Faculty deleted successfully" })
  } catch (error) {
    console.error("Delete faculty error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
