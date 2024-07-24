import MobileNavigation from './MobileNavigation'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import BrandLogo from './BrandLogo'
import HeaderAuth from './HeaderAuth'
import { createClient } from '@/lib/supabase/server'

export default async function Header() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  return (
    <header className="py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <BrandLogo size="small" />
        </Link>
        <nav className="hidden lg:flex gap-8 py-2">
          <Link href="/#inf03" className="rounded-md hover:bg-secondary-300">
            INF.03/EE.09/EE.14
          </Link>
          <Link href="/#inf02" className="rounded-md hover:bg-secondary-300">
            INF.02/EE.08
          </Link>
          <Link href="/search" className="rounded-md hover:bg-secondary-300">
            Wyszukiwarka
          </Link>
        </nav>
        <div className="hidden lg:flex lg:items-center gap-4">
          <ThemeSwitch />
          <p>|</p>
          <HeaderAuth user={data.user} />
        </div>
        <MobileNavigation user={data.user} />
      </div>
    </header>
  )
}
