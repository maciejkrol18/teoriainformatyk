import Exam from "@/components/Exam"

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center py-12">
        <span className="text-transparent text-xl font-bold bg-clip-text bg-gradient-accent animate-moving-gradient">
          INF.02
        </span>
        <h1 className="text-2xl font-bold">Egzamin</h1>
      </div>
      <Exam table="questions_inf03" />
    </>
  )
}
