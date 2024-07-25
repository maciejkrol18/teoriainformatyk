import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Providers from './providers'
import { TailwindIndicator } from './tailwind-indicator'
import ToasterWrapper from '@/components/ui/ToasterWrapper'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const interDisplay = localFont({
  src: '../assets/fonts/InterDisplay-SemiBold.woff2',
  variable: '--font-interdisplay',
})

export const viewport = {
  themeColor: '#883dbd',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL!),
  title: {
    default: 'teoriainformatyk',
    template: '%s | teoriainformatyk',
  },
  description: 'Najlepsza powtórka do teoretycznych egzaminów zawodowych INF.02 i INF.03',
  keywords: [
    'technik informatyk',
    'egzamin zawodowy',
    'inf02',
    'inf03',
    'egzamin informatyk',
  ],
  authors: [
    {
      name: 'Maciej Król',
      url: 'https://github.com/maciejkrol18',
    },
  ],
  openGraph: {
    title: 'teoriainformatyk',
    description:
      'Najlepsza powtórka do teoretycznych egzaminów zawodowych INF.02 i INF.03',
    url: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    siteName: 'teoriainformatyk',
    type: 'website',
    locale: 'pl_PL',
    images: './opengraph-image.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="pl" className="dark" suppressHydrationWarning>
      <body>
        <Providers>
          <ToasterWrapper />
          <TailwindIndicator />
          <div
            className={cn(
              'bg-background text-text min-h-screen flex flex-col font-sans',
              inter.variable,
              interDisplay.variable,
            )}
          >
            {children}
          </div>
          <div>{modal}</div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
