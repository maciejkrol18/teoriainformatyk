import Card from "@/components/ui/Card"
import { Database, ScrollText, Zap, Terminal } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <h1 className="text-3xl lg:text-4xl text-center py-14 font-calsans leading-8 tracking-wide">
        Najlepsza powtórka <br /> do teoretycznego <br />
        <span className="text-transparent bg-clip-text bg-gradient-accent animate-moving-gradient">
          egzaminu zawodowego
        </span>
      </h1>
      <main className="flex flex-col max-w-6xl mx-auto gap-8 pb-8">
        <section className="flex flex-col gap-8 md:flex-row">
          <Card className="max-w-[338px]">
            <div className="flex items-center gap-2">
              <Zap className="h-full aspect-square" />
              <h2 className="text-2xl font-bold">Jedno pytanie</h2>
            </div>
            <p className="leading-6">
              Nieskończenie losuj i rozwiązuj jedno pytanie z danej kwalifikacji
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/one-question/inf02"
                className="bg-inf02-link bg-cover bg-center rounded-md text-lg text-right px-3 py-4 font-bold"
              >
                INF.02
              </Link>
              <Link
                href="/one-question/inf03"
                className="bg-inf03-link bg-cover bg-center rounded-md text-lg px-3 py-4 font-bold"
              >
                INF.03
              </Link>
            </div>
          </Card>

          <Card className="max-w-[338px]">
            <div className="flex items-center gap-2">
              <ScrollText className="h-full aspect-square" />
              <h3 className="text-2xl font-bold">Egzamin</h3>
            </div>
            <p className="leading-6">
              Rozwiąż losowy egzamin składający się z 40 pytań. Masz na to 60 minut
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/exam/inf02"
                className="bg-inf02-link bg-cover bg-center rounded-md text-lg text-right px-3 py-4 font-bold"
              >
                INF.02
              </Link>
              <Link
                href="/exam/inf03"
                className="bg-inf03-link bg-cover bg-center rounded-md text-lg px-3 py-4 font-bold"
              >
                INF.03
              </Link>
            </div>
          </Card>
        </section>

        <section className="flex flex-col gap-8 md:flex-row">
          <Card className="max-w-[338px]">
            <div className="flex items-center gap-2">
              <Terminal className="h-full aspect-square" />
              <h3 className="text-2xl font-bold">Kwerendy SQL</h3>
            </div>
            <p className="leading-6">
              Przećwicz pisanie kwerend SQL na podstawie baz danych z dawnych arkuszy
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/sql-training"
                className="bg-secondary-500 text-lg text-center px-4 py-2"
              >
                Rozpocznij
              </Link>
            </div>
          </Card>
          <Card className="max-w-[338px]">
            <div className="flex items-center gap-2">
              <Database className="h-full aspect-square" />
              <h3 className="text-2xl font-bold">Baza danych</h3>
            </div>
            <p className="leading-6">
              Wyszukaj pytania z obu kwalifikacji wpisując ich treść w naszej bazie danych
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/search"
                className="bg-secondary-500 text-lg text-center px-4 py-2"
              >
                Przejdź do wyszukiwarki
              </Link>
            </div>
          </Card>
        </section>
      </main>
    </>
  )
}
