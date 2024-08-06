import Flashcards from '@/components/flashcards/Flashcards'
import PageTitle from '@/components/ui/PageTitle'
import getUser from '@/lib/supabase/get-user'
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'

async function getKnownQuestions(userId: string, examId: number) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('flashcards')
    .select('question_id_array')
    .eq('user_id', userId)
    .eq('exam_id', examId)
    .single()
  if (!data || error) {
    return []
  } else {
    return data.question_id_array
  }
}

async function getQuestionIdArray(examId: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('questions')
    .select('id')
    .eq('exam_id', examId)

  if (!data || data.length < 1 || error) {
    throw new Error('Failed to fetch questions from the database')
  } else {
    return data.map((obj) => obj.id)
  }
}

export default async function FlashcardsPage({ params }: { params: { code: string } }) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('exams')
    .select('id, name')
    .eq('code', params.code)
    .single()

  if (error || !data) {
    notFound()
  }

  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  const knownQuestions = await getKnownQuestions(user.id, data.id)
  const questionIds = await getQuestionIdArray(data.id)

  return (
    <>
      <PageTitle title="Fiszki" subtitle={data.name} />
      <div className="flex flex-col gap-4 w-full max-w-[576px] sm:mx-auto">
        <Flashcards
          fetchedKnownQuestions={knownQuestions}
          questionIds={questionIds}
          examId={data.id}
        />
      </div>
    </>
  )
}
