import GamemodeBlock from './GamemodeBlock'
import GamemodesWrapper from './GamemodesWrapper'
import Section from '@/app/(hero)/Section'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import OneQuestionIcon from '@/public/one-question-icon.svg'
import ExamIcon from '@/public/exam-icon.svg'
import FlashcardsIcon from '@/public/flashcards-icon.svg'
import SqlTrainingIcon from '@/public/sql-training-icon.svg'
import HeroSearchBar from './HeroSearchBar'
import HeroCard from './HeroCard'
import { BarChart3, GalleryHorizontalEnd, History, SkullIcon, Users } from 'lucide-react'
export default function Home() {
  return (
    <>
      <section id="hero" className="flex min-h-[calc(100vh-72px)] bg-hero-blob">
        <div className="container mx-auto flex grow flex-col gap-8 items-center justify-center">
          <h1 className="font-display text-center text-4xl sm:text-5xl xl:text-7xl">
            Najlepsza powtórka
            <br />
            do teoretycznego
            <br />
            egzaminu zawodowego
          </h1>
          <div className="flex flex-col gap-4 text-center md:flex-row">
            <Button variant="primary" size="lg" asChild>
              <Link href="/#inf02">Zacznij powtarzać</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/#browser">Więcej</Link>
            </Button>
          </div>
        </div>
      </section>
      <p className="m-4 p-4 text-lg font-bold border border-red-800 bg-red-600 text-white text-center">
        <span className="uppercase">WAŻNE: </span>Strona jest publicznie dostępna w ramach
        testowania, ale wciąż jest rozwijana i nie jest w finałowym stanie. Istnieje
        możliwość resetu danych użytkowników.
      </p>
      <Section
        title="INF.02/EE.08"
        subtitle="Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych"
        id="inf02"
      >
        <GamemodesWrapper>
          <GamemodeBlock
            title="Jedno pytanie"
            subtitle="Nieskończenie losuj i rozwiązuj jedno pytanie z kwalifikacji INF.02"
            href="/one-question/inf02"
            imageSrc={OneQuestionIcon}
          />
          <GamemodeBlock
            title="Egzamin"
            subtitle="Rozwiąż losowy egzamin składający się z 40 pytań. Masz na to 60 minut"
            href="/exam/inf02"
            imageSrc={ExamIcon}
          />
          <GamemodeBlock
            title="Fiszki"
            subtitle="Powtarzaj wszystkie dostepne pytania w bazie danych kwalifikacji INF.02"
            href="/flashcards/inf02"
            imageSrc={FlashcardsIcon}
          />
        </GamemodesWrapper>
      </Section>
      <Section
        title="INF.03/EE.09/E.14"
        subtitle="Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych"
        id="inf03"
      >
        <GamemodesWrapper>
          <GamemodeBlock
            title="Jedno pytanie"
            subtitle="Nieskończenie losuj i rozwiązuj jedno pytanie z kwalifikacji INF.03"
            href="/one-question/inf03"
            imageSrc={OneQuestionIcon}
          />
          <GamemodeBlock
            title="Egzamin"
            subtitle="Rozwiąż losowy egzamin składający się z 40 pytań. Masz na to 60 minut"
            href="/exam/inf03"
            imageSrc={ExamIcon}
          />
          <GamemodeBlock
            title="Fiszki"
            subtitle="Powtarzaj wszystkie dostepne pytania w bazie danych kwalifikacji INF.03"
            href="/flashcards/inf03"
            imageSrc={FlashcardsIcon}
          />
          <GamemodeBlock
            title="Kwerendy SQL"
            subtitle="Przećwicz pisanie kwerend SQL na podstawie baz danych z dawnych arkuszy"
            href="/sql-training"
            imageSrc={SqlTrainingIcon}
          />
        </GamemodesWrapper>
      </Section>
      <Section
        title="Wyszukiwarka pytań"
        subtitle="Za pomocą naszej wyszukiwarki możesz odnaleźć dane pytanie i wszystko co z nim związane wyszukując jego treść. Sortuj swoje wyszukiwanie oraz filtruj je według kwalifikacj i załączonego obrazka "
        id="browser"
      >
        <HeroSearchBar />
        <p className="mt-2 text-sm text-muted text-center">Wciśnij Enter aby wyszukać</p>
      </Section>
      <Section
        title="Zostań użytkownikiem już dziś"
        subtitle="Zarejestruj się w naszym serwisie aby otrzymać poniższe korzyści"
        id="user"
      >
        <div className="grid gap-24 max-w-xl mx-auto grid-cols-1 sm:grid-cols-2">
          <HeroCard
            icon={<SkullIcon />}
            title="Zbiór trudnych pytań"
            description="Twoja osobista kolekcja pytań, do której możesz zapisywać pytania które są dla ciebie najcięższę do zapamiętania. Zbiór ten pozwala na włączenie specjalnego trybu jednego pytania, w którym pojawiają się jedynie pytania z puli zbioru. Ponadto, zalogowani użytkownicy mogą zobaczyć listę pytań najczęściej dodawanych do zbiorów wszystkich użytkowników"
          />
          <HeroCard
            icon={<GalleryHorizontalEnd />}
            title="Fiszki"
            description="Powtarzaj wszystkie dostępne pytania w dostępnych kwalifikacjach. Przerób każde z pytań jedno po drugim zapisując swój progres"
          />
          <HeroCard
            icon={<BarChart3 />}
            title="Statystyki"
            description="Sprawdź ilość poprawnych i niepoprawnych odpowiedzi w trybie jednego pytania oraz ilości przerobionych pytań w trybie fiszek z obu kwalifikacji"
          />
          <HeroCard
            icon={<History />}
            title="Historia egzaminów"
            description="Na głównej stronie panelu użytkownika znajdziesz 5 ostatnio wykonanych egzaminów, a na oddzielnej podstronie znajdziesz tabelę ze szczegółową historią z informacjami takimi jak data wykonania egzaminu, kwalifikacja, wynik procentowy, ilości odpowiedzi oraz ile czasu zajęło ci by rozwiązać egzamin"
          />
          <HeroCard
            className="sm:col-span-2"
            icon={<Users />}
            title="Najtrudniejsze pytania"
            description="Będąc użytkownikiem zyskujesz dostęp do podstrony z najtrudniejszymi pytaniami, która zawiera listę pytań najczęściej dodawanych do zbiorów trudnych pytań wśród wszystkich pozostałych użytkowników serwisu"
          />
        </div>
      </Section>
    </>
  )
}
