interface HeroCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function HeroCard({ icon, title, description }: HeroCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {icon}
      <p className="text-xl font-semibold">{title}</p>
      <p>{description}</p>
    </div>
  )
}
