import { cn } from '@/lib/utils'

interface HeroCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export default function HeroCard({ icon, title, description, className }: HeroCardProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {icon}
      <p className="text-xl font-semibold">{title}</p>
      <p>{description}</p>
    </div>
  )
}
