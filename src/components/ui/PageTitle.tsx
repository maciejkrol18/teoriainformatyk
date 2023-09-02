interface PageTitleProps {
  smallTitle: string
  bigTitle: string
}

export default function PageTitle({ smallTitle, bigTitle }: PageTitleProps) {
  return (
    <div className="flex flex-col items-center py-8">
      <span className="uppercase text-transparent text-xl font-bold bg-clip-text bg-gradient-accent animate-moving-gradient">
        {smallTitle}
      </span>
      <h1 className="text-2xl font-bold">{bigTitle}</h1>
    </div>
  )
}
