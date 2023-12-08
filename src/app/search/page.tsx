import Search from "@/components/Search"
import PageTitle from "@/components/ui/PageTitle"

export default function Page() {
  return (
    <>
      <PageTitle smallTitle="Baza danych" bigTitle="Wyszukiwarka pytań" />
      <main className="md:w-full md:max-w-lg md:mx-auto">
        <Search />
      </main>
    </>
  )
}
