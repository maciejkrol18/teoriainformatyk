import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface GamemodeBlockProps {
  title: string
  subtitle: string
  href: string
  imageSrc: string
}

export default function GamemodeBlock({
  title,
  subtitle,
  href,
  imageSrc,
}: GamemodeBlockProps) {
  return (
    <Link
      className="flex flex-col gap-4 p-4 md:max-w-[256px] bg-background-light rounded-lg"
      href={href}
    >
      <Image width={128} height={128} src={imageSrc || ''} alt={title} />
      <h3 className="font-bold text-2xl">{title}</h3>
      <p>{subtitle}</p>
    </Link>
  )
}
