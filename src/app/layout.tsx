import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
