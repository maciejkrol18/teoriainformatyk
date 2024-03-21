interface SectionProps {
  title: string
  subtitle: string
  id: string
  children?: React.ReactNode
}

export default function Section({ title, subtitle, id, children }: SectionProps) {
  return (
    <section id={id}>
      <div className="space-y-4 pb-24 text-center">
        <h2 className="font-display text-5xl">{title}</h2>
        <h3>{subtitle}</h3>
      </div>
      {children}
    </section>
  )
}
