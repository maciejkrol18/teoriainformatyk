import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrandLogo from "./brand-logo";
import { Button } from "./button";
import HeaderAuth from "./header-auth";
import MobileNavigation from "./mobile-navigation";
import ThemeSwitch from "./theme-switch";

export default async function Header() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <header className="py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <BrandLogo size="small" />
        </Link>
        <nav className="hidden lg:flex gap-8 py-2">
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/#inf03">INF.03/EE.09/EE.14</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/#inf02">INF.02/EE.08</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/search">Wyszukiwarka</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/hardest">Najtrudniejsze pytania</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <p>|</p>
          <div className="hidden lg:flex items-center">
            <HeaderAuth user={data.user} />
          </div>
          <div className="flex items-center lg:hidden">
            <MobileNavigation user={data.user} />
          </div>
        </div>
      </div>
    </header>
  );
}
