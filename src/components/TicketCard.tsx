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
    <div className="group relative flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-neutral-900">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">{description}</p>
      </div>

      <div className="mt-auto">
        <div className="mb-2 flex items-baseline gap-0.5">
          <span className="text-3xl font-bold text-neutral-900">
            ${price.toLocaleString()}
          </span>
          <span className="text-xs font-medium text-neutral-400">USD</span>
        </div>

        <div className="mb-5">
          {isLimited ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              {availability}
            </span>
          ) : (
            <span className="text-xs text-neutral-400">{availability}</span>
          )}
        </div>

        <Link
          href={`/register/${id}`}
          className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
        >
          Register Now
        </Link>
      </div>
    </div>
  )
}
