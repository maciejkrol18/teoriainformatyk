import MobileNavigation from './MobileNavigation'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import BrandLogo from './BrandLogo'
import HeaderAuth from './HeaderAuth'
import { createClient } from '@/lib/supabase/server'
import { Button } from './Button'

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
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/#inf03">INF.03/EE.09/EE.14</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/#inf02">INF.02/EE.08</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/search">Wyszukiwarka</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/hardest">Najtrudniejsze pytania</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <p>|</p>
          <div className="hidden lg:flex items-center">
            <HeaderAuth user={data.user} />
          </div>
          <div className="flex items-center lg:hidden">
            <MobileNavigation user={data.user} />
          </div>
        </div>
      </div>
    </header>
  )
}
