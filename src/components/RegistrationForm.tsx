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
    if (validate()) setStep("payment")
  }

  const total = ticket.price * formData.quantity

  if (step === "complete") {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50">
          <svg className="h-10 w-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-neutral-900">Registration Confirmed</h3>
        <p className="mt-3 leading-relaxed text-neutral-500">
          Your registration for the 6th International Keloid Symposium has been confirmed.
          We&apos;ve sent a confirmation email to <strong className="text-neutral-700">{formData.email}</strong>.
        </p>
        <div className="mx-auto mt-8 max-w-sm rounded-xl bg-neutral-50 p-5 text-left text-sm">
          <p className="font-semibold text-neutral-900">Need help?</p>
          <p className="mt-1.5 text-neutral-500">
            Contact{" "}
            <a href="mailto:inquiries@keloidsymposium.com" className="font-medium text-primary hover:underline">
              inquiries@keloidsymposium.com
            </a>
          </p>
        </div>
      </div>
    )
  }

  const inputClass =
    "mt-1.5 block w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
  const labelClass = "block text-sm font-medium text-neutral-700"
  const errorClass = "mt-1.5 text-xs text-red-500"

  return (
    <div>
      {step === "form" && (
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                First Name <span className="text-red-400">*</span>
              </label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass} />
              {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
            </div>
            <div>
              <label className={labelClass}>
                Last Name <span className="text-red-400">*</span>
              </label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass} />
              {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Email Address <span className="text-red-400">*</span>
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@institution.edu" />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
            <label className={labelClass}>
              Institution / Organization <span className="text-red-400">*</span>
            </label>
            <input type="text" name="institution" value={formData.institution} onChange={handleChange} className={inputClass} />
            {errors.institution && <p className={errorClass}>{errors.institution}</p>}
          </div>

          <div>
            <label className={labelClass}>
              Country <span className="text-red-400">*</span>
            </label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} className={inputClass} />
            {errors.country && <p className={errorClass}>{errors.country}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Dietary Restrictions</label>
              <input type="text" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} className={inputClass} placeholder="None, Vegetarian, etc." />
            </div>
            <div>
              <label className={labelClass}>Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min={1} max={20} className={inputClass} />
              {errors.quantity && <p className={errorClass}>{errors.quantity}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>Special Accommodations / Notes</label>
            <textarea name="specialAccommodations" value={formData.specialAccommodations} onChange={handleChange} rows={3} className={inputClass} />
          </div>

          <div className="rounded-2xl bg-primary/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-neutral-900">{ticket.name}</p>
                <p className="text-sm text-neutral-500">
                  ${ticket.price.toLocaleString()} &times; {formData.quantity}
                </p>
              </div>
              <p className="text-2xl font-bold text-neutral-900">
                ${total.toLocaleString()} <span className="text-sm font-normal text-neutral-400">USD</span>
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
          >
            Continue to Payment
          </button>
        </form>
      )}

      {step === "payment" && (
        <div>
          <div className="mb-8 rounded-2xl bg-primary/5 p-5">
            <h3 className="font-semibold text-neutral-900">Order Summary</h3>
            <p className="mt-1 text-sm text-neutral-500">{ticket.name}</p>
            <p className="mt-2 text-2xl font-bold text-neutral-900">
              ${total.toLocaleString()} <span className="text-sm font-normal text-neutral-400">USD</span>
            </p>
          </div>

          <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm text-blue-600">
              You will be redirected to PayPal to complete your payment securely.
            </p>
          </div>

          <PayPalButton
            amount={total}
            ticketName={ticket.name}
            registration={{ ...formData, ticketType: ticket.id, ticketName: ticket.name }}
            onSuccess={() => setStep("complete")}
            onCancel={() => setStep("form")}
          />
        </div>
      )}
    </div>
  )
}
