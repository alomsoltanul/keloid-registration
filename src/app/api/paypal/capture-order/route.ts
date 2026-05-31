import { NextRequest, NextResponse } from "next/server"
import { capturePayPalOrder } from "@/lib/paypal"
import { saveRegistration } from "@/lib/models/registration"
import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.RESEND_FROM_EMAIL || "registration@keloidsymposium.com"

export async function POST(req: NextRequest) {
  try {
    const { orderId, registration } = await req.json()

    if (!orderId || !registration) {
      return NextResponse.json(
        { error: "Missing order ID or registration data" },
        { status: 400 }
      )
    }

    const capture = await capturePayPalOrder(orderId)

    const paypalCaptureId = capture.purchase_units?.[0]?.payments?.captures?.[0]?.id
    const capturedAmount =
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value

    await saveRegistration({
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      institution: registration.institution,
      country: registration.country,
      dietaryRestrictions: registration.dietaryRestrictions || "",
      specialAccommodations: registration.specialAccommodations || "",
      ticketType: registration.ticketType,
      ticketName: registration.ticketName,
      quantity: registration.quantity || 1,
      amount: parseFloat(capturedAmount) || registration.amount || 0,
      currency: "USD",
      paypalOrderId: orderId,
      paypalCaptureId,
      status: "completed",
    })

    if (resendApiKey && registration.email) {
      try {
        const resend = new Resend(resendApiKey)
        await resend.emails.send({
          from: `Keloid Research Foundation <${fromEmail}>`,
          to: registration.email,
          subject: `Registration Confirmed — 6th International Keloid Symposium`,
          html: `
            <h1>Registration Confirmed</h1>
            <p>Dear ${registration.firstName} ${registration.lastName},</p>
            <p>Your registration for the <strong>6th International Keloid Symposium</strong> has been confirmed.</p>
            <table style="border-collapse:collapse;width:100%;max-width:500px;margin:16px 0">
              <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Ticket Type</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${registration.ticketName}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Quantity</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${registration.quantity || 1}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Amount</strong></td><td style="padding:8px;border-bottom:1px solid #eee">$${capturedAmount}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Date</strong></td><td style="padding:8px;border-bottom:1px solid #eee">June 11-13, 2026</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Location</strong></td><td style="padding:8px;border-bottom:1px solid #eee">Amsterdam, Netherlands</td></tr>
            </table>
            <p>If you have any questions, please contact <a href="mailto:inquiries@keloidsymposium.com">inquiries@keloidsymposium.com</a>.</p>
            <p>— Keloid Research Foundation</p>
          `,
        })
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
