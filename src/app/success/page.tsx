import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-accent">Registration Confirmed</h1>
      <p className="mt-4 text-gray-600">
        Thank you for registering for the 6th International Keloid Symposium.
        A confirmation email has been sent to your inbox.
      </p>
      <div className="mt-6 rounded-lg bg-primary-light/50 p-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-900">6th International Keloid Symposium</p>
        <p>June 11-13, 2026 · Amsterdam, Netherlands</p>
      </div>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-md"
      >
        Back to Registration
      </Link>
    </div>
  )
}
