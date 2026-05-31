import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAllRegistrations } from "@/lib/models/registration"

async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  return token === adminPassword
}

export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const registrations = await getAllRegistrations()
    return NextResponse.json(registrations)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch registrations"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
