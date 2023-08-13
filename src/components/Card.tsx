interface CardProps {
  children: React.ReactNode
}

export default function Card({ children }: CardProps) {
  return (
    <div className="flex flex-col p-4 gap-6 bg-primary shadow-card-inset drop-shadow-lg rounded-md">
      {children}
    </div>
  )
}
