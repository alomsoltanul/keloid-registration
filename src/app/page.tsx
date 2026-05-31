import TicketCard from "@/components/TicketCard"
import { tickets } from "@/data/tickets"

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-b from-primary/5 to-white py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-accent sm:text-5xl">
            Registration
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            6th International Keloid Symposium · Amsterdam, Netherlands
          </p>
          <p className="mt-1 text-sm font-medium text-primary">
            June 11-13, 2026
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-1.5 text-sm font-medium text-yellow-800 border border-yellow-200">
            Regular Registration ends May 31, 2026
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-12 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-accent px-6 py-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
              Pricing Schedule
            </h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-gray-500">
                <th className="px-6 py-3 font-medium">Registration Type</th>
                <th className="px-6 py-3 font-medium">
                  Regular <span className="text-xs font-normal">(Now - May 31)</span>
                </th>
                <th className="px-6 py-3 font-medium">
                  Late <span className="text-xs font-normal">(June 1-11)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-3 font-medium text-gray-900">General Admission</td>
                <td className="px-6 py-3 text-primary font-semibold">$695.00</td>
                <td className="px-6 py-3 text-gray-500">$895.00</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-3 font-medium text-gray-900">Residents / Students</td>
                <td className="px-6 py-3 text-primary font-semibold">$350.00</td>
                <td className="px-6 py-3 text-gray-500">$450.00</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-3 font-medium text-gray-900">Members of Industry</td>
                <td className="px-6 py-3 text-primary font-semibold">$3,500.00</td>
                <td className="px-6 py-3 text-gray-500">$4,500.00</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-medium text-gray-900">Remote Participation</td>
                <td className="px-6 py-3 text-primary font-semibold">$450.00</td>
                <td className="px-6 py-3 text-gray-500">$450.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-accent">
          Select Your Registration Type
        </h2>
        <p className="mb-8 text-gray-500">
          Choose the category that best applies to you.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(tickets).map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-dashed border-primary/30 bg-primary-light/50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Refund Policy</h3>
              <p className="mt-1 text-sm text-gray-600">
                Full refund available for cancellation requests received by May 1, 2026.
              </p>
              <p className="mt-3 text-sm text-gray-600">
                Questions?{" "}
                <a
                  href="mailto:inquiries@keloidsymposium.com"
                  className="font-medium text-primary hover:text-primary-dark underline"
                >
                  inquiries@keloidsymposium.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
