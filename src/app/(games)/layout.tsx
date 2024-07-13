import Header from "@/components/ui/Header"

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-col grow gap-4 py-4">{children}</div>
    </>
  )
}
