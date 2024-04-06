import { cn } from "@/lib/utils"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import React from "react"
import { Analytics } from "@vercel/analytics/react"
import Providers from "./providers"
import { Toaster } from "sonner"
import { TailwindIndicator } from "@/components/TailwindIndicator"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const interDisplay = localFont({
  src: "../assets/fonts/InterDisplay-SemiBold.woff2",
  variable: "--font-interdisplay",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://teoriainformatyk.vercel.app"),
  title: {
    default: "teoriainformatyk",
    template: "%s | teoriainformatyk",
  },
  description: "Najlepsza powtórka do teoretycznych egzaminów zawodowych INF.02 i INF.03",
  keywords: [
    "technik informatyk",
    "egzamin zawodowy",
    "inf02",
    "inf03",
    "egzamin informatyk",
  ],
  authors: [
    {
      name: "Maciej Król",
      url: "https://github.com/maciejkrol18",
    },
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: "teoriainformatyk",
    description:
      "Najlepsza powtórka do teoretycznych egzaminów zawodowych INF.02 i INF.03",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pl" className="dark" suppressHydrationWarning>
      <body>
        <Providers>
          <Toaster
            toastOptions={{
              style: {
                background: "var(--background-bright)",
                color: "var(--text)",
              },
            }}
          />
          <TailwindIndicator />
          <div
            className={cn(
              "bg-background text-text min-h-screen flex flex-col font-sans",
              inter.variable,
              interDisplay.variable,
            )}
          >
            {children}
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
