export default function QuestionSkeleton() {
  return (
    <div className="flex flex-col gap-8 bg-background-light p-4 rounded-lg">
      <div className="bg-gradient-loading animate-loading bg-size-loading w-full h-6" />
      <div className="bg-gradient-loading animate-loading bg-size-loading w-[75%] h-6" />
      <div className="flex flex-col gap-4">
        <div className="h-10 rounded-md bg-gradient-loading animate-loading bg-size-loading" />
        <div className="h-10 rounded-md bg-gradient-loading animate-loading bg-size-loading" />
        <div className="h-10 rounded-md bg-gradient-loading animate-loading bg-size-loading" />
        <div className="h-10 rounded-md bg-gradient-loading animate-loading bg-size-loading" />
      </div>
    </div>
  );
}
