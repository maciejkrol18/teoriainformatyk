interface PageTitleProps {
  smallTitle: string
  bigTitle: string
}

export default function PageTitle({ smallTitle, bigTitle }: PageTitleProps) {
  return (
    <div className="flex flex-col items-center py-8 font-heading leading-relaxed tracking-wide">
      <span className="uppercase text-transparent text-xl bg-clip-text bg-gradient-accent animate-moving-gradient">
        {smallTitle}
      </span>
      <h1 className="text-3xl">{bigTitle}</h1>
    </div>
  )
}
