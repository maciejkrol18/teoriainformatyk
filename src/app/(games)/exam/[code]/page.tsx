import Exam from '@/components/exam/Exam'
import PageTitle from '@/components/ui/PageTitle'
import { createClient } from '@/lib/supabase/server'
import { ExamQuestion } from '@/types/exam-question'
import { notFound } from 'next/navigation'

async function getQuestions(id: number): Promise<ExamQuestion[]> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_random_questions', {
    amount: 40,
    exam_id: id,
  })
  if (error) {
    throw new Error(`Wystąpił błąd: ${error.message}`)
  } else if (!data) {
    throw new Error('Błąd pobierania pytań z bazy. Spróbuj ponownie')
  } else {
    return data.map((question) => {
      return {
        ...question,
        answers: question.answers.sort((a: string, b: string) => 0.5 - Math.random()),
        selected_answer: null,
        correct_selected: false,
      }
    })
  }
}

async function getExamData(code: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('exams')
    .select('id, name')
    .eq('code', code)
    .single()
  if (error || !data) {
    notFound()
  } else {
    return data
  }
}

export default async function ExamPage({ params }: { params: { code: string } }) {
  const examData = await getExamData(params.code)
  const fetchedQuestions = await getQuestions(examData.id)

  return (
    <>
      <PageTitle title="Egzamin" subtitle={examData.name} />
      <Exam examId={examData.id} fetchedQuestions={fetchedQuestions} />
    </>
  )
}
