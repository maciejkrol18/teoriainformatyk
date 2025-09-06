import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { LatestExamScoresEntry } from "@/types/latest-exams-entry";
import { Button } from "../ui/button";
import ScoreBlock from "../ui/score-block";
import DashboardBlock from "./dashboard-block";

interface DashboardLatestExamsProps {
  userId: string;
  className?: string;
}

async function getLatestExams(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("exam_scores")
    .select("exam_id, percentage_score, created_at, exams (name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(4);

  let scores: LatestExamScoresEntry[] = [];

  if (data) {
    scores = [...scores, ...data];
  }

  return {
    scores: scores,
    error: error?.message,
  };
}

export default async function DashboardLatestExams({
  className,
  userId,
}: DashboardLatestExamsProps) {
  const { scores, error } = await getLatestExams(userId);
  return (
    <DashboardBlock
      blockTitle="Ostatnie egzaminy"
      className={className}
      blockActions={
        <Button variant="primary" size="sm" asChild>
          <Link href="/dashboard/exams">Zobacz wszystkie</Link>
        </Button>
      }
    >
      {scores.length > 0 &&
        scores.map((score) => {
          return (
            <ScoreBlock
              key={score.created_at}
              examName={score.exams?.name}
              percentageScore={score.percentage_score}
              createdAt={score.created_at}
            />
          );
        })}
      {scores.length === 0 && (
        <div className="flex justify-center items-center grow">
          <p className="text-muted">Brak wyników</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center grow">
          <p className="text-muted">
            Wystąpił błąd podczas pobierania danych <br /> {error}
          </p>
        </div>
      )}
    </DashboardBlock>
  );
}
