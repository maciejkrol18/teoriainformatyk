import Footer from "@/components/ui/Footer"
import Header from "@/components/ui/Header"

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-col grow gap-4">{children}</div>
      <Footer />
    </>
  )
}