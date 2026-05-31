"use client"

import { useState, useEffect, useCallback } from "react"

interface Registration {
  _id: string
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
  amount: number
  currency: string
  paypalOrderId: string
  paypalCaptureId?: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRegistrations = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/registrations")
      if (res.ok) {
        const data = await res.json()
        setRegistrations(data)
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    } catch {
      setAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (res.ok) fetchRegistrations()
      else {
        const data = await res.json()
        setLoginError(data.error || "Invalid password")
      }
    } catch {
      setLoginError("Login failed")
    }
  }

  const handleExport = async () => {
    try {
      const res = await fetch("/api/export")
      if (!res.ok) throw new Error("Export failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "registrations.xlsx"
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert("Export failed")
    }
  }

  const totalRevenue = registrations.reduce((sum, r) => sum + (r.amount || 0), 0)

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
            <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-accent">Admin Login</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          </div>
          {loginError && <p className="text-sm text-red-600">{loginError}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-md"
          >
            Sign In
          </button>
        </form>
      </div>
    )
  }

  const inputClass =
    "mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-accent">Registration Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            {registrations.length} registrations · ${totalRevenue.toLocaleString()} total revenue
          </p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-700 hover:shadow-md"
          disabled={registrations.length === 0}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Excel
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : registrations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
          No registrations yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent">
              <tr>
                {["#", "Name", "Email", "Institution", "Country", "Ticket", "Qty", "Amount", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-300">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.map((r, i) => (
                <tr key={r._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {r.firstName} {r.lastName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.email}</td>
                  <td className="px-4 py-3 text-gray-600">{r.institution}</td>
                  <td className="px-4 py-3 text-gray-600">{r.country}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-medium text-primary">
                      {r.ticketName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.quantity}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">${r.amount?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
