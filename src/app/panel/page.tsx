import Card from "@/components/Card"
import CollectionManager from "@/components/CollectionManager"
import { FileClock, SkullIcon, SmileIcon } from "lucide-react"

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center py-12">
        <span className="uppercase text-transparent text-xl font-bold bg-clip-text bg-gradient-accent animate-moving-gradient">
          Panel użytkownika
        </span>
        <h1 className="text-2xl font-bold">Twoje lokalne dane</h1>
      </div>
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
            Kolekcja trudnych pytań służy do rozpoczęcia specjalnego trybu jednego
            pytania/egzaminu w którym występują jedynie pytania z jej puli. Po rozwinięciu
            danej kolekcji dostępne jest edytowalne pole z ID pytań oddzielonymi po
            przecinku oraz lista pytań wraz z poprawnymi odpowiedziami.
          </p>
          <CollectionManager collectionType="hard" />
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <SmileIcon className="text-positive-light h-full aspect-square" />
            <h2 className="text-2xl font-bold">Łatwe pytania</h2>
          </div>
          <p className="leading-6">
            Pytania zawarte w kolekcji łatwych pytań nie pojawiają się w obu dostępnych
            trybach. Po rozwinięciu danej kolekcji dostępne jest edytowalne pole z ID
            pytań oddzielonymi po przecinku oraz lista pytań wraz z poprawnymi
            odpowiedziami.
          </p>
          <CollectionManager collectionType="easy" />
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <FileClock className="text-accent-purple h-full aspect-square" />
            <h2 className="text-2xl font-bold">Historia egzaminów</h2>
          </div>
          <p className="leading-6">
            Poniżej znajduje się lista 10 ostatnio wykonanych przez ciebie egzaminów. W
            skład danych o egzaminie wchodzi data wykonania, liczba poprawnych i
            niepoprawnych odpowiedzi oraz procentowy wynik.
          </p>
        </Card>
      </main>
    </>
  )
}
