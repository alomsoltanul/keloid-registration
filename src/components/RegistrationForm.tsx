"use client"

import { useState } from "react"
import PayPalButton from "./PayPalButton"
import type { TicketType } from "@/data/tickets"

export default function RegistrationForm({ ticket }: { ticket: TicketType }) {
  const [step, setStep] = useState<"form" | "payment" | "complete">("form")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    country: "",
    dietaryRestrictions: "",
    specialAccommodations: "",
    quantity: 1,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.institution.trim()) newErrors.institution = "Institution is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (formData.quantity < 1) newErrors.quantity = "Quantity must be at least 1"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setStep("payment")
    }
  }

  const handlePaymentSuccess = () => {
    setStep("complete")
  }

  const handlePaymentCancel = () => {
    setStep("form")
  }

  if (step === "complete") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-900">Registration Confirmed</h3>
        <p className="mt-2 text-green-700">
          Your registration for the 6th International Keloid Symposium has been confirmed.
          A confirmation email will be sent to <strong>{formData.email}</strong>.
        </p>
        <p className="mt-4 text-sm text-green-600">
          If you have any questions, contact{" "}
          <a href="mailto:inquiries@keloidsymposium.com" className="underline">
            inquiries@keloidsymposium.com
          </a>
        </p>
      </div>
    )
  }

  const total = ticket.price * formData.quantity

  return (
    <div className="space-y-8">
      {step === "form" && (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Institution / Organization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            {errors.institution && (
              <p className="mt-1 text-xs text-red-600">{errors.institution}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            {errors.country && (
              <p className="mt-1 text-xs text-red-600">{errors.country}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dietary Restrictions
            </label>
            <input
              type="text"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              placeholder="None, Vegetarian, Halal, etc."
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Special Accommodations / Notes
            </label>
            <textarea
              name="specialAccommodations"
              value={formData.specialAccommodations}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min={1}
              max={20}
              className="mt-1 block w-24 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            {errors.quantity && (
              <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{ticket.name}</p>
                <p className="text-sm text-gray-600">
                  ${ticket.price.toLocaleString()} x {formData.quantity}
                </p>
              </div>
              <p className="text-xl font-bold text-gray-900">
                ${total.toLocaleString()} USD
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Continue to Payment
          </button>
        </form>
      )}

      {step === "payment" && (
        <div>
          <div className="rounded-lg bg-gray-50 p-4 mb-6">
            <h3 className="font-medium text-gray-900">Order Summary</h3>
            <p className="text-sm text-gray-600">{ticket.name}</p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              ${total.toLocaleString()} USD
            </p>
          </div>

          <PayPalButton
            amount={total}
            ticketName={ticket.name}
            registration={{
              ...formData,
              ticketType: ticket.id,
              ticketName: ticket.name,
            }}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </div>
      )}
    </div>
  )
}
