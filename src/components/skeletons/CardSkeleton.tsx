interface CardSkeletonProps {
  className?: string
}

export default function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <div
      className={`flex flex-col p-4 gap-6 bg-primary shadow-card-inset drop-shadow-lg rounded-md ${
        className && className
      }`}
    >
      <div className="flex flex-col gap-2">
        <span className="h-6 w-8 rounded-md bg-gradient-loading animate-loading bg-size-loading"></span>
        <div className="flex flex-col gap-1">
          <span className="h-5 rounded-md bg-gradient-loading animate-loading bg-size-loading"></span>
          <span className="h-5 rounded-md bg-gradient-loading animate-loading bg-size-loading"></span>
          <span className="h-5 rounded-md bg-gradient-loading animate-loading bg-size-loading"></span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="h-9 bg-gradient-loading animate-loading bg-size-loading"></span>
        <span className="h-9 bg-gradient-loading animate-loading bg-size-loading"></span>
        <span className="h-9 bg-gradient-loading animate-loading bg-size-loading"></span>
      </div>
      <span className="h-12 bg-gradient-loading animate-loading bg-size-loading"></span>
    </div>
  )
}
