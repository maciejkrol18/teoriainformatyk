import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import PlausibleProvider from "next-plausible";
import type React from "react";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import ToasterWrapper from "@/components/ui/toaster-wrapper";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const interDisplay = localFont({
  src: "../assets/fonts/inter-display-semi-bold.woff2",
  variable: "--font-interdisplay",
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    `https://${
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.PRODUCTION_DOMAIN ||
      "teoriainformatyk.pl"
    }`
  ),
  title: {
    default: "teoriainformatyk",
    template: "%s | teoriainformatyk",
  },
  description:
    "Najlepsza powtórka do teoretycznych egzaminów zawodowych INF.02 i INF.03",
  keywords: [
    "technik informatyk",
    "egzamin zawodowy",
    "inf02",
    "inf03",
    "egzamin informatyk",
    "jedno pytanie",
    "kwerendy sql",
    "fiszki",
  ],
  creator: "Maciej Król",
  authors: [
    {
      name: "Maciej Król",
      url: "https://github.com/maciejkrol18",
    },
  ],
  openGraph: {
    title: "teoriainformatyk",
    description:
      "Najlepsza powtórka do teoretycznych egzaminów zawodowych INF.02 i INF.03",
    url: `https://${
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.PRODUCTION_DOMAIN ||
      "teoriainformatyk.pl"
    }`,
    siteName: "teoriainformatyk",
    type: "website",
    locale: "pl_PL",
    images: "./opengraph-image.png",
  },
  alternates: {
    canonical: `https://${process.env.PRODUCTION_DOMAIN}`,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="pl" className="dark" suppressHydrationWarning>
      <head>
        <PlausibleProvider
          domain={
            process.env.PRODUCTION_DOMAIN || "https://teoriainformatyk.pl"
          }
          customDomain={process.env.PLAUSIBLE_URL || "https://plausible.io"}
          trackOutboundLinks
          selfHosted
          enabled
        />
      </head>
      <body
        className={cn(
          "font-sans bg-background text-foreground ",
          inter.variable,
          interDisplay.variable
        )}
      >
        <Providers>
          <ToasterWrapper />
          <TailwindIndicator />
          <div className="min-h-screen flex flex-col">{children}</div>
          <div>{modal}</div>
        </Providers>
      </body>
    </html>
  );
}
