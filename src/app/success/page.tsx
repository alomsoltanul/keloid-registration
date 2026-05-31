import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50">
        <svg className="h-10 w-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-neutral-900">Registration Confirmed</h1>
      <p className="mt-4 leading-relaxed text-neutral-500">
        Thank you for registering. A confirmation email has been sent to your inbox.
      </p>
      <div className="mx-auto mt-6 max-w-xs rounded-xl bg-neutral-50 p-4 text-sm text-neutral-500">
        <p className="font-semibold text-neutral-900">6th International Keloid Symposium</p>
        <p>June 11-13, 2026 · Amsterdam, Netherlands</p>
      </div>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
      >
        Back to Registration
      </Link>
    </div>
  )
}
