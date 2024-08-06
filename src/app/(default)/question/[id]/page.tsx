import QuestionDetails from '@/components/ui/QuestionDetails'
import getUser from '@/lib/supabase/get-user'
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

const getHardCollection = async (userId: string) => {
  const supabase = createClient()
  const { data } = await supabase
    .from('hard_collections')
    .select('question_id_array')
    .eq('user_id', userId)
    .single()
  return (data && data.question_id_array) || []
}

export default async function QuestionPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const question = await getQuestion(params.id)
  const { user } = await getUser()
  const hardCollection = user ? await getHardCollection(user.id) : []
  return (
    <div className="flex flex-col gap-8 md:w-full md:max-w-xl md:mx-auto">
      <h1 className="text-2xl font-bold">Pytanie #{question.id}</h1>
      <QuestionDetails
        question={question}
        fetchedHardCollection={hardCollection}
        isAuthenticated={user !== null}
      />
    </div>
  )
}
