import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'

export default function HeroLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="grow py-8">{children}</div>
      <Footer />
    </>
  )
}
