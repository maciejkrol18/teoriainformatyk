export default function ExamSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => (
    <div className="flex flex-col gap-8 bg-background-light p-4 rounded-lg" key={index}>
      <div className="bg-gradient-loading animate-loading bg-size-loading rounded-full p-4 w-12 h-12 mx-auto"></div>
      <div className="bg-gradient-loading animate-loading bg-size-loading w-full h-6"></div>
      <div className="bg-gradient-loading animate-loading bg-size-loading w-[75%] h-6"></div>
      <div className="flex flex-col gap-4">
        <div className="h-6 rounded-md bg-gradient-loading animate-loading bg-size-loading"></div>
        <div className="h-6 rounded-md bg-gradient-loading animate-loading bg-size-loading"></div>
        <div className="h-6 rounded-md bg-gradient-loading animate-loading bg-size-loading"></div>
        <div className="h-6 rounded-md bg-gradient-loading animate-loading bg-size-loading"></div>
      </div>
      <div className="h-[200px] bg-gradient-loading animate-loading bg-size-loading"></div>
    </div>
  ))
}
