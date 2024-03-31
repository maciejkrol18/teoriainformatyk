import BrandLogo from "@/components/ui/BrandLogo"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row grow">
      <div className="p-4 flex flex-1">
        <div className="flex flex-col grow max-w-[800px] mx-auto items-center justify-center lg:items-stretch lg:justify-between gap-8">
          <Link href="/" className="flex justify-center lg:justify-normal">
            <BrandLogo size="big" />
          </Link>
          {children}
          <p className="text-muted text-center">
            Kontynuując zgadzasz się na warunki
            <br />
            <Link href="/privacy" className="underline">
              Polityki Prywatności
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
    </div>
  )
}
