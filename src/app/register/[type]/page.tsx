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
    <div className="mx-auto max-w-2xl px-6 py-16">
      <a
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-primary"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
        Back to options
      </a>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900">{ticket.name}</h1>
        <p className="mt-2 text-neutral-500">{ticket.description}</p>
        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-5xl font-bold text-neutral-900">
            ${ticket.price.toLocaleString()}
          </span>
          <span className="text-lg font-medium text-neutral-400">USD</span>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <RegistrationForm ticket={ticket} />
      </div>
    </div>
  )
}
