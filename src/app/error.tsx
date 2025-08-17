"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/ui/brand-logo";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <>
      <div className="flex flex-col gap-8 justify-center items-center grow">
        <BrandLogo size="big" />
        <h1 className="text-3xl font-bold">Serwer napotkał błąd</h1>
        <p className="text-center text-lg">
          <span className="font-semibold">Błąd: </span>
          {error.message}
        </p>
        <div className="flex flex-col gap-4 text-center">
          <Button variant="primary" onClick={reset}>
            Spróbuj ponownie
          </Button>
          <Button>
            <Link href="/">Powrót na stronę główną</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
