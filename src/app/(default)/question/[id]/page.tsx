import QuestionDetails from '@/components/ui/QuestionDetails'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { cache } from 'react'

export const revalidate = 86400

const getQuestion = cache(async (id: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('id', id)
    .single()

  if (!data || error) {
    notFound()
  } else {
    return data
  }
})

export default async function QuestionPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const question = await getQuestion(params.id)
  return (
    <div className="flex flex-col gap-8 md:w-full md:max-w-xl md:mx-auto">
      <h1 className="text-2xl font-bold">Pytanie #{question.id}</h1>
      <QuestionDetails question={question} />
    </div>
  )
}
