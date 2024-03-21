import Section from "@/components/hero/Section"

export default function Home() {
  return (
    <>
      <section id="hero" className="flex gap-4 items-center min-h-[calc(100vh-72px)]">
        <h1 className="font-display text-6xl">
          Najlepsza powtórka
          <br />
          do teoretycznego
          <br />
          egzaminu zawodowego
        </h1>
        <div>{/* Place for spline.design animation */}</div>
      </section>
      <Section
        title="INF.02/EE.08"
        subtitle="Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych"
        id="inf02"
      ></Section>
      <Section
        title="INF.03/EE.09/E.14"
        subtitle="Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych"
        id="inf03"
      ></Section>
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
