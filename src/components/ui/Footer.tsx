import Link from "next/link";
import BrandLogo from "./brand-logo";

export default function Footer() {
  return (
    <footer className="py-8 bg-background-light">
      <div className="flex flex-col gap-8 container mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div>
            <BrandLogo size="big" />
          </div>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">Powtarzaj</p>
              <Link href="/#inf02">INF.02/EE.08</Link>
              <Link href="/#inf03">INF.03/EE.09/E.14</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">Więcej</p>
              <Link href="/search">Wyszukiwarka pytań</Link>
              <Link href="/dashboard">Panel użytkownika</Link>
              <Link href="https://buycoffee.to/maciejkrol" target="_blank">
                Darowizna
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">Strona</p>
              <Link
                href="https://github.com/maciejkrol18/teoriainformatyk"
                target="_blank"
              >
                Github
              </Link>
              <Link
                href="https://status.maciejkrol.dev/status/teoriainformatyk"
                target="_blank"
              >
                Status usług
              </Link>
              <Link href="/contact">Kontakt</Link>
              <Link href="/privacy">Polityka prywatności</Link>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-background-bright" />
        <p>
          <span className="text-lg">&copy;</span> {new Date().getFullYear()}{" "}
          Maciej Król
        </p>
      </div>
    </footer>
  );
}
