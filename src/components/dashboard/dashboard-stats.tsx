"use client";

import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import DashboardBlock from "./dashboard-block";
import OneQuestionStats from "./one-question-stats";
import FlashcardsStats from "./flashcards-stats";
import { cn } from "@/lib/utils";

interface DashboardStatsProps {
  className?: string;
  userId: string;
}

export default function DashboardStats({
  className,
  userId,
}: DashboardStatsProps) {
  return (
    <Tabs defaultValue="inf02" className={cn("flex flex-col gap-8", className)}>
      <DashboardBlock
        blockTitle="Jedno pytanie"
        blockActions={
          <>
            <TabsList>
              <TabsTrigger value="inf02">INF.02/EE.08</TabsTrigger>
              <TabsTrigger value="inf03">INF.03/EE.09/EE.14</TabsTrigger>
            </TabsList>
          </>
        }
      >
        <TabsContent value="inf02">
          <OneQuestionStats userId={userId} examId={1} />
        </TabsContent>
        <TabsContent value="inf03">
          <OneQuestionStats userId={userId} examId={2} />
        </TabsContent>
      </DashboardBlock>
      <DashboardBlock
        blockTitle="Fiszki"
        blockActions={
          <>
            <TabsList>
              <TabsTrigger value="inf02">INF.02/EE.08</TabsTrigger>
              <TabsTrigger value="inf03">INF.03/EE.09/EE.14</TabsTrigger>
            </TabsList>
          </>
        }
      >
        <TabsContent value="inf02">
          <FlashcardsStats userId={userId} examId={1} />
        </TabsContent>
        <TabsContent value="inf03">
          <FlashcardsStats userId={userId} examId={2} />
        </TabsContent>
      </DashboardBlock>
    </Tabs>
  );
}
