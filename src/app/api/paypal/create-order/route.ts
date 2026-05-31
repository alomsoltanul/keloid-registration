import { NextRequest, NextResponse } from "next/server"
import { createPayPalOrder } from "@/lib/paypal"

export async function POST(req: NextRequest) {
  try {
    const { amount, ticketName } = await req.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const order = await createPayPalOrder(amount, ticketName || "Registration")

    return NextResponse.json({ id: order.id })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
