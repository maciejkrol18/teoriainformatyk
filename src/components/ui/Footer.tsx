import Link from 'next/link'
import BrandLogo from './BrandLogo'

export default function Footer() {
  return (
    <footer className="py-8 bg-background-light">
      <div className="flex flex-col gap-8 container mx-auto">
        <BrandLogo size="big" />
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/#inf02">INF.02/EE.08</Link>
          <Link href="/#inf03">INF.03/EE.09/E.14</Link>
          <Link href="/search">Wyszukiwarka pytań</Link>
          <Link href="/dashboard">Panel użytkownika</Link>
          <Link href="/donate">Dotacja</Link>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/privacy">Polityka prywatności</Link>
          <Link href="https://github.com/maciejkrol18/teoriainformatyk" target="_blank">
            Github
          </Link>
        </div>
      </div>
    </footer>
  )
}
