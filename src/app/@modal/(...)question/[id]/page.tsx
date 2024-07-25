import SearchResultModal from '@/components/search/SearchResultModal'
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

export default async function QuestionModal({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { hideHardCollection: string }
}) {
  const question = await getQuestion(params.id)

  return (
    <SearchResultModal
      question={question}
      showHardCollectionButton={!Boolean(searchParams.hideHardCollection)}
    />
  )
}
