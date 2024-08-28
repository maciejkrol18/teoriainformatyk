import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import type React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Providers from './providers'
import { TailwindIndicator } from '@/components/ui/tailwind-indicator'
import ToasterWrapper from '@/components/ui/ToasterWrapper'
import Skeleton from '@/components/ui/Skeleton'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const interDisplay = localFont({
  src: '../assets/fonts/InterDisplay-SemiBold.woff2',
  variable: '--font-interdisplay',
})

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(
    `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`,
  ),
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
  creator: 'Maciej Król',
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
    url: `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`,
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
      <body
        className={cn(
          'font-sans bg-background text-foreground ',
          inter.variable,
          interDisplay.variable,
        )}
      >
        <Providers>
          <ToasterWrapper />
          <TailwindIndicator />
          <div className="min-h-screen flex flex-col">{children}</div>
          <div>{modal}</div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
