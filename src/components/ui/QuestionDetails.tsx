'use client'

import { Question } from '@/types/question'
import { Layers, Image, Type, Skull, LucideAlertTriangle } from 'lucide-react'
import {
  QuestionAnswer,
  QuestionAnswersContainer,
  QuestionImage,
  questionAnswerVariants,
} from './Question'
import { Button } from './Button'
import { VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import Link from 'next/link'
import HardCollectionButton from '../HardCollectionButton'
import { Checkbox } from './Checkbox'

interface QuestionDetailsProps {
  question: Question
  fetchedHardCollection: number[]
  isAuthenticated: boolean
  showHardCollectionButton?: boolean
}

const Divider = () => <div className="h-[2px] bg-background-bright" />

export default function QuestionDetails({
  question,
  fetchedHardCollection,
  isAuthenticated,
  showHardCollectionButton = true,
}: QuestionDetailsProps) {
  const getAnswerVariant = (
    answer: string,
    question: Question,
  ): VariantProps<typeof questionAnswerVariants>['variant'] => {
    return answer === question.correct_answer ? 'correct' : 'default'
  }

  const [hardCollection, setHardCollection] = useState<number[]>(fetchedHardCollection)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false)

  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="flex flex-col gap-4">
        <p className="flex gap-2 font-semibold">
          <Type />
          Treść
        </p>
        <p>{question.content}</p>
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <p className="flex gap-2 font-semibold">
          <Layers />
          Odpowiedzi
        </p>
        <div className="flex gap-2 items-center">
          <Checkbox
            checked={showCorrectAnswer}
            onCheckedChange={(value) => setShowCorrectAnswer(!!value)}
            id="show-correct"
          />
          <label htmlFor="show-correct" className="text-muted">
            Pokaż poprawną odpowiedź
          </label>
        </div>
        <QuestionAnswersContainer>
          {question.answers.map((answer, index) => {
            const atlas = 'ABCD'
            return (
              <QuestionAnswer
                key={answer}
                className="cursor-default"
                variant={
                  showCorrectAnswer ? getAnswerVariant(answer, question) : 'default'
                }
              >
                <span className="font-medium">{atlas.charAt(index)}</span>. {answer}
              </QuestionAnswer>
            )
          })}
        </QuestionAnswersContainer>
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <p className="flex gap-2 font-semibold">
          <Image />
          Załączony obrazek
        </p>
        {question.image ? (
          <QuestionImage
            bucket="question_images"
            filename={question.id}
            loading="lazy"
            alt={`Zdjęcie do pytania o ID ${question.id}`}
          />
        ) : (
          <p className="text-muted">To pytanie nie posiada załączonego obrazku</p>
        )}
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        {showHardCollectionButton && (
          <HardCollectionButton
            disabled={!hardCollection}
            className={`${!hardCollection && 'text-muted'}`}
            hardCollection={hardCollection}
            setHardCollection={setHardCollection}
            isAuthenticated={isAuthenticated}
            targetQuestionId={question.id}
          >
            <Skull />{' '}
            {hardCollection
              ? `${hardCollection.includes(question.id) ? 'Usuń ze' : 'Dodaj do'} zbioru trudnych pytań`
              : 'Ładowanie stanu zbioru...'}
          </HardCollectionButton>
        )}
        <Button asChild>
          <Link
            href={`/contact?type=report&content=Zgłoszenie błędu w pytaniu o ID ${question.id}:`}
          >
            <LucideAlertTriangle /> Zgłoś błąd
          </Link>
        </Button>
      </div>
    </div>
  )
}
