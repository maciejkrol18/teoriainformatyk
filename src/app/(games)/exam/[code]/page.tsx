import Exam from "@/components/exam/Exam"
import PageTitle from "@/components/ui/PageTitle"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function ExamPage({ params }: { params: { code: string } }) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("exams")
    .select("id, name")
    .eq("code", params.code)
    .single()

  if (error || !data) {
    notFound()
  }

  return (
    <>
      <div className="flex flex-col gap-2 grow items-center pt-4">
        <h1 className="text-4xl font-bold font-heading">Egzamin</h1>
        <h2 className="text-xl text-muted">{data.name}</h2>
      </div>
      <Exam examId={data.id} />
    </>
  )
}
