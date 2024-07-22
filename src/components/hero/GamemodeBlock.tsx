import Link from 'next/link'

interface GamemodeBlockProps {
  squareClass: string
  title: string
  subtitle: string
  href: string
}

export default function GamemodeBlock({
  squareClass,
  title,
  subtitle,
  href,
}: GamemodeBlockProps) {
  return (
    <Link
      className="flex flex-col gap-4 p-4 md:max-w-[256px] bg-background-light rounded-lg"
      href={href}
    >
      <div className={`w-32 h-32 rounded-lg ${squareClass}`} />
      <h3 className="font-bold text-2xl">{title}</h3>
      <p>{subtitle}</p>
    </Link>
  )
}
