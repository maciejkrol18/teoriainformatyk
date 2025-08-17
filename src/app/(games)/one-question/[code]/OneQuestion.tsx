"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import {
  Question,
  QuestionAnswer,
  QuestionAnswersContainer,
  QuestionContent,
  QuestionImage,
  type questionAnswerVariants,
} from "@/components/ui/Question";
import type { VariantProps } from "class-variance-authority";
import QuestionSkeleton from "@/components/skeletons/QuestionSkeleton";
import { toast } from "sonner";
import SessionStats from "./SessionStats";
import OneQuestionBar from "./OneQuestionBar";
import type { Question as QuestionType } from "@/types/question";
import { incrementCorrect, incrementIncorrect } from "./actions";

interface OneQuestionProps {
  examId: number;
  userId: string | null;
  fetchedHardCollection: number[];
}

export default function OneQuestion({
  examId,
  userId,
  fetchedHardCollection,
}: OneQuestionProps) {
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [statsOpen, setStatsOpen] = useState<boolean>(false);
  const [hardCollection, setHardCollection] = useState<number[]>(
    fetchedHardCollection
  );
  const [hardMode, setHardMode] = useState<boolean>(false);
  const rollButtonRef = useRef<HTMLButtonElement | null>(null);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [timesRolled, setTimesRolled] = useState(0);

  const getRandomQuestion = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_random_questions", {
      amount: 1,
      exam_id: examId,
      range: hardMode ? hardCollection : undefined,
    });
    if (error)
      throw new Error(`Błąd pobierania pytania z bazy: ${error.message}`);
    if (!data[0]) {
      if (hardMode) {
        toast.warning(
          "Brak pasujących trudnych pytań w kolekcji. Powrót do trybu normalnego"
        );
        setHardMode(false);
      } else {
        throw new Error(
          "Baza nie mogła znaleźć pasującego pytania. Spróbuj ponownie."
        );
      }
    } else {
      const questionWithShuffledAnswers = {
        ...data[0],
        answers: data[0].answers.sort(
          (a: string, b: string) => 0.5 - Math.random()
        ),
      };
      setQuestion(questionWithShuffledAnswers);
    }
  };

  const rollQuestion = () => {
    setTimesRolled((prev) => prev + 1);
    setQuestion(null);
    setSelectedAnswer(null);
    getRandomQuestion();
  };

  const getAnswerVariant = (
    answer: string,
    question: QuestionType
  ): VariantProps<typeof questionAnswerVariants>["variant"] => {
    if (selectedAnswer) {
      if (!selectedAnswer && answer === question.correct_answer)
        return "unanswered";
      if (answer === question.correct_answer && selectedAnswer)
        return "correct";
      if (answer === selectedAnswer && answer !== question.correct_answer)
        return "incorrect";
    } else {
      return answer === selectedAnswer ? "selected" : "default";
    }
  };

  const handleCorrectAnswer = async () => {
    setCorrectAnswers((prev) => prev + 1);
    if (userId) {
      const error = await incrementCorrect(userId, examId);
      if (error)
        toast.error(`Wystąpił błąd w trakcie aktualizacji statystyk: ${error}`);
    }
  };

  const handleIncorrectAnswer = async () => {
    setIncorrectAnswers((prev) => prev + 1);
    if (userId) {
      const error = await incrementIncorrect(userId, examId);
      if (error)
        toast.error(`Wystąpił błąd w trakcie aktualizacji statystyk: ${error}`);
    }
  };

  useEffect(() => {
    if (question && selectedAnswer) {
      if (selectedAnswer === question.correct_answer) {
        handleCorrectAnswer();
      } else {
        handleIncorrectAnswer();
      }
    }
  }, [selectedAnswer]);

  useEffect(() => {
    const rollOnSpaceClick = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (rollButtonRef.current) rollButtonRef.current.blur();
        rollQuestion();
      }
    };

    window.addEventListener("keyup", rollOnSpaceClick);

    return () => window.removeEventListener("keyup", rollOnSpaceClick);
  }, [hardMode, hardCollection]);

  useEffect(() => {
    rollQuestion();
  }, [hardMode]);

  return (
    <div className="flex flex-col grow gap-8 justify-center lg:justify-between pb-[64px] lg:py-4 md:w-full md:max-w-xl md:mx-auto">
      <Button
        onClick={() => rollQuestion()}
        variant="primary"
        className="font-semibold uppercase w-full hidden lg:flex flex-col"
        ref={rollButtonRef}
      >
        {selectedAnswer ? "Następne" : "Losuj"} (Spacja)
      </Button>
      {question ? (
        <Question className="bg-transparent">
          <QuestionContent>{question.content}</QuestionContent>
          <QuestionAnswersContainer>
            {question.answers.map((answer, index) => {
              const atlas = "ABCD";
              return (
                <QuestionAnswer
                  onClick={() => setSelectedAnswer(answer)}
                  variant={getAnswerVariant(answer, question)}
                  disabled={Boolean(selectedAnswer)}
                  key={answer}
                >
                  <span className="font-medium">{atlas.charAt(index)}</span>.{" "}
                  {answer}
                </QuestionAnswer>
              );
            })}
          </QuestionAnswersContainer>
          {question.image && (
            <QuestionImage
              bucket="question_images"
              filename={question.id}
              loading="lazy"
              alt="Zdjęcie do pytania"
            />
          )}
        </Question>
      ) : (
        <QuestionSkeleton />
      )}
      <OneQuestionBar
        openStatsFn={() => setStatsOpen(true)}
        rollQuestionFn={rollQuestion}
        hardModeFn={setHardMode}
        hardMode={hardMode}
        hardCollection={hardCollection}
        setHardCollection={setHardCollection}
        currentQuestion={question}
        userId={userId}
      />
      <SessionStats
        open={statsOpen}
        onOpenChange={(open) => setStatsOpen(open)}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        timesRolled={timesRolled}
      />
    </div>
  );
}
