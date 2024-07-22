import SearchResultModal from '@/components/search/SearchResultModal'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function QuestionModal({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { hideHardCollection: string }
}) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('id', params.id)
    .single()
  if (!data || error) {
    notFound()
  }

  return (
    <SearchResultModal
      question={data}
      showHardCollectionButton={!Boolean(searchParams.hideHardCollection)}
    />
  )
}
