"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

import logoSmallDark from "../../public/logo-small-dark.svg"
import logoSmallLight from "../../public/logo-small-light.svg"

import logoBigDark from "../../public/logo-big-dark.svg"
import logoBigLight from "../../public/logo-big-light.svg"

export default function BrandLogo({ size }: { size: "small" | "big" }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <span className="block w-[67px] h-[36px]" />

  if (size === "small") {
    if (resolvedTheme === "dark") return <Image src={logoSmallDark} alt="Logo" />
    if (resolvedTheme === "light") return <Image src={logoSmallLight} alt="Logo" />
  } else {
    if (resolvedTheme === "dark") return <Image src={logoBigDark} alt="Logo" />
    if (resolvedTheme === "light") return <Image src={logoBigLight} alt="Logo" />
  }
}
