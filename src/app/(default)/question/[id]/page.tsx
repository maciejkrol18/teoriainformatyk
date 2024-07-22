import QuestionDetails from '@/components/ui/QuestionDetails'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function QuestionPage({
  params,
}: {
  params: {
    id: string
  }
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
    <div className="flex flex-col gap-8 md:w-full md:max-w-xl md:mx-auto">
      <h1 className="text-2xl font-bold">Pytanie #{data.id}</h1>
      <QuestionDetails question={data} />
    </div>
  )
}
