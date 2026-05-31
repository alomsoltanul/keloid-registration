const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_API = process.env.PAYPAL_API || "https://api-m.paypal.com"

async function getAccessToken(): Promise<string> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal credentials are not configured")
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64")
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${await res.text()}`)
  }

  const data = await res.json()
  return data.access_token
}

export async function createPayPalOrder(amount: number, ticketName: string, currency = "USD") {
  const token = await getAccessToken()

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: `6th International Keloid Symposium - ${ticketName}`,
        },
      ],
      application_context: {
        brand_name: "Keloid Research Foundation",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      },
    }),
  })

  if (!res.ok) {
    throw new Error(`PayPal create order failed: ${await res.text()}`)
  }

  return res.json()
}

export async function capturePayPalOrder(orderId: string) {
  const token = await getAccessToken()

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`PayPal capture failed: ${await res.text()}`)
  }

  return res.json()
}
