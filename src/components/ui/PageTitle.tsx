interface PageTitleProps {
  smallTitle: string
  bigTitle: string
}

export default function PageTitle({ smallTitle, bigTitle }: PageTitleProps) {
  return (
    <div className="flex flex-col gap-2 items-center pt-4">
      <h1 className="text-4xl font-bold font-heading">{bigTitle}</h1>
      <h2 className="text-xl text-muted">{smallTitle}</h2>
    </div>
  )
}
