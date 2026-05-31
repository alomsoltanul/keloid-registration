import Link from "next/link"

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50">
        <svg className="h-10 w-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-neutral-900">Payment Cancelled</h1>
      <p className="mt-4 leading-relaxed text-neutral-500">
        Your payment was not completed. No charges have been made.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-neutral-50"
        >
          Try Again
        </Link>
        <Link
          href="mailto:inquiries@keloidsymposium.com"
          className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
        >
          Contact Support
        </Link>
      </div>
    </div>
  )
}
