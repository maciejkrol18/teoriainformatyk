"use client";

import { createClient } from "@/lib/supabase/client";
import type { QueryChallenge } from "@/types/query-challenge";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dices, ExternalLink, LoaderIcon, Send, Wand2 } from "lucide-react";
import QueryInput from "./QueryInput";
import { toast } from "sonner";
import { QuestionImage } from "@/components/ui/Question";
import Link from "next/link";
import Skeleton from "@/components/ui/Skeleton";

export default function SqlTraining() {
  const [challenge, setChallenge] = useState<QueryChallenge | null>(null);
  const [userQuery, setUserQuery] = useState<string>("");
  const [isValidating, setIsValidating] = useState(false);

  const fetchChallenge = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .rpc("get_random_query_challenge")
      .single();
    if (error)
      throw new Error(`Wystąpił błąd: ${error.message}, ${error.details}`);
    if (!data)
      throw new Error("Błąd pobierania pytania. Spróbuj ponownie później");
    setChallenge({
      exam_code: data.exam_code,
      image: data.image,
      repo_link: data.repo_link,
      comment: data.comment,
      content: data.challenge,
      answer: data.correct_answer,
    });
  };

  const rollChallenge = () => {
    setChallenge(null);
    setUserQuery("");
    fetchChallenge();
  };

  const autoComplete = () => {
    if (challenge) setUserQuery(challenge.answer);
  };

  const checkAnswer = async () => {
    if (!userQuery) {
      toast.error("Wpisz swoją odpowiedź w edytor po lewej stronie");
      return;
    }
    if (userQuery && challenge) {
      setIsValidating(true);
      const res = await fetch("/api/sql-training", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAnswer: userQuery,
          correctAnswer: challenge.answer,
        }),
      });
      const status = res.status;
      if (status === 200) {
        const isCorrect = await res.json();
        isCorrect
          ? toast.success("Odpowiedź poprawna")
          : toast.error("Niepoprawna odpowiedź");
      } else {
        const error = await res.text();
        toast.error(error);
      }
      setIsValidating(false);
    }
  };

  useEffect(() => {
    rollChallenge();
  }, []);

  return (
    <div className="flex flex-col xl:flex-row py-4 gap-4 grow">
      <div className="flex-1 bg-background-light relative">
        {isValidating && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background-light/50">
            <LoaderIcon className="animate-spin" />
          </div>
        )}
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
                <span className="font-bold">Napisz zapytanie</span>{" "}
                {challenge.content}
              </p>
              {challenge.image && (
                <div className="flex">
                  <QuestionImage
                    bucket="query_images"
                    filename={challenge.exam_code}
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
            // biome-ignore lint/complexity/noExtraBooleanCast: this doesn't get coerced
            disabled={!Boolean(challenge)}
            aria-label="Losuj"
            title="Losuj"
          >
            <Dices />
          </Button>
          <Button
            className="rounded-full w-20 h-20"
            onClick={autoComplete}
            // biome-ignore lint/complexity/noExtraBooleanCast: this doesn't get coerced
            disabled={!Boolean(challenge)}
            aria-label="Autouzupełnij odpowiedź"
            title="Autouzupełnij odpowiedź"
          >
            <Wand2 />
          </Button>
          <Button
            className="rounded-full w-20 h-20"
            onClick={checkAnswer}
            // biome-ignore lint/complexity/noExtraBooleanCast: this doesn't get coerced
            disabled={!Boolean(challenge)}
            aria-label="Sprawdź odpowiedź"
            title="Sprawdź odpowiedź"
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}
