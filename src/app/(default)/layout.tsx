import Footer from "@/components/ui/Footer"
import Header from "@/components/ui/Header"

export default function DefaultLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-col grow gap-8 py-8">{children}</div>
      <div>{modal}</div>
      <Footer />
    </>
  )
}
