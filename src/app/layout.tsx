import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-lg font-bold text-gray-900">
                6th International Keloid Symposium
              </a>
              <span className="text-sm text-gray-500">
                June 11-13, 2026 · Amsterdam, Netherlands
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 bg-white py-6">
          <div className="mx-auto max-w-5xl px-4 text-center text-xs text-gray-500">
            All Rights Reserved. | 2016-2026 Keloid Research Foundation, New York
          </div>
        </footer>
      </body>
    </html>
  )
}
