import OneQuestion from '@/components/one-question/OneQuestion'
import PageTitle from '@/components/ui/PageTitle'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

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

  return (
    <>
      <PageTitle title="Jedno pytanie" subtitle={data.name} />
      <OneQuestion examId={data.id} />
    </>
  )
}
