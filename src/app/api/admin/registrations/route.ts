import { NextRequest, NextResponse } from "next/server"
import { getAllRegistrations } from "@/lib/models/registration"

function verifyAdmin(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  return token === adminPassword
}

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const registrations = await getAllRegistrations()
    return NextResponse.json(registrations)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    )
  }
}
