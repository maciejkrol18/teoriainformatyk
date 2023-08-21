"use client"
import Image from "next/image"
import ErrorImage from "@/public/logo-error.svg"
import Link from "next/link"

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center grow">
        <Image src={ErrorImage} alt="Error" width={256} height={256} />
        <h1 className="text-2xl font-bold">Ups! Wystąpił błąd</h1>
        <p className="text-center">
          W trakcie swojego działania aplikacja napotkała następujący błąd
        </p>
        <p className="text-danger-light">
          {error.name}: {error.message}
        </p>
        <div className="flex flex-col gap-2 text-center">
          <button
            className="py-2 px-4 bg-accent-purple font-semibold rounded-md"
            onClick={reset}
          >
            Spróbuj ponownie
          </button>
          <Link className="py-2 px-4 bg-accent-purple font-semibold rounded-md" href="/">
            Powrót na stronę główną
          </Link>
        </div>
      </div>
    </>
  )
}
