import TicketCard from "@/components/TicketCard"
import { tickets } from "@/data/tickets"

export default function Home() {
  return (
    <div>
      <div className="relative overflow-hidden bg-white pb-16 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700">
            Regular Registration ends May 31, 2026
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Registration
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            6th International Keloid Symposium · Amsterdam, Netherlands · June 11-13, 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-20">
        <div className="-mt-8 mb-16 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50 text-neutral-400">
                <th className="px-8 py-4 text-xs font-semibold uppercase tracking-wider">
                  Registration Type
                </th>
                <th className="px-8 py-4 text-xs font-semibold uppercase tracking-wider">
                  Regular <span className="font-normal normal-case">(Now - May 31)</span>
                </th>
                <th className="px-8 py-4 text-xs font-semibold uppercase tracking-wider">
                  Late <span className="font-normal normal-case">(June 1-11)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              <tr>
                <td className="px-8 py-4 font-medium text-neutral-900">General Admission</td>
                <td className="px-8 py-4 font-semibold text-primary">$695.00</td>
                <td className="px-8 py-4 text-neutral-400">$895.00</td>
              </tr>
              <tr>
                <td className="px-8 py-4 font-medium text-neutral-900">Residents / Students</td>
                <td className="px-8 py-4 font-semibold text-primary">$350.00</td>
                <td className="px-8 py-4 text-neutral-400">$450.00</td>
              </tr>
              <tr>
                <td className="px-8 py-4 font-medium text-neutral-900">Members of Industry</td>
                <td className="px-8 py-4 font-semibold text-primary">$3,500.00</td>
                <td className="px-8 py-4 text-neutral-400">$4,500.00</td>
              </tr>
              <tr>
                <td className="px-8 py-4 font-medium text-neutral-900">Remote Participation</td>
                <td className="px-8 py-4 font-semibold text-primary">$450.00</td>
                <td className="px-8 py-4 text-neutral-400">$450.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-neutral-900">
          Select your registration type
        </h2>
        <p className="mb-10 text-neutral-500">
          Choose the category that best applies to you.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(tickets).map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
        </div>

        <div className="mt-16 flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">Refund Policy</h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">
              Full refund available for cancellation requests received by May 1, 2026.
            </p>
            <p className="mt-3 text-sm text-neutral-500">
              Questions?{" "}
              <a href="mailto:inquiries@keloidsymposium.com" className="font-medium text-primary hover:underline">
                inquiries@keloidsymposium.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
