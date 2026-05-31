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
      if (res.ok) {
        fetchRegistrations()
      } else {
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
        <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              autoFocus
            />
          </div>
          {loginError && (
            <p className="text-sm text-red-600">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Registration Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {registrations.length} registrations · $
            {totalRevenue.toLocaleString()} total
          </p>
        </div>
        <button
          onClick={handleExport}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
        >
          Export to Excel
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : registrations.length === 0 ? (
        <p className="text-center text-gray-500">No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-900">#</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Name</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Email</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Institution</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Country</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Ticket</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Qty</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Amount</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.map((r, i) => (
                <tr key={r._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {r.firstName} {r.lastName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.email}</td>
                  <td className="px-4 py-3 text-gray-600">{r.institution}</td>
                  <td className="px-4 py-3 text-gray-600">{r.country}</td>
                  <td className="px-4 py-3 text-gray-600">{r.ticketName}</td>
                  <td className="px-4 py-3 text-gray-600">{r.quantity}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    ${r.amount?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleDateString()
                      : ""}
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
