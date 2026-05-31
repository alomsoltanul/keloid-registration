import TicketCard from "@/components/TicketCard"
import { tickets } from "@/data/tickets"

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Registration
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          6th International Keloid Symposium · Amsterdam, Netherlands · June 11-13, 2026
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Regular Registration ends May 31, 2026
        </p>
      </div>

      <div className="mb-10 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 font-semibold text-gray-900">Registration Type</th>
              <th className="pb-3 font-semibold text-gray-900">Regular (Now - May 31)</th>
              <th className="pb-3 font-semibold text-gray-900">Late (June 1-11)</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            <tr className="border-b border-gray-100">
              <td className="py-3">General Admission</td>
              <td className="py-3">$695.00</td>
              <td className="py-3">$895.00</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3">Residents / Students</td>
              <td className="py-3">$350.00</td>
              <td className="py-3">$450.00</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3">Members of Industry</td>
              <td className="py-3">$3,500.00</td>
              <td className="py-3">$4,500.00</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3">Remote Participation</td>
              <td className="py-3">$450.00</td>
              <td className="py-3">$450.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Select Your Registration Type
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Object.values(tickets).map((ticket) => (
          <TicketCard key={ticket.id} {...ticket} />
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900">Refund Policy</h3>
        <p className="mt-2 text-sm text-gray-600">
          If for any reason you are unable to attend, we will issue a full refund
          provided your refund request is received by May 1, 2026.
        </p>
        <p className="mt-4 text-sm text-gray-600">
          Questions? Contact{" "}
          <a
            href="mailto:inquiries@keloidsymposium.com"
            className="text-blue-600 underline"
          >
            inquiries@keloidsymposium.com
          </a>
        </p>
      </div>
    </div>
  )
}
