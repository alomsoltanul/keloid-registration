"use client"

import { useState, useEffect, useCallback } from "react"

interface Registration {
  id: number
  first_name: string
  last_name: string
  email: string
  institution: string
  country: string
  dietary_restrictions: string
  special_accommodations: string
  ticket_type: string
  ticket_name: string
  quantity: number
  amount: number
  currency: string
  paypal_order_id: string
  paypal_capture_id?: string
  status: string
  created_at: string
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
      <div className="mx-auto max-w-sm px-6 py-24">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900">
            <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin</h1>
          <p className="mt-1 text-sm text-neutral-500">Enter password to continue</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5"
            placeholder="Password"
            autoFocus
          />
          {loginError && <p className="text-sm text-red-500">{loginError}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Registrations</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {registrations.length} total · ${totalRevenue.toLocaleString()} revenue
          </p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
          disabled={registrations.length === 0}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Excel
        </button>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
        </div>
      ) : registrations.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 py-24 text-center">
          <p className="text-sm text-neutral-400">No registrations yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                {["#", "Name", "Email", "Institution", "Country", "Ticket", "Qty", "Amount", "Date"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-neutral-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {registrations.map((r, i) => (
                <tr key={r.id} className="transition-colors hover:bg-neutral-50/50">
                  <td className="px-5 py-3.5 text-xs text-neutral-400">{i + 1}</td>
                  <td className="px-5 py-3.5 font-medium text-neutral-900">
                    {r.first_name} {r.last_name}
                  </td>
                  <td className="px-5 py-3.5 text-neutral-600">{r.email}</td>
                  <td className="px-5 py-3.5 text-neutral-600">{r.institution}</td>
                  <td className="px-5 py-3.5 text-neutral-600">{r.country}</td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {r.ticket_name}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-neutral-600">{r.quantity}</td>
                  <td className="px-5 py-3.5 font-semibold text-neutral-900">${r.amount?.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-xs text-neutral-400">
                    {r.created_at ? new Date(r.created_at).toLocaleDateString() : ""}
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
