import Search from "@/components/Search"

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center py-12">
        <span className="uppercase text-transparent text-xl font-bold bg-clip-text bg-gradient-accent animate-moving-gradient">
          Baza danych
        </span>
        <h1 className="text-2xl font-bold">Wyszukiwarka pytań</h1>
      </div>
      <main className="md:w-full md:max-w-lg md:mx-auto">
        <Search />
      </main>
    </>
  )
}
