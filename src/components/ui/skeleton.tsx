interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`${
        className && className
      } bg-gradient-loading animate-loading bg-size-loading w-full`}
    />
  );
}
