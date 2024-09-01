import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto leading-relaxed [&>ul>li]:my-4 [&>p]:my-4 [&>h2]:text-2xl [&>h2]:font-semibold">
      <h1 className="text-4xl font-bold text-center">Polityka Prywatności</h1>
      <div className="my-4 p-4 bg-primary/40 rounded-md border border-primary [&>p]:my-2">
        <p className="font-semibold">W skrócie:</p>
        <p>
          Kontakt mailowy pod adresem{' '}
          <Link className="text-accent underline" href="mailto:maciej.krol11@op.pl">
            maciej.krol11@op.pl
          </Link>
        </p>
        <p>
          Korzystamy z narzędzi analitycznych{' '}
          <Link href="https://plausible.io/privacy" className="text-accent underline">
            Plausible
          </Link>{' '}
          które szanują prywatność, nie wykorzystują ciasteczek oraz są zgodne z RODO
        </p>
        <p>
          Dane użytkowników są przechowywane w zewnętrznej usłudze{' '}
          <Link href="https://supabase.com/privacy" className="text-accent underline">
            Supabase
          </Link>
        </p>
        <p>
          Kod strony jest dostępny dla wszystkich w serwisie{' '}
          <Link
            href="https://github.com/maciejkrol18/teoriainformatyk"
            className="text-accent underline"
          >
            GitHub
          </Link>{' '}
          i jest udostępniany na licencji{' '}
          <Link
            href="https://github.com/maciejkrol18/teoriainformatyk/blob/main/LICENSE.md"
            className="text-accent underline"
          >
            MIT
          </Link>
        </p>
      </div>
      <p className="uppercase">
        Strona jest dostarczana „tak jak jest”, bez jakiejkolwiek gwarancji, wyraźnej lub
        dorozumianych, w tym między innymi gwarancji przydatności handlowej, przydatności
        do określonego celu i nienaruszania praw. W żadnym wypadku autorzy lub posiadacze
        praw autorskich nie ponoszą odpowiedzialności za jakiekolwiek roszczenia, szkody
        lub inne odpowiedzialność, czy to z tytułu umowy, czynu niedozwolonego lub w inny
        sposób, wynikającą z, z lub w związku z oprogramowaniem lub użytkowaniem lub
        innymi transakcjami dotyczącymi oprogramowaniem.
      </p>
      <p>
        Poniższa Polityka Prywatności określa{' '}
        <strong>
          zasady zapisywania i uzyskiwania dostępu do danych na Urządzeniach Użytkowników
        </strong>{' '}
        korzystających z Serwisu do celów świadczenia usług drogą elektroniczną przez
        Administratora oraz{' '}
        <strong>zasady gromadzenia i przetwarzania danych osobowych Użytkowników</strong>,
        które zostały podane przez nich osobiście i dobrowolnie za pośrednictwem narzędzi
        dostępnych w Serwisie.
      </p>
      <h2>§1 Definicje</h2>
      <ul>
        <li>
          <p>
            <strong>Serwis</strong> - serwis internetowy "teoriainformatyk" działający pod
            adresem{' '}
            <Link className="text-accent underline" href="https://teoriainformatyk.pl">
              https://teoriainformatyk.pl
            </Link>
          </p>
        </li>
        <li>
          <p>
            <strong>Serwis zewnętrzny</strong> - serwisy internetowe partnerów,
            usługodawców lub usługobiorców współpracujących z Administratorem
          </p>
        </li>
        <li>
          <p>
            <strong>Administrator Serwisu / Danych</strong> - Administratorem Serwisu oraz
            Administratorem Danych (dalej Administrator) jest osoba fizyczna "Maciej Król"
            (
            <Link
              href="https://github.com/maciejkrol18"
              className="text-accent underline"
            >
              GitHub
            </Link>
            ) świadcząca usługi drogą elektroniczną za pośrednictwem Serwisu
          </p>
        </li>
        <li>
          <p>
            <strong>Użytkownik</strong> - osoba fizyczna, dla której Administrator
            świadczy usługi drogą elektroniczną za pośrednictwem Serwisu.
          </p>
        </li>
        <li>
          <p>
            <strong>Urządzenie</strong> - elektroniczne urządzenie wraz z oprogramowaniem,
            za pośrednictwem którego Użytkownik uzyskuje dostęp do Serwisu
          </p>
        </li>
        <li>
          <p>
            <strong>Cookies (ciasteczka)</strong> - dane tekstowe gromadzone w formie
            plików zamieszczanych na Urządzeniu Użytkownika
          </p>
        </li>
        <li>
          <p>
            <strong>RODO</strong> - Rozporządzenie Parlamentu Europejskiego i Rady (UE)
            2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w
            związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu
            takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o
            ochronie danych){' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Dane osobowe</strong> - oznaczają informacje o zidentyfikowanej lub
            możliwej do zidentyfikowania osobie fizycznej („osobie, której dane dotyczą”);
            możliwa do zidentyfikowania osoba fizyczna to osoba, którą można bezpośrednio
            lub pośrednio zidentyfikować, w szczególności na podstawie identyfikatora
            takiego jak imię i nazwisko, numer identyfikacyjny, dane o lokalizacji,
            identyfikator internetowy lub jeden bądź kilka szczególnych czynników
            określających fizyczną, fizjologiczną, genetyczną, psychiczną, ekonomiczną,
            kulturową lub społeczną tożsamość osoby fizycznej{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Przetwarzanie</strong> - oznacza operację lub zestaw operacji
            wykonywanych na danych osobowych lub zestawach danych osobowych w sposób
            zautomatyzowany lub niezautomatyzowany, taką jak zbieranie, utrwalanie,
            organizowanie, porządkowanie, przechowywanie, adaptowanie lub modyfikowanie,
            pobieranie, przeglądanie, wykorzystywanie, ujawnianie poprzez przesłanie,
            rozpowszechnianie lub innego rodzaju udostępnianie, dopasowywanie lub
            łączenie, ograniczanie, usuwanie lub niszczenie;{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Ograniczenie przetwarzania</strong> - oznacza oznaczenie
            przechowywanych danych osobowych w celu ograniczenia ich przyszłego
            przetwarzania{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Profilowanie</strong> - oznacza dowolną formę zautomatyzowanego
            przetwarzania danych osobowych, które polega na wykorzystaniu danych osobowych
            do oceny niektórych czynników osobowych osoby fizycznej, w szczególności do
            analizy lub prognozy aspektów dotyczących efektów pracy tej osoby fizycznej,
            jej sytuacji ekonomicznej, zdrowia, osobistych preferencji, zainteresowań,
            wiarygodności, zachowania, lokalizacji lub przemieszczania się{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Zgoda</strong> - zgoda osoby, której dane dotyczą oznacza dobrowolne,
            konkretne, świadome i jednoznaczne okazanie woli, którym osoba, której dane
            dotyczą, w formie oświadczenia lub wyraźnego działania potwierdzającego,
            przyzwala na przetwarzanie dotyczących jej danych osobowych{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Naruszenie ochrony danych osobowych</strong> - oznacza naruszenie
            bezpieczeństwa prowadzące do przypadkowego lub niezgodnego z prawem
            zniszczenia, utracenia, zmodyfikowania, nieuprawnionego ujawnienia lub
            nieuprawnionego dostępu do danych osobowych przesyłanych, przechowywanych lub
            w inny sposób przetwarzanych{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Pseudonimizacja</strong> - oznacza przetworzenie danych osobowych w
            taki sposób, by nie można ich było już przypisać konkretnej osobie, której
            dane dotyczą, bez użycia dodatkowych informacji, pod warunkiem że takie
            dodatkowe informacje są przechowywane osobno i są objęte środkami technicznymi
            i organizacyjnymi uniemożliwiającymi ich przypisanie zidentyfikowanej lub
            możliwej do zidentyfikowania osobie fizycznej{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Anonimizacja</strong> - Anonimizacja danych to nieodwracalny proces
            operacji na danych, który niszczy / nadpisuje "dane osobowe" uniemożliwiając
            identyfikację, lub powiązanie danego rekordu z konkretnym użytkownikiem lub
            osobą fizyczną.
          </p>
        </li>
      </ul>
      <h2>§2 Inspektor Ochrony Danych</h2>
      <p>
        Na podstawie Art. 37 RODO, Administrator nie powołał Inspektora Ochrony Danych.
      </p>
      <p>
        W sprawach dotyczących przetwarzania danych, w tym danych osobowych, należy
        kontaktować się bezpośrednio z Administratorem.
      </p>
      <h2>§3 Rodzaje Plików Cookies</h2>
      <ul>
        <li>
          <p>
            <strong>Cookies wewnętrzne</strong> - pliki zamieszczane i odczytywane z
            Urządzenia Użytkownika przez system teleinformatyczny Serwisu
          </p>
        </li>
        <li>
          <p>
            <strong>Cookies zewnętrzne</strong> - pliki zamieszczane i odczytywane z
            Urządzenia Użytkownika przez systemy teleinformatyczne Serwisów zewnętrznych.
            Skrypty Serwisów zewnętrznych, które mogą umieszczać pliki Cookies na
            Urządzeniach Użytkownika zostały świadomie umieszczone w Serwisie poprzez
            skrypty i usługi udostępnione i zainstalowane w Serwisie{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Cookies sesyjne</strong> - pliki zamieszczane i odczytywane z
            Urządzenia Użytkownika przez Serwis{' '}
            <span id="sz1">lub Serwisy zewnętrzne</span> podczas jednej sesji danego
            Urządzenia. Po zakończeniu sesji pliki są usuwane z Urządzenia Użytkownika.
          </p>
        </li>
        <li>
          <p>
            <strong>Cookies trwałe</strong> - pliki zamieszczane i odczytywane z
            Urządzenia Użytkownika przez Serwis{' '}
            <span id="sz2">lub Serwisy zewnętrzne</span> do momentu ich ręcznego
            usunięcia. Pliki nie są usuwane automatycznie po zakończeniu sesji Urządzenia
            chyba że konfiguracja Urządzenia Użytkownika jest ustawiona na tryb usuwanie
            plików Cookie po zakończeniu sesji Urządzenia.
          </p>
        </li>
      </ul>
      <h2>§4 Bezpieczeństwo składowania danych</h2>
      <ul>
        <li>
          <p>
            <strong>Mechanizmy składowania i odczytu plików Cookie</strong> - Mechanizmy
            składowania, odczytu i wymiany danych pomiędzy Plikami Cookies zapisywanymi na
            Urządzeniu Użytkownika a Serwisem są realizowane poprzez wbudowane mechanizmy
            przeglądarek internetowych i nie pozwalają na pobieranie innych danych z
            Urządzenia Użytkownika lub danych innych witryn internetowych, które odwiedzał
            Użytkownik, w tym danych osobowych ani informacji poufnych. Przeniesienie na
            Urządzenie Użytkownika wirusów, koni trojańskich oraz innych robaków jest
            także praktycznie niemożliwe.
          </p>
        </li>
        <li>
          <p>
            <strong>Cookie wewnętrzne</strong> - zastosowane przez Administratora pliki
            Cookie są bezpieczne dla Urządzeń Użytkowników i nie zawierają skryptów,
            treści lub informacji mogących zagrażać bezpieczeństwu danych osobowych lub
            bezpieczeństwu Urządzenia z którego korzysta Użytkownik.
          </p>
        </li>
        <li>
          <p>
            <strong>Cookie zewnętrzne</strong> - Administrator dokonuje wszelkich
            możliwych działań w celu weryfikacji i doboru partnerów serwisu w kontekście
            bezpieczeństwa Użytkowników. Administrator do współpracy dobiera znanych,
            dużych partnerów o globalnym zaufaniu społecznym. Nie posiada on jednak pełnej
            kontroli nad zawartością plików Cookie pochodzących od zewnętrznych partnerów.
            Za bezpieczeństwo plików Cookie, ich zawartość oraz zgodne z licencją
            wykorzystanie przez zainstalowane w serwisie Skrypty, pochodzących z Serwisów
            zewnętrznych, Administrator nie ponosi odpowiedzialności na tyle na ile
            pozwala na to prawo. Lista partnerów zamieszczona jest w dalszej części
            Polityki Prywatności.
          </p>
        </li>
        <li>
          <p>
            <strong>Kontrola plików Cookie</strong>
            <ul>
              <li>
                <p>
                  Użytkownik może w dowolnym momencie, samodzielnie zmienić ustawienia
                  dotyczące zapisywania, usuwania oraz dostępu do danych zapisanych plików
                  Cookies przez każdą witrynę internetową
                </p>
              </li>
              <li>
                <p>
                  Informacje o sposobie wyłączenia plików Cookie w najpopularniejszych
                  przeglądarkach komputerowych dostępne są na stronie:{' '}
                  <a
                    rel="external"
                    href="https://nety.pl/jak-wylaczyc-pliki-cookie/"
                    className="text-accent underline"
                  >
                    jak wyłączyć cookie
                  </a>{' '}
                  lub u jednego ze wskazanych dostawców:
                  <ul className="[&>li]:my-2 pl-2">
                    <li>
                      <a
                        rel="nofollow external"
                        className="text-accent underline"
                        href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&#038;hl=pl"
                      >
                        Zarządzanie plikami cookies w przeglądarce <strong>Chrome</strong>
                      </a>
                    </li>
                    <li>
                      <a
                        rel="nofollow external"
                        className="text-accent underline"
                        href="https://help.opera.com/pl/latest/web-preferences/"
                      >
                        Zarządzanie plikami cookies w przeglądarce <strong>Opera</strong>
                      </a>
                    </li>
                    <li>
                      <a
                        rel="nofollow external"
                        className="text-accent underline"
                        href="https://support.mozilla.org/pl/kb/blokowanie-ciasteczek"
                      >
                        Zarządzanie plikami cookies w przeglądarce{' '}
                        <strong>Firefox</strong>
                      </a>
                    </li>
                    <li>
                      <a
                        rel="nofollow external"
                        className="text-accent underline"
                        href="https://support.microsoft.com/pl-pl/help/4027947/microsoft-edge-delete-cookies"
                      >
                        Zarządzanie plikami cookies w przeglądarce <strong>Edge</strong>
                      </a>
                    </li>
                    <li>
                      <a
                        rel="nofollow external"
                        className="text-accent underline"
                        href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac"
                      >
                        Zarządzanie plikami cookies w przeglądarce <strong>Safari</strong>
                      </a>
                    </li>
                    <li>
                      <a
                        rel="nofollow external"
                        className="text-accent underline"
                        href="https://windows.microsoft.com/pl-pl/internet-explorer/delete-manage-cookies#ie=ie-11"
                      >
                        Zarządzanie plikami cookies w przeglądarce{' '}
                        <strong>Internet Explorer 11</strong>
                      </a>
                    </li>
                  </ul>
                </p>
              </li>
              <li>
                <p>
                  Użytkownik może w dowolnym momencie usunąć wszelkie zapisane do tej pory
                  pliki Cookie korzystając z narzędzi Urządzenia Użytkownika, za
                  pośrednictwem którego Użytkownik korzysta z usług Serwisu.
                </p>
              </li>
            </ul>
          </p>
        </li>
        <li>
          <p>
            <strong>Zagrożenia po stronie Użytkownika </strong> - Administrator stosuje
            wszelkie możliwe środki techniczne w celu zapewnienia bezpieczeństwa danych
            umieszczanych w plikach Cookie. Należy jednak zwrócić uwagę, że zapewnienie
            bezpieczeństwa tych danych zależy od obu stron w tym działalności Użytkownika.
            Administrator nie bierze odpowiedzialności za przechwycenie tych danych,
            podszycie się pod sesję Użytkownika lub ich usunięcie, na skutek świadomej lub
            nieświadomej działalność Użytkownika, wirusów, koni trojańskich i innego
            oprogramowania szpiegującego, którymi może jest lub było zainfekowane
            Urządzenie Użytkownika. Użytkownicy w celu zabezpieczenia się przed tymi
            zagrożeniami powinni stosować się do{' '}
            <a
              rel="external"
              href="https://nety.pl/cyberbezpieczenstwo/"
              className="text-accent underline"
            >
              zaleceń korzystania z sieci
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Przechowywanie danych osobowych</strong> - Administrator zapewnia, że
            dokonuje wszelkich starań, by przetwarzane dane osobowe wprowadzone
            dobrowolnie przez Użytkowników były bezpieczne, dostęp do nich był ograniczony
            i realizowany zgodnie z ich przeznaczeniem i celami przetwarzania.
            Administrator zapewnia także, że dokonuje wszelkich starań w celu
            zabezpieczenia posiadanych danych przed ich utratą, poprzez stosowanie
            odpowiednich zabezpieczeń fizycznych jak i organizacyjnych.
          </p>
        </li>
        <li>
          <p>
            <strong>Przechowywanie haseł</strong> - Administrator oświadcza, że hasła
            przechowywane są w zaszyfrowanej postaci, używając najnowszych standardów i
            wytycznych w tym zakresie. Deszyfracja podawanych w Serwisie haseł dostępu do
            konta jest praktycznie niemożliwa.
          </p>
        </li>
      </ul>
      <h2>§5 Cele do których wykorzystywane są pliki Cookie</h2>
      <ul id="cele">
        <li>Usprawnienie i ułatwienie dostępu do Serwisu</li>
        <li>Personalizacja Serwisu dla Użytkowników</li>
        <li>Umożliwienie Logowania do serwisu</li>
        <li>
          Prowadzenie statystyk (użytkowników, ilości odwiedzin, rodzajów urządzeń, łącze
          itp.)
        </li>
        <li>Serwowanie usług multimedialnych</li>
        <li>Świadczenie usług społecznościowych</li>
      </ul>
      <h2>§6 Cele przetwarzania danych osobowych</h2>
      <p>
        Dane osobowe dobrowolnie podane przez Użytkowników są przetwarzane w jednym z
        następujących celów:
      </p>
      <ul>
        <li>
          Realizacji usług elektronicznych:
          <ul>
            <li>
              Usługi rejestracji i utrzymania konta Użytkownika w Serwisie i
              funkcjonalności z nim związanych
            </li>
          </ul>
        </li>
        <li>
          Komunikacji Administratora z Użytkownikami w sprawach związanych z Serwisem oraz
          ochrony danych
        </li>
        <li>Zapewnienia prawnie uzasadnionego interesu Administratora</li>
      </ul>
      <p>
        Dane o Użytkownikach gromadzone anonimowo i automatycznie są przetwarzane w jednym
        z następujących celów:
      </p>
      <ul>
        <li>Prowadzenie statystyk</li>
        <li>Zapewnienia prawnie uzasadnionego interesu Administratora</li>
      </ul>
      <h2>§7 Pliki Cookies Serwisów zewnętrznych</h2>
      <p id="zewinfo">
        Administrator w Serwisie wykorzystuje skrypty javascript i komponenty webowe
        partnerów, którzy mogą umieszczać własne pliki cookies na Urządzeniu Użytkownika.
        Pamiętaj, że w ustawieniach swojej przeglądarki możesz sam decydować o dozwolonych
        plikach cookies jakie mogą być używane przez poszczególne witryny internetowe.
        Poniżej znajduje się lista partnerów lub ich usług zaimplementowanych w Serwisie,
        mogących umieszczać pliki cookies:{' '}
      </p>
      <ul id="zewnetrzne">
        <li>
          <strong>Usługi społecznościowe / łączone:</strong>
          <br />
          (Rejestracja, Logowanie, udostępnianie treści, komunikacja, itp.)
          <br />
          <ul>
            <li>
              <a
                rel="nofollow external"
                href="https://policies.google.com/privacy?hl=pl"
                className="text-accent underline"
              >
                Google
              </a>
              <br />
              <a
                rel="nofollow external"
                href="https://discord.com/privacy"
                className="text-accent underline"
              >
                Discord
              </a>
            </li>
          </ul>
        </li>
        <li>
          <strong>Prowadzenie statystyk:</strong>
          <ul>
            <li>
              <a
                rel="nofollow external"
                href="https://plausible.io/privacy"
                className="text-accent underline"
              >
                Plausible
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <p>
        Usługi świadczone przez podmioty trzecie są poza kontrolą Administratora. Podmioty
        te mogą w każdej chwili zmienić swoje warunki świadczenia usług, polityki
        prywatności, cel przetwarzania danych oraz sposów wykorzystywania plików cookie.
      </p>
      <h2>§8 Rodzaje gromadzonych danych</h2>
      <p>
        Serwis gromadzi dane o Użytkownikach. Cześć danych jest gromadzona automatycznie i
        anonimowo, a część danych to dane osobowe podane dobrowolnie przez Użytkowników w
        trakcie zapisywania się do poszczególnych usług oferowanych przez Serwis.
      </p>
      <p>
        <strong>Anonimowe dane gromadzone automatycznie:</strong>
      </p>
      <ul>
        <li>Adres IP</li>
        <li>Typ przeglądarki</li>
        <li>Rodzaj systemu operacyjnego</li>
        <li>Język przeglądarki</li>
      </ul>
      <p>
        <strong>Dane gromadzone podczas rejestracji:</strong>
      </p>
      <ul>
        <li>Imię / nazwisko / pseudonim</li>
        <li>Adres e-mail</li>
        <li>Avatar / Zdjęcie profilowe</li>
        <li>Adres IP (zbierane automatycznie)</li>
      </ul>
      <p>
        Część danych (bez danych identyfikujących) może być przechowywana w plikach
        cookies. Cześć danych (bez danych identyfikujących) może być przekazywana do
        dostawcy usług statystycznych.
      </p>
      <h2>§9 Dostęp do danych osobowych przez podmioty trzecie</h2>
      <p>
        Co do zasady jedynym odbiorcą danych osobowych podawanych przez Użytkowników jest
        Administrator. Dane gromadzone w ramach świadczonych usług nie są przekazywane ani
        odsprzedawane podmiotom trzecim.
      </p>
      <p>
        Dostęp do danych (najczęściej na podstawie Umowy powierzenia przetwarzania danych)
        mogą posiadać podmioty, odpowiedzialne za utrzymania infrastruktury i usług
        niezbędnych do prowadzenia serwisu tj.:
      </p>
      <ul>
        <li>
          Firmy hostingowe, świadczące usługi hostingu lub usług pokrewnych dla
          Administratora
        </li>
        <li>
          Firmy serwisowe i wsparcia IT dokonujące konserwacji lub odpowiedzialne za
          utrzymanie infrastruktury IT
        </li>
      </ul>
      <p>
        <strong>
          Powierzenie przetwarzania danych osobowych - Usługi Hostingu, VPS lub Serwerów
          Dedykowanych
        </strong>
      </p>
      <p>
        Administrator w celu prowadzenia serwisu korzysta z usług zewnętrznego dostawcy
        hostingu, VPS lub Serwerów Dedykowanych -{' '}
        <strong>
          <a
            rel="nofollow external"
            href="https://panel.skillhost.pl/uploads/regulaminy/polityka-prywatnosci%202023-01-09.pdf"
            className="text-accent underline"
          >
            SkillHost VPS
          </a>
        </strong>
        . Istnieje możliwość dostępu do danych wskutek prac serwisowych realizowanych
        przez personel usługodawcy. Dostęp do tych danych reguluje umowa zawarta pomiędzy
        Administratorem a Usługodawcą.
      </p>
      <br />
      <p>
        <strong>
          Powierzenie przetwarzania danych osobowych - Usługi obsługi serwisu www
        </strong>
      </p>
      <p>
        Administrator w celu obsługi serwisu korzysta z usług zewnętrznego dostawcy usług
        -{' '}
        <strong>
          <a
            rel="nofollow external"
            href="https://supabase.com/privacy"
            className="text-accent underline"
          >
            Supabase
          </a>
        </strong>
        . Personel wskazanego podmiotu ma dostęp do danych wprowadzonych przez
        użytkowników podczas rejestracji i edycji konta użytkownika. Dostęp do tych danych
        reguluje umowa zawarta pomiędzy Administratorem a Usługodawcą.
      </p>
      <br />
      <h2>§10 Sposób przetwarzania danych osobowych</h2>
      <p>
        <strong>Dane osobowe podane dobrowolnie przez Użytkowników:</strong>
      </p>
      <ul>
        <li>
          Dane osobowe są przekazywane poza Unię Europejską.
          <br />
          Przekazanie danych pozo UE jest spowodowane korzystaniem z usług podmiotów
          zlokalizowanych poza granicami UE, lub w wyniku opublikowania na skutek
          indywidualnego działania Użytkownika (np. wprowadzenie komentarza lub wpisu), co
          sprawi, że dane będą dostępne dla każdej osoby odwiedzającej serwis.
          <br />W przypadku przekazania lub powierzenia przetwarzania danych osobowych
          poza granicami UE, dane te są przetwarzana na podstawie umowy zawartej pomiędzy
          Administratorem a Usługodawcą.
        </li>
        <li>
          Dane osobowe nie będą wykorzystywane do zautomatyzowanego podejmowania decyzji
          (profilowania).
        </li>
        <li>Dane osobowe nie będą odsprzedawane podmiotom trzecim.</li>
      </ul>
      <p>
        <strong>Dane anonimowe (bez danych osobowych) gromadzone automatycznie:</strong>
      </p>
      <ul>
        <li>
          Dane anonimiwe (bez danych osobowych) będą przekazywane poza Unię Europejską.
        </li>
        <li>
          Dane anonimiwe (bez danych osobowych) nie będą wykorzystywane do
          zautomatyzowanego podejmowania decyzji (profilowania).
        </li>
        <li>
          Dane anonimiwe (bez danych osobowych) nie będą odsprzedawane podmiotom trzecim.
        </li>
      </ul>
      <h2>§11 Podstawy prawne przetwarzania danych osobowych</h2>
      <p>Serwis gromadzi i przetwarza dane Użytkowników na podstawie:</p>
      <ul>
        <li>
          Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia
          2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
          osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia
          dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych)
          <ul>
            <li>
              art. 6 ust. 1 lit. a<br />
              <small>
                osoba, której dane dotyczą wyraziła zgodę na przetwarzanie swoich danych
                osobowych w jednym lub większej liczbie określonych celów
              </small>
            </li>
            <li>
              art. 6 ust. 1 lit. b<br />
              <small>
                przetwarzanie jest niezbędne do wykonania umowy, której stroną jest osoba,
                której dane dotyczą, lub do podjęcia działań na żądanie osoby, której dane
                dotyczą, przed zawarciem umowy
              </small>
            </li>
            <li>
              art. 6 ust. 1 lit. f<br />
              <small>
                przetwarzanie jest niezbędne do celów wynikających z prawnie uzasadnionych
                interesów realizowanych przez administratora lub przez stronę trzecią
              </small>
            </li>
          </ul>
        </li>
        <li>
          Ustawa z dnia 10 maja 2018 r. o ochronie danych osobowych (Dz.U. 2018 poz. 1000)
        </li>
        <li>
          Ustawa z dnia 16 lipca 2004 r. Prawo telekomunikacyjne (Dz.U. 2004 nr 171 poz.
          1800)
        </li>
        <li>
          Ustawa z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych (Dz. U.
          1994 Nr 24 poz. 83)
        </li>
      </ul>
      <h2>§12 Okres przetwarzania danych osobowych</h2>
      <p>
        <strong>Dane osobowe podane dobrowolnie przez Użytkowników:</strong>
      </p>
      <p>
        Co do zasady wskazane dane osobowe są przechowywane wyłącznie przez okres
        świadczenia Usługi w ramach Serwisu przez Administratora. Są one usuwane lub
        anonimizowane w okresie do 30 dni od chwili zakończenia świadczenia usług (np.
        usunięcie zarejestrowanego konta użytkownika, wypisanie z listy Newsletter, itp.)
      </p>
      <p>
        Wyjątek stanowi sytuacja, która wymaga zabezpieczenia prawnie uzasadnionych celów
        dalszego przetwarzania tych danych przez Administratora. W takiej sytuacji
        Administrator będzie przechowywał wskazane dane, od czasu żądania ich usunięcia
        przez Użytkownika, nie dłużej niż przez okres 3 lat w przypadku naruszenia lub
        podejrzenia naruszenia zapisów regulaminu serwisu przez Użytkownika
      </p>
      <p>
        <strong>Dane anonimowe (bez danych osobowych) gromadzone automatycznie:</strong>
      </p>
      <p>
        Anonimowe dane statystyczne, niestanowiące danych osobowych, są przechowywane
        przez Administratora w celu prowadzenia statystyk serwisu przez czas nieoznaczony
      </p>
      <h2>§13 Prawa Użytkowników związane z przetwarzaniem danych osobowych</h2>
      <p>Serwis gromadzi i przetwarza dane Użytkowników na podstawie:</p>
      <ul>
        <li>
          <p>
            <strong>Prawo dostępu do danych osobowych</strong>
            <br />
            Użytkownikom przysługuje prawo uzyskania dostępu do swoich danych osobowych,
            realizowane na żądanie złożone do Administratora
          </p>
        </li>
        <li>
          <p>
            <strong>Prawo do sprostowania danych osobowych</strong>
            <br />
            Użytkownikom przysługuje prawo żądania od Administratora niezwłocznego
            sprostowania danych osobowych, które są nieprawidłowe lub / oraz uzupełnienia
            niekompletnych danych osobowych, realizowane na żądanie złożone do
            Administratora
          </p>
        </li>
        <li>
          <p>
            <strong>Prawo do usunięcia danych osobowych</strong>
            <br />
            Użytkownikom przysługuje prawo żądania od Administratora niezwłocznego
            usunięcia danych osobowych, realizowane na żądanie złożone do AdministratoraW
            przypadku kont użytkowników, usunięcie danych polega na anonimizacji danych
            umożliwiających identyfikację Użytkownika. Administrator zastrzega sobie prawo
            wstrzymania realizacji żądania usunięcia danych w celu ochrony prawnie
            uzasadnionego interesu Administratora (np. w gdy Użytkownik dopuścił się
            naruszenia Regulaminu czy dane zostały pozyskane wskutek prowadzonej
            korespondencji).
            <br />W przypadku usługi Newsletter, Użytkownik ma możliwość samodzielnego
            usunięcia swoich danych osobowych korzystając z odnośnika umieszczonego w
            każdej przesyłanej wiadomości e-mail.
          </p>
        </li>
        <li>
          <p>
            <strong>Prawo do ograniczenia przetwarzania danych osobowych</strong>
            <br />
            Użytkownikom przysługuje prawo ograniczenia przetwarzania danych osobowych w
            przypadkach wskazanych w art. 18 RODO, m.in. kwestionowania prawidłowość
            danych osobowych, realizowane na żądanie złożone do Administratora
          </p>
        </li>
        <li>
          <p>
            <strong>Prawo do przenoszenia danych osobowych</strong>
            <br />
            Użytkownikom przysługuje prawo uzyskania od Administratora, danych osobowych
            dotyczących Użytkownika w ustrukturyzowanym, powszechnie używanym formacie
            nadającym się do odczytu maszynowego, realizowane na żądanie złożone do
            Administratora
          </p>
        </li>
        <li>
          <p>
            <strong>
              Prawo wniesienia sprzeciwu wobec przetwarzania danych osobowych
            </strong>
            <br />
            Użytkownikom przysługuje prawo wniesienia sprzeciwu wobec przetwarzania jego
            danych osobowych w przypadkach określonych w art. 21 RODO, realizowane na
            żądanie złożone do Administratora
          </p>
        </li>
        <li>
          <p>
            <strong>Prawo wniesienia skargi</strong>
            <br />
            Użytkownikom przysługuje prawo wniesienia skargi do organu nadzorczego
            zajmującego się ochroną danych osobowych.
          </p>
        </li>
      </ul>
      <h2>§14 Kontakt do Administratora</h2>
      <p>Z Administratorem można skontaktować się w jeden z poniższych sposobów</p>
      <ul>
        <li>
          <p>
            <strong>Formularz kontaktowy</strong> - dostępny pod adresem:{' '}
            <Link
              href="https://teoriainformatyk.pl/contact"
              className="text-accent underline"
            >
              https://teoriainformatyk.pl/contact
            </Link>
          </p>
          <p>
            Adres email{' '}
            <Link className="text-accent underline" href="mailto:maciej.krol11@op.pl">
              maciej.krol11@op.pl
            </Link>
          </p>
        </li>
      </ul>
      <h2>§15 Wymagania Serwisu</h2>
      <ul>
        <li>
          <p>
            Ograniczenie zapisu i dostępu do plików Cookie na Urządzeniu Użytkownika może
            spowodować nieprawidłowe działanie niektórych funkcji Serwisu.
          </p>
        </li>
        <li>
          <p>
            Administrator nie ponosi żadnej odpowiedzialności za nieprawidłowo działające
            funkcje Serwisu w przypadku gdy Użytkownik ograniczy w jakikolwiek sposób
            możliwość zapisywania i odczytu plików Cookie.
          </p>
        </li>
      </ul>
      <h2>§16 Linki zewnętrzne</h2>
      <p>
        W Serwisie - artykułach, postach, wpisach czy komentarzach Użytkowników mogą
        znajdować się odnośniki do witryn zewnętrznych, z którymi Właściciel serwisu nie
        współpracuje. Linki te oraz strony lub pliki pod nimi wskazane mogą być
        niebezpieczne dla Twojego Urządzenia lub stanowić zagrożenie bezpieczeństwa Twoich
        danych. Administrator nie ponosi odpowiedzialności za zawartość znajdującą się
        poza Serwisem.
      </p>
      <h2>§17 Zmiany w Polityce Prywatności</h2>
      <ul>
        <li>
          <p>
            Administrator zastrzega sobie prawo do dowolnej zmiany niniejszej Polityki
            Prywatności bez konieczności informowania o tym Użytkowników w zakresie
            stosowania i wykorzystywania danych anonimowych lub stosowania plików Cookie.
          </p>
        </li>
        <li>
          <p>
            Administrator zastrzega sobie prawo do dowolnej zmiany niniejszej Polityki
            Prywatności w zakresie przetwarzania Danych Osobowych, o czym poinformuje
            Użytkowników posiadających konta użytkownika lub zapisanych do usługi
            newsletter, za pośrednictwem poczty elektronicznej w terminie do 7 dni od
            zmiany zapisów. Dalsze korzystanie z usług oznacza zapoznanie się i akceptację
            wprowadzonych zmian Polityki Prywatności. W przypadku w którym Użytkownik nie
            będzie się zgadzał z wprowadzonymi zmianami, ma obowiązek usunąć swoje konto z
            Serwisu lub wypisać się z usługi Newsletter.
          </p>
        </li>
        <li>
          <p>
            Wprowadzone zmiany w Polityce Prywatności będą publikowane na tej podstronie
            Serwisu.
          </p>
        </li>
        <li>
          <p>Wprowadzone zmiany wchodzą w życie z chwilą ich publikacji.</p>
        </li>
      </ul>
    </article>
  )
}
