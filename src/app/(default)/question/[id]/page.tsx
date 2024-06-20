import {
  QuestionAnswer,
  QuestionAnswersContainer,
  QuestionImage,
} from "@/components/ui/Question"
import { createClient } from "@/lib/supabase/server"
import { Type, Layers, Image } from "lucide-react"
import { notFound } from "next/navigation"

export default async function QuestionPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!data || error) {
    notFound()
  }
  return (
    <div className="flex flex-col gap-8 md:w-full md:max-w-xl md:mx-auto">
      <h1 className="text-2xl font-bold">Pytanie #{data.id}</h1>
      <div className="flex flex-col gap-4">
        <h2 className="flex gap-2 font-semibold">
          <Type />
          Treść
        </h2>
        <p>{data.content}</p>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="flex gap-2 font-semibold">
          <Layers />
          Odpowiedzi
        </h3>
        <QuestionAnswersContainer>
          {data.answers.map((answer, index) => {
            const atlas = "ABCD"
            return (
              <QuestionAnswer key={answer} className="cursor-default">
                <span className="font-medium">{atlas.charAt(index)}</span>. {answer}
              </QuestionAnswer>
            )
          })}
        </QuestionAnswersContainer>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="flex gap-2 font-semibold">
          <Image />
          Załączony obrazek
        </h4>
        {data.image ? (
          <QuestionImage
            src={`https://mwutwmvvmskygvtjowaa.supabase.co/storage/v1/object/public/question_images/${params.id}.webp`}
            loading="lazy"
            alt={`Zdjęcie do pytania o ID ${params.id}`}
          />
        ) : (
          <p className="text-muted">To pytanie nie posiada załączonego obrazku</p>
        )}
      </div>
    </div>
  )
}
