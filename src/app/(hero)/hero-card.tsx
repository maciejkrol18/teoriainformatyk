import { cn } from "@/lib/utils";

interface HeroCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function HeroCard({ icon, title, children, className }: HeroCardProps) {
  return (
    <div
      className={cn("flex flex-col gap-4 bg-background-light p-8 rounded-md", className)}
    >
      <div className="flex flex-col gap-4 items-center">
        <div className="bg-background-bright p-4 rounded-full max-w-fit">{icon}</div>
        <p className="text-xl font-semibold">{title}</p>
      </div>
      {children}
    </div>
  );
}
