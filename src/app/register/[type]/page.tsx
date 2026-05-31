import { notFound } from "next/navigation"
import { getTicketById } from "@/data/tickets"
import RegistrationForm from "@/components/RegistrationForm"

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  const ticket = getTicketById(type)

  if (!ticket) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <a
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to registration options
      </a>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-accent">{ticket.name}</h1>
        <p className="mt-2 text-gray-600">{ticket.description}</p>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-gray-900">${ticket.price.toLocaleString()}</span>
          <span className="text-base font-medium text-gray-400">USD</span>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <RegistrationForm ticket={ticket} />
      </div>
    </div>
  )
}
