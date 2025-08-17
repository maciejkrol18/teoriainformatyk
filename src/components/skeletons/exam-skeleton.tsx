export default function ExamSkeleton() {
  return (
    <>
      <div className="h-6 w-[34ch] mx-auto rounded-md bg-gradient-loading animate-loading bg-size-loading" />
      {Array.from({ length: 10 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: this won't be sorted
        <div className="flex flex-col gap-8 md:w-full md:max-w-xl md:mx-auto" key={index}>
          <div className="flex flex-col gap-8 bg-background-light p-4 rounded-lg">
            <div className="bg-gradient-loading animate-loading bg-size-loading rounded-full p-4 w-10 h-10" />
            <div className="bg-gradient-loading animate-loading bg-size-loading w-full h-6" />
            <div className="bg-gradient-loading animate-loading bg-size-loading w-[75%] h-6" />
            <div className="flex flex-col gap-4">
              <div className="h-10 rounded-md bg-gradient-loading animate-loading bg-size-loading" />
              <div className="h-10 rounded-md bg-gradient-loading animate-loading bg-size-loading" />
              <div className="h-10 rounded-md bg-gradient-loading animate-loading bg-size-loading" />
              <div className="h-10 rounded-md bg-gradient-loading animate-loading bg-size-loading" />
            </div>
            <div className="h-[200px] bg-gradient-loading animate-loading bg-size-loading" />
          </div>
        </div>
      ))}
    </>
  )
}
