import { cn } from "@/lib/utils";

interface DashboardBlockProps {
  className?: string;
  blockTitle: string;
  blockActions?: React.ReactNode;
  children?: React.ReactNode;
}

const Divider = () => <div className="h-[2px] bg-background-bright" />;

export default function DashboardBlock({
  className,
  blockTitle,
  blockActions,
  children,
}: DashboardBlockProps) {
  return (
    <div
      className={cn("flex flex-col gap-4 p-4 rounded-lg bg-background-light", className)}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 sm:justify-between">
        <p className="font-semibold text-2xl">{blockTitle}</p>
        {blockActions}
      </div>
      <Divider />
      {children}
    </div>
  );
}
