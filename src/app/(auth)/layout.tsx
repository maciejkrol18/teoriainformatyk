import BrandLogo from "@/components/ui/BrandLogo"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col p-4 justify-center items-center min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="flex flex-col p-8 min-h-[512px] max-w-[512px] w-full rounded-md bg-background-light">
        <Link href="/" className="flex w-full justify-center">
          <BrandLogo size="big" />
        </Link>
        <div className="flex flex-col pt-4 grow">{children}</div>
      </div>
    </div>
  )
}
