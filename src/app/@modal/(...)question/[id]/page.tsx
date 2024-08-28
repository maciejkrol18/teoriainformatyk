import QuestionModal from '@/components/search/QuestionModal'
import getUser from '@/lib/supabase/get-user'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { cache } from 'react'

export const revalidate = 36000

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

const getHardCollection = cache(async (userId: string) => {
  const supabase = createClient()
  const { data } = await supabase
    .from('hard_collections')
    .select('question_id_array')
    .eq('user_id', userId)
    .single()
  return (data && data.question_id_array) || []
})

export default async function ParallelQuestionPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { hideHardCollection: string }
}) {
  const question = await getQuestion(params.id)
  const { user } = await getUser()
  const hardCollection = user ? await getHardCollection(user.id) : []

  return (
    <QuestionModal
      question={question}
      fetchedHardCollection={hardCollection}
      isAuthenticated={user !== null}
      // biome-ignore lint/complexity/noExtraBooleanCast: this doesn't get coerced
      showHardCollectionButton={!Boolean(searchParams.hideHardCollection)}
    />
  )
}
