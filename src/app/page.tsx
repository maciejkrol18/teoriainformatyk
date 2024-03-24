import GamemodeBlock from "@/components/hero/GamemodeBlock"
import GamemodesWrapper from "@/components/hero/GamemodesWrapper"
import Section from "@/components/hero/Section"
import { Button } from "@/components/ui/Button"
import SplineViewer from "@/components/ui/SplineViewer"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="flex flex-col md:flex-row gap-4 items-center justify-center min-h-[calc(100vh-72px)]"
      >
        <div className="flex flex-col gap-8 md:flex-1">
          <h1 className="font-display text-4xl text-left xl:text-6xl">
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
        <div className="md:flex-1">
          <SplineViewer url="https://prod.spline.design/BG0t78pRt-FK6v4x/scene.splinecode" />
        </div>
      </section>
      <Section
        title="INF.02/EE.08"
        subtitle="Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych"
        id="inf02"
      >
        <GamemodesWrapper>
          <GamemodeBlock
            squareClass="bg-yellow-500"
            title="Jedno pytanie"
            subtitle="Nieskończenie losuj i rozwiązuj jedno pytanie z kwalifikacji INF.02"
            href="/one-question/inf02"
          />
          <GamemodeBlock
            squareClass="bg-primary"
            title="Egzamin"
            subtitle="Rozwiąż losowy egzamin składający się z 40 pytań. Masz na to 60 minut"
            href="/exam/inf02"
          />
          <GamemodeBlock
            squareClass="bg-secondary"
            title="Fiszki"
            subtitle="Powtarzaj wszystkie dostepne pytania w bazie danych kwalifikacji INF.02"
            href="/flashcards/inf02"
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
            squareClass="bg-yellow-500"
            title="Jedno pytanie"
            subtitle="Nieskończenie losuj i rozwiązuj jedno pytanie z kwalifikacji INF.03"
            href="/one-question/inf03"
          />
          <GamemodeBlock
            squareClass="bg-primary"
            title="Egzamin"
            subtitle="Rozwiąż losowy egzamin składający się z 40 pytań. Masz na to 60 minut"
            href="/exam/inf03"
          />
          <GamemodeBlock
            squareClass="bg-secondary"
            title="Fiszki"
            subtitle="Powtarzaj wszystkie dostepne pytania w bazie danych kwalifikacji INF.03"
            href="/flashcards/inf03"
          />
          <GamemodeBlock
            squareClass="bg-accent"
            title="Kwerendy SQL"
            subtitle="Przećwicz pisanie kwerend SQL na podstawie baz danych z dawnych arkuszy"
            href="/sql-training"
          />
        </GamemodesWrapper>
      </Section>
      <Section
        title="Wyszukiwarka pytań"
        subtitle="Za pomocą naszej wyszukiwarki możesz odnaleźć dane pytanie i wszystko co z nim związane wyszukując jego treść"
        id="browser"
      ></Section>
      <Section
        title="Zostań użytkownikiem już dziś"
        subtitle="Zarejestruj się w naszym serwisie aby otrzymać poniższe korzyści"
        id="user"
      ></Section>
      <Section
        title="Wesprzyj rozwój strony"
        subtitle="Nasza strona jest w 100% darmowa a jej kod źródłowy jest dostępny dla wszystkich"
        id="donate"
      ></Section>
    </>
  )
}
