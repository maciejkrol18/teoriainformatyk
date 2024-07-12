import Flashcards from "@/components/flashcards/Flashcards"
import PageTitle from "@/components/ui/PageTitle"
import getKnownQuestions from "@/lib/supabase/get-known-questions"
import getQuestionIdsList from "@/lib/supabase/get-questions-id-list"
import getUser from "@/lib/supabase/get-user"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function FlashcardsPage({ params }: { params: { code: string } }) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("exams")
    .select("id, name")
    .eq("code", params.code)
    .single()

  if (error || !data) {
    notFound()
  }

  const { user } = await getUser()
  const knownQuestions = user ? await getKnownQuestions(user.id, data.id) : []
  const questionIds = await getQuestionIdsList(data.id)

  return (
    <>
      <PageTitle bigTitle="Fiszki" smallTitle={data.name} />
      <div className="flex flex-col gap-4 w-[576px] mx-auto">
        <Flashcards fetchedKnownQuestions={knownQuestions} questionIds={questionIds} />
      </div>
    </>
  )
}
