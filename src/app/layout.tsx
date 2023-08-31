import { cn } from "@/lib/utils"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import React from "react"
import { TailwindIndicator } from "@/components/TailwindIndicator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
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
    <html lang="pl">
      <body>
        <div
          className={cn(
            inter.className,
            "bg-gradient-primary bg-fixed text-foreground min-h-screen flex flex-col",
          )}
        >
          <TailwindIndicator />
          <Header />
          <div className="px-4 md:px-0 container mx-auto flex flex-col grow gap-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
