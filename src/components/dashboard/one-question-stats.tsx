import Donut from "../ui/donut";

type Stats = {
  correct: number;
  incorrect: number;
} | null;

interface OneQuestionStatsProps {
  stats: Stats | undefined;
}

export default function OneQuestionStats({ stats }: OneQuestionStatsProps) {
  const scorePercentage =
    stats === null || stats === undefined
      ? 0
      : Math.floor((stats.correct / (stats.correct + stats.incorrect)) * 100);

  return (
    <div className="flex flex-col gap-2">
      {stats === null || stats === undefined ? (
        <div className="flex items-center justify-center h-[240px] lg:h-[128px] text-muted">
          Brak wyników
        </div>
      ) : (
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
    </div>
  );
}
