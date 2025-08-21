interface SectionProps {
  title: string;
  subtitle: string;
  id: string;
  children?: React.ReactNode;
}

export default function Section({ title, subtitle, id, children }: SectionProps) {
  return (
    <section id={id} className="px-4">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="font-display text-4xl sm:text-5xl">{title}</h2>
        <p className="w-full max-w-lg mx-auto">{subtitle}</p>
      </div>
      <div className="py-24">{children}</div>
    </section>
  );
}
