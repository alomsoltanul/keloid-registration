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
      <div className="mb-8">
        <a
          href="/"
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to registration options
        </a>
        <h1 className="text-2xl font-bold text-gray-900">{ticket.name}</h1>
        <p className="mt-1 text-gray-600">{ticket.description}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          ${ticket.price.toLocaleString()}{" "}
          <span className="text-base font-normal text-gray-500">USD</span>
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <RegistrationForm ticket={ticket} />
      </div>
    </div>
  )
}
