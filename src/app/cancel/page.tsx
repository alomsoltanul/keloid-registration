import Link from "next/link"

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
        <svg className="h-10 w-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-accent">Payment Cancelled</h1>
      <p className="mt-4 text-gray-600">
        Your payment was not completed. No charges have been made.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
        >
          Try Again
        </Link>
        <Link
          href="mailto:inquiries@keloidsymposium.com"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-md"
        >
          Contact Support
        </Link>
      </div>
    </div>
  )
}
