import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasMongoDB: !!process.env.MONGODB_URI,
    hasPayPalId: !!process.env.PAYPAL_CLIENT_ID,
    hasPayPalSecret: !!process.env.PAYPAL_CLIENT_SECRET,
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    publicPayPalId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.length || 0,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  })
}
