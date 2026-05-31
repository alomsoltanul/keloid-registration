import Link from "next/link"

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
        <svg
          className="h-10 w-10 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Payment Cancelled</h1>
      <p className="mt-3 text-gray-600">
        Your payment was not completed. Your registration has not been processed.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Try Again
        </Link>
        <Link
          href="mailto:inquiries@keloidsymposium.com"
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  )
}
