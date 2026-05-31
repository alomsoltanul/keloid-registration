import { NextRequest, NextResponse } from "next/server"
import { getAllRegistrations } from "@/lib/models/registration"
import * as XLSX from "xlsx"

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

    const rows = registrations.map((r, i) => ({
      "#": i + 1,
      "First Name": r.firstName,
      "Last Name": r.lastName,
      Email: r.email,
      Institution: r.institution,
      Country: r.country,
      "Ticket Type": r.ticketName,
      Quantity: r.quantity || 1,
      Amount: r.amount,
      Currency: r.currency,
      "PayPal Order ID": r.paypalOrderId,
      "PayPal Capture ID": r.paypalCaptureId || "",
      Status: r.status,
      "Registered At": r.createdAt?.toISOString() || "",
    }))

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(rows)
    XLSX.utils.book_append_sheet(wb, ws, "Registrations")

    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" })

    return new NextResponse(buf, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="registrations.xlsx"',
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to generate export" },
      { status: 500 }
    )
  }
}
