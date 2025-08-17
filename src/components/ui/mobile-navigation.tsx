"use client";

import Link from "next/link";
import { Button } from "./button";
import { createClient } from "@/lib/supabase/client";
import { Menu, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import ProfileBlock from "./profile-block";

interface MobileNavigationProps {
  user: User | null;
}

interface UserProfile {
  avatar_url: string;
  display_name: string;
  email: string;
}

export default function MobileNavigation({ user }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const wasProfileFetched = useRef<boolean>(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };

  const fetchProfile = async () => {
    if (user) {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, display_name, email")
        .eq("user_id", user.id)
        .single();

      if (!data || error) {
        return null;
      }

      setProfile(data);
      wasProfileFetched.current = true;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (wasProfileFetched.current) return;
    fetchProfile();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={toggleOpen}
        className="hover:cursor-pointer"
      >
        {isOpen ? <XCircle /> : <Menu />}
      </button>
      {isOpen ? (
        <nav className="bg-background z-50 fixed inset-0 top-[67px] flex flex-col gap-4 overflow-y-scroll p-4">
          <div className="border border-background-bright bg-background-bright/30 flex flex-col justify-center gap-4 p-4">
            {profile ? (
              <ProfileBlock profile={profile} />
            ) : (
              <Button
                variant="primary"
                asChild
                // MobileNavigation is not present in the auth layout so we need to set the overflow to auto manually
                // biome-ignore lint/suspicious/noAssignInExpressions: this is needed
                onClick={() => (document.body.style.overflow = "auto")}
              >
                <Link href="/login">Zaloguj</Link>
              </Button>
            )}
          </div>
          <Link
            href="/#inf02"
            className="text-xl pb-2"
            onClick={() => closeOnCurrent("/")}
          >
            INF.02/EE.08
          </Link>
          <Link
            href="/#inf03"
            className="text-xl pb-2"
            onClick={() => closeOnCurrent("/")}
          >
            INF.03/EE.09/E.14
          </Link>
          <Link
            href="/search"
            className="text-xl pb-2"
            onClick={() => closeOnCurrent("/search")}
          >
            Wyszukiwarka pytań
          </Link>
          <Link
            href="/hardest"
            className="text-xl pb-2"
            onClick={() => closeOnCurrent("/hardest")}
          >
            Najtrudniejsze pytania
          </Link>
          <Link
            href="/privacy"
            className="text-xl pb-2"
            onClick={() => closeOnCurrent("/privacy")}
          >
            Polityka prywatności
          </Link>
          <Link
            href="/contact"
            className="text-xl pb-2"
            onClick={() => closeOnCurrent("/contact")}
          >
            Formularz kontaktowy
          </Link>
          <Link
            href="https://buycoffee.to/maciejkrol"
            target="_blank"
            className="text-xl pb-2"
          >
            Darowizna
          </Link>
          <Link
            href="https://status.maciejkrol.dev/status/teoriainformatyk"
            target="_blank"
            className="text-xl pb-2"
          >
            Status usług
          </Link>
          <Link
            href="https://github.com/maciejkrol18/teoriainformatyk"
            target="_blank"
            className="text-xl pb-2"
          >
            Github
          </Link>
        </nav>
      ) : null}
    </>
  );
}
