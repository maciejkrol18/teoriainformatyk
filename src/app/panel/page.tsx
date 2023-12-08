import Card from "@/components/ui/Card"
import CollectionAccordion from "@/components/collection/CollectionAccordion"
import CollectionManager from "@/components/collection/CollectionManager"
import ExamHistory from "@/components/ExamHistory"
import { FileClock, SkullIcon, SmileIcon } from "lucide-react"
import Link from "next/link"
import PageTitle from "@/components/ui/PageTitle"

export default function Page() {
  return (
    <>
      <PageTitle smallTitle="Panel użytkownika" bigTitle="Twoje lokalne dane" />
      <main className="flex flex-col gap-8 mb-4 md:w-full md:max-w-lg md:mx-auto">
        <p className="text-secondary-300 text-justify">
          Wszystkie widoczne poniżej dane gromadzone są tylko i wyłącznie w pamięci
          przeglądarki z której aktualnie korzystasz. Oznacza to, że na innym urządzeniu
          nie zobaczysz tych samych danych. Jako użytkownik wewnątrz tego panelu posiadasz
          możliwość manualnej modyfikacji zapisanych trudnych i łatwych pytań - w tym
          skopiowania ich do innej przeglądarki.
        </p>

        <Card>
          <div className="flex items-center gap-2">
            <SkullIcon className="text-danger-light h-full aspect-square" />
            <h2 className="text-2xl font-bold">Trudne pytania</h2>
          </div>
          <p className="leading-6">
            Kolekcja trudnych pytań służy do rozpoczęcia specjalnego trybu jednego pytania
            w którym występują jedynie pytania z jej puli.
          </p>
          <Link
            className="py-2 px-4 bg-accent-purple font-semibold rounded-md"
            href="/inf02/jedno-pytanie/trudne"
          >
            Hard mode - INF.02
          </Link>
          <Link
            className="py-2 px-4 bg-accent-purple font-semibold rounded-md"
            href="/inf03/jedno-pytanie/trudne"
          >
            Hard mode - INF.03
          </Link>
          <CollectionAccordion>
            <CollectionManager
              title="INF.02"
              storageKey="questions_inf02_hard"
              table="inf02"
            />
            <CollectionManager
              title="INF.03"
              storageKey="questions_inf03_hard"
              table="inf03"
            />
          </CollectionAccordion>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <SmileIcon className="text-positive-light h-full aspect-square" />
            <h2 className="text-2xl font-bold">Łatwe pytania</h2>
          </div>
          <p className="leading-6">
            Pytania zawarte w kolekcji łatwych pytań nie pojawiają się w trybie jednego
            pytania.
          </p>
          <CollectionAccordion>
            <CollectionManager
              title="INF.02"
              storageKey="questions_inf02_easy"
              table="inf02"
            />
            <CollectionManager
              title="INF.03"
              storageKey="questions_inf03_easy"
              table="inf03"
            />
          </CollectionAccordion>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <FileClock className="text-accent-purple h-full aspect-square" />
            <h2 className="text-2xl font-bold">Historia egzaminów</h2>
          </div>
          <p className="leading-6">
            Poniżej znajduje się lista 5 ostatnio wykonanych przez ciebie egzaminów. W
            skład danych o egzaminie wchodzi kwalifikacja egzaminu, data wykonania oraz
            liczba poprawnych i niepoprawnych odpowiedzi.
          </p>
          <ExamHistory />
        </Card>
      </main>
    </>
  )
}
