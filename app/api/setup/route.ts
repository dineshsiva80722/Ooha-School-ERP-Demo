import { NextResponse } from "next/server"
import { createDefaultUsers } from "@/lib/auth"

export async function POST() {
  try {
    const result = await createDefaultUsers()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json({ error: "Setup failed" }, { status: 500 })
  }
}
