import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-10 w-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Registration Confirmed</h1>
      <p className="mt-3 text-gray-600">
        Thank you for registering for the 6th International Keloid Symposium.
        A confirmation email has been sent to your inbox.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        June 11-13, 2026 · Amsterdam, Netherlands
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        Back to Registration
      </Link>
    </div>
  )
}
