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

  const isLowStock =
    !availability.toLowerCase().includes("unlimited") &&
    parseInt(availability) <= 50

  return (
    <div className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-accent">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
      </div>

      <div className="mt-auto">
        <div className="mb-1 flex items-baseline gap-0.5">
          <span className="text-3xl font-bold text-gray-900">${price.toLocaleString()}</span>
          <span className="text-xs font-medium text-gray-400">USD</span>
        </div>

        <div className="mb-4 flex items-center gap-2">
          {isLimited ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600">
              {availability}
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-700">
              {availability}
            </span>
          ) : (
            <span className="text-xs text-gray-400">{availability}</span>
          )}
        </div>

        <Link
          href={`/register/${id}`}
          className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-md"
        >
          Register Now
        </Link>
      </div>
    </div>
  )
}
