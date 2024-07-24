import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container mx-auto grow py-8">{children}</div>
      <Footer />
    </>
  )
}
