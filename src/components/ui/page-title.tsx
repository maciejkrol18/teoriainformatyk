interface PageTitleProps {
  title: string;
  subtitle: string;
}

export default function PageTitle({ subtitle, title }: PageTitleProps) {
  return (
    <div className="flex flex-col gap-2 items-center pt-4">
      <h1 className="text-4xl font-bold font-heading">{title}</h1>
      <h2 className="text-xl text-muted">{subtitle}</h2>
    </div>
  );
}
