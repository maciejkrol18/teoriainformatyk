import Donut from "../ui/donut";

interface FlashcardsStats {
  stats:
    | {
        question_id_array: number[];
        exam_id: number;
      }
    | undefined;
  totalQuestions: number | null | undefined;
}

export default function FlashcardsStats({ stats, totalQuestions }: FlashcardsStats) {
  const finishedQuestions = stats?.question_id_array.length;
  const scorePercentage =
    !stats || !totalQuestions
      ? null
      : Math.floor((stats.question_id_array.length / totalQuestions) * 100);

  return (
    <div className="flex flex-col gap-2">
      {finishedQuestions === undefined || scorePercentage === null ? (
        <div className="flex items-center justify-center h-[240px] lg:h-[128px] text-muted">
          Brak wyników
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row text-center lg:text-left items-center gap-4">
          <Donut value={scorePercentage ?? 0} size={128} />
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold">{scorePercentage}%</p>
            <p>przerobionych pytań</p>
            <p className="text-muted">
              {totalQuestions && (
                <>
                  {finishedQuestions}/{totalQuestions}
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
