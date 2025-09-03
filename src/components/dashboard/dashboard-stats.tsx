"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QUALIFICATIONS } from "@/lib/constants";
import DashboardBlock from "./dashboard-block";
import FlashcardsStats from "./flashcards-stats";
import OneQuestionStats from "./one-question-stats";

interface DashboardStatsProps {
  oneQuestionData:
    | {
        correct: number;
        incorrect: number;
        exam_id: number;
      }[]
    | null;
  flashcardsData:
    | {
        question_id_array: number[];
        exam_id: number;
      }[]
    | null;
  questionAmounts: (number | null)[];
}

function QualificationTriggers() {
  return (
    <>
      {QUALIFICATIONS.map((qualification) => (
        <TabsTrigger value={qualification.code} key={qualification.id}>
          {qualification.name}
        </TabsTrigger>
      ))}
    </>
  );
}

export default function DashboardStats({
  oneQuestionData,
  flashcardsData,
  questionAmounts,
}: DashboardStatsProps) {
  return (
    <Tabs defaultValue={QUALIFICATIONS[0].code} className="flex flex-col flex-1 gap-8">
      <DashboardBlock
        blockTitle="Jedno pytanie"
        blockActions={
          <TabsList>
            <QualificationTriggers />
          </TabsList>
        }
      >
        {oneQuestionData === null ? (
          <p className="text-muted text-center">
            Wystąpił błąd podczas pobierania wyników
          </p>
        ) : (
          QUALIFICATIONS.map((qualification, index) => (
            <TabsContent value={qualification.code} key={qualification.id}>
              <OneQuestionStats stats={oneQuestionData[index]} />
            </TabsContent>
          ))
        )}
      </DashboardBlock>
      <DashboardBlock
        blockTitle="Fiszki"
        blockActions={
          <TabsList>
            <QualificationTriggers />
          </TabsList>
        }
      >
        {flashcardsData === null ? (
          <p className="text-muted text-center">
            Wystąpił błąd podczas pobierania wyników
          </p>
        ) : (
          QUALIFICATIONS.map((qualification, index) => (
            <TabsContent value={qualification.code} key={qualification.id}>
              <FlashcardsStats
                stats={flashcardsData[index]}
                totalQuestions={questionAmounts[index]}
              />
            </TabsContent>
          ))
        )}
      </DashboardBlock>
    </Tabs>
  );
}
