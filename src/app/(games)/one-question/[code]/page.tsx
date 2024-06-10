import OneQuestion from "@/components/one-question/OneQuestion"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function OneQuestionPage({ params }: { params: { code: string } }) {
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
      <div className="flex flex-col gap-2 items-center pt-4">
        <h1 className="text-4xl font-bold font-heading">Jedno pytanie</h1>
        <h2 className="text-xl text-muted">{data.name}</h2>
      </div>
      <OneQuestion examId={data.id} />
    </>
  )
}
