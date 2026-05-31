import Link from "next/link"

export default function TicketCard({
  id,
  name,
  description,
  price,
  availability,
}: {
  id: string
  name: string
  description: string
  price: number
  availability: string
}) {
  const isLimited =
    !availability.toLowerCase().includes("unlimited") &&
    parseInt(availability) <= 20

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">${price.toLocaleString()}</span>
        <span className="text-sm text-gray-500">USD</span>
      </div>
      <p
        className={`mt-2 text-sm ${
          isLimited ? "font-medium text-red-600" : "text-gray-500"
        }`}
      >
        {availability}
      </p>
      <Link
        href={`/register/${id}`}
        className="mt-6 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        Register Now
      </Link>
    </div>
  )
}
