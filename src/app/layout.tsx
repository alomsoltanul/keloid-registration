import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Registration — 6th International Keloid Symposium",
  description:
    "Register for the 6th International Keloid Symposium, Amsterdam, Netherlands, June 11-13, 2026",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-neutral-50 text-neutral-900">
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold">
                K
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight text-neutral-900">
                  6th International Keloid Symposium
                </div>
                <div className="text-xs text-neutral-400">
                  June 11-13, 2026 · Amsterdam
                </div>
              </div>
            </a>
            <a
              href="mailto:inquiries@keloidsymposium.com"
              className="flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-primary"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              inquiries@keloidsymposium.com
            </a>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-neutral-200 bg-white py-8">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <p className="text-sm text-neutral-400">
              &copy; 2016-2026 Keloid Research Foundation, New York. All Rights Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
