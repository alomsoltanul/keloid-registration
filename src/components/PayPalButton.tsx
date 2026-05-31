"use client"

import { useRef, useEffect, useState } from "react"

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        style?: Record<string, string>
        createOrder: () => Promise<string>
        onApprove: (data: { orderID: string }) => Promise<void>
        onError?: (err: Error) => void
        onCancel?: () => void
      }) => {
        render: (container: HTMLElement) => void
      }
    }
  }
}

interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  institution: string
  country: string
  dietaryRestrictions: string
  specialAccommodations: string
  ticketType: string
  ticketName: string
  quantity: number
}

export default function PayPalButton({
  amount,
  ticketName,
  registration,
  onSuccess,
  onCancel,
}: {
  amount: number
  ticketName: string
  registration: RegistrationData
  onSuccess: () => void
  onCancel: () => void
}) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    let scriptRemoved = false
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`
    script.onload = () => {
      if (!window.paypal || !buttonRef.current || scriptRemoved) return

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "pay",
          },
          createOrder: async () => {
            setLoading(true)
            setError(null)
            try {
              const res = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, ticketName }),
              })
              const data = await res.json()
              if (!res.ok) throw new Error(data.error || "Failed to create order")
              return data.id
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : "Payment failed"
              setError(message)
              throw err
            } finally {
              setLoading(false)
            }
          },
          onApprove: async (data: { orderID: string }) => {
            setLoading(true)
            setError(null)
            try {
              const res = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: data.orderID,
                  registration,
                }),
              })
              const result = await res.json()
              if (!res.ok) throw new Error(result.error || "Failed to capture payment")
              onSuccess()
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : "Capture failed"
              setError(message)
            } finally {
              setLoading(false)
            }
          },
          onCancel: () => {
            onCancel()
          },
          onError: (err: Error) => {
            setError(err.message || "PayPal error occurred")
          },
        })
        .render(buttonRef.current!)
    }
    document.body.appendChild(script)

    return () => {
      scriptRemoved = true
      document.body.removeChild(script)
    }
  }, [amount, ticketName, registration, onSuccess, onCancel])

  return (
    <div>
      {loading && (
        <div className="mb-4 rounded-lg bg-blue-50 p-4 text-center text-sm text-blue-700">
          Processing payment...
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      <div ref={buttonRef} />
    </div>
  )
}
