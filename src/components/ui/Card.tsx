interface CardProps {
  className?: string
  children: React.ReactNode
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`${
        className ? className : ""
      } flex flex-col p-4 gap-6 bg-primary shadow-card-inset rounded-md`}
    >
      {children}
    </div>
  )
}
