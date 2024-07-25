'use client'

import { createClient } from '@/lib/supabase/client'
import { QueryChallenge } from '@/types/query-challenge'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Dices, ExternalLink, Send, Wand2 } from 'lucide-react'
import { Parser } from 'node-sql-parser'
import QueryInput from './QueryInput'
import { toast } from 'sonner'
import { QuestionImage } from '@/components/ui/Question'
import Link from 'next/link'
import Skeleton from '@/components/ui/Skeleton'

export default function SqlTraining() {
  const [challenge, setChallenge] = useState<QueryChallenge | null>(null)
  const [userQuery, setUserQuery] = useState<string>('')
  const parser = useRef(new Parser())

  const fetchChallenge = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.rpc('get_random_query_challenge').single()
    if (error) {
      throw new Error(`Wystąpił błąd: ${error.message}, ${error.details}`)
    } else if (!data) {
      throw new Error('Błąd pobierania pytania. Spróbuj ponownie później')
    } else {
      if (data.questions.length !== data.answers.length) {
        throw new Error('Fetched arrays were not of the same length')
      }
      const rand = Math.ceil(Math.random() * (data.questions.length - 1 - 0) + 0)
      const content = data.questions[rand]
      const answer = data.answers[rand]
      if (!content || !answer) {
        throw new Error('Failed to fetch a random content and answer pair')
      }
      setChallenge({
        exam_code: data.exam_code,
        image: data.image,
        repo_link: data.repo_link,
        comment: data.comment,
        content: content,
        answer: answer,
      })
    }
  }

  const rollChallenge = () => {
    setChallenge(null)
    setUserQuery('')
    fetchChallenge()
  }

  const autoComplete = () => {
    if (challenge) setUserQuery(challenge.answer)
  }

  const checkAnswer = () => {
    if (!userQuery) {
      toast.error('Wpisz swoją odpowiedź w edytor po lewej stronie')
      return
    }
    if (userQuery && challenge) {
      try {
        const parsedAnswer = parser.current.parse(
          userQuery.charAt(userQuery.length - 1) === ';'
            ? userQuery.substring(0, userQuery.indexOf(';'))
            : userQuery,
        )

        const parsedCorrectAnswer = parser.current.parse(challenge.answer)

        const isCorrect =
          JSON.stringify(parsedAnswer) === JSON.stringify(parsedCorrectAnswer)
        isCorrect ? toast.success('Poprawna odpowiedź') : toast.error('Zła odpowiedź')
      } catch (error) {
        toast.error('Zła odpowiedź')
        console.warn('Parser Error:', error)
      }
    }
  }

  useEffect(() => {
    rollChallenge()
  }, [])

  return (
    <div className="flex flex-col xl:flex-row py-4 gap-4 grow">
      <div className="flex-1 bg-background-light p-8">
        <QueryInput state={userQuery} setState={setUserQuery} />
      </div>
      <div className="flex-1 flex flex-col gap-8 p-8 rounded-md bg-background-light">
        <div className="flex flex-col gap-4 grow">
          {challenge ? (
            <>
              <Link
                href={challenge.repo_link}
                target="_blank"
                className="flex items-center gap-2 text-muted text-lg"
              >
                {challenge.exam_code}
                <ExternalLink />
              </Link>
              <p className="text-xl leading-relaxed">
                <span className="font-bold">Napisz zapytanie</span> {challenge.content}
              </p>
              {challenge.image && (
                <div className="flex">
                  <QuestionImage
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/query_images/${challenge.exam_code}.webp`}
                    alt="Załączony obrazek"
                    loading="eager"
                  />
                </div>
              )}
              <p>{challenge.comment}</p>
            </>
          ) : (
            <>
              <Skeleton className="h-[28px]" />
              <Skeleton className="h-[98px]" />
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[96px]" />
            </>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            className="rounded-full w-20 h-20"
            onClick={rollChallenge}
            disabled={!Boolean(challenge)}
            aria-label="Losuj"
            title="Losuj"
          >
            <Dices />
          </Button>
          <Button
            className="rounded-full w-20 h-20"
            onClick={autoComplete}
            disabled={!Boolean(challenge)}
            aria-label="Autouzupełnij odpowiedź"
            title="Autouzupełnij odpowiedź"
          >
            <Wand2 />
          </Button>
          <Button
            className="rounded-full w-20 h-20"
            onClick={checkAnswer}
            disabled={!Boolean(challenge)}
            aria-label="Sprawdź odpowiedź"
            title="Sprawdź odpowiedź"
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  )
}
