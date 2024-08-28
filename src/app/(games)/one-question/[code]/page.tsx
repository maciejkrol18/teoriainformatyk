import OneQuestion from './OneQuestion'
import PageTitle from '@/components/ui/PageTitle'
import getUser from '@/lib/supabase/get-user'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

async function getHardCollection(userId: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('hard_collections')
    .select('question_id_array')
    .eq('user_id', userId)
    .single()

  return data?.question_id_array || []
}

export default async function OneQuestionPage({ params }: { params: { code: string } }) {
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
  const fetchedHardCollection = user ? await getHardCollection(user.id) : []

  return (
    <>
      <PageTitle title="Jedno pytanie" subtitle={data.name} />
      <OneQuestion
        examId={data.id}
        userId={user?.id || null}
        fetchedHardCollection={fetchedHardCollection}
      />
    </>
  )
}
