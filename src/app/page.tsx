import Card from "@/components/Card"
import { Database, ScrollText, Search, Zap } from "lucide-react"

export default function Home() {
  return (
    <>
      <h1 className="text-3xl text-center font-bold py-14">
        Najlepsza powtórka <br /> do teoretycznego <br />
        <span className="text-transparent bg-clip-text bg-gradient-accent animate-moving-gradient">
          egzaminu zawodowego
        </span>
      </h1>
      <main className="flex flex-col gap-8 pb-8">
        <Card>
          <div className="flex items-center gap-2">
            <Zap className="h-full aspect-square" />
            <h2 className="text-2xl font-bold">Jedno pytanie</h2>
          </div>
          <p className="leading-6">
            Nieskończenie losuj i rozwiązuj jedno pytanie z danej kwalifikacji
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="/inf02/jedno-pytanie"
              className="bg-inf02-link bg-cover bg-center rounded-md text-lg text-right px-3 py-4 font-bold"
            >
              INF.02
            </a>
            <a
              href="/inf03/jedno-pytanie"
              className="bg-inf03-link bg-cover bg-center rounded-md text-lg px-3 py-4 font-bold"
            >
              INF.03
            </a>
          </div>
        </Card>

        <p className="text-lg text-center">Coming soon&trade;</p>

        <div className="grayscale flex flex-col gap-8">
          <Card>
            <div className="flex items-center gap-2">
              <ScrollText className="h-full aspect-square" />
              <h3 className="text-2xl font-bold">Egzamin</h3>
            </div>
            <p className="leading-6">
              Rozwiąż losowy egzamin składający się z 40 pytań. Masz na to 60 minut
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="/"
                className="bg-inf02-link bg-cover bg-center rounded-md text-lg text-right px-3 py-4 font-bold"
              >
                INF.02
              </a>
              <a
                href="/"
                className="bg-inf03-link bg-cover bg-center rounded-md text-lg px-3 py-4 font-bold"
              >
                INF.03
              </a>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2">
              <Database className="h-full aspect-square" />
              <h3 className="text-2xl font-bold">Baza danych</h3>
            </div>
            <p className="leading-6">
              Wyszukaj pytania z obu kwalifikacji w naszej bazie danych
            </p>
            <div className="flex flex-col gap-2">
              <a href="/" className="bg-secondary-500 text-lg text-center px-4 py-2">
                Przejdź do wyszukiwarki
              </a>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
