"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useRef, useState } from "react";
import Donut from "../ui/Donut";

interface OneQuestionStats {
  userId: string;
  examId: number;
}

type Stats = {
  correct: number;
  incorrect: number;
} | null;

export default function OneQuestionStats({ userId, examId }: OneQuestionStats) {
  const [stats, setStats] = useState<Stats>(null);
  const [scorePercentage, setScorePercentage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const wereStatsFetched = useRef<boolean>(false);

  const fetchOneQuestionStats = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("one_question_scores")
      .select("correct, incorrect")
      .eq("user_id", userId)
      .eq("exam_id", examId)
      .single();

    if (error) {
      setStats(null);
    } else {
      setStats(data);
    }

    setLoading(false);
    wereStatsFetched.current = true;
  };

  useEffect(() => {
    if (wereStatsFetched.current) return;
    fetchOneQuestionStats();
  }, []);

  useEffect(() => {
    if (stats) {
      setScorePercentage(
        Math.floor((stats.correct / (stats.correct + stats.incorrect)) * 100)
      );
    }
  }, [stats]);

  return (
    <div className="flex flex-col gap-2">
      {loading && (
        <div className="flex items-center justify-center h-[240px] lg:h-[128px] text-muted">
          Ładowanie...
        </div>
      )}
      {stats && (
        <div className="flex flex-col lg:flex-row text-center lg:text-left items-center gap-4">
          <Donut value={scorePercentage} size={128} />
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold">{scorePercentage}%</p>
            <p>poprawnych odpowiedzi</p>
            <p className="text-muted">
              {stats.correct}/{stats.correct + stats.incorrect}
            </p>
          </div>
        </div>
      )}
      {!stats && !loading && (
        <div className="flex items-center justify-center h-[240px] lg:h-[128px] text-muted">
          Brak wyników
        </div>
      )}
    </div>
  );
}
