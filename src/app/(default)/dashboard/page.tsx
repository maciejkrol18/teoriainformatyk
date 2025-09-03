import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardAccount from "@/components/dashboard/dashboard-account";
import DashboardBlock from "@/components/dashboard/dashboard-block";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardLatestExams from "@/components/dashboard/dashboard-latest-exams";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import { Button } from "@/components/ui/button";
import { QUALIFICATIONS } from "@/lib/constants";
import getUser from "@/lib/supabase/get-user";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Panel użytkownika",
};

export default async function DashboardPage() {
  const { user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  const supabase = await createClient();

  const { data: oneQuestionData } = await supabase
    .from("one_question_scores")
    .select("correct, incorrect, exam_id")
    .eq("user_id", user.id)
    .order("exam_id");

  const { data: flashcardsData } = await supabase
    .from("flashcards")
    .select("question_id_array, exam_id")
    .eq("user_id", user.id)
    .order("exam_id");

  const questionAmounts = await Promise.all(
    QUALIFICATIONS.map(async (qualification) => {
      const { count } = await supabase
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("exam_id", qualification.id);
      return count;
    })
  );

  const { data: accountData } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader userId={user.id} />
      <div className="flex flex-col gap-8 lg:flex-row">
        <DashboardStats
          oneQuestionData={oneQuestionData}
          flashcardsData={flashcardsData}
          questionAmounts={questionAmounts}
        />
        <DashboardLatestExams userId={user.id} className="flex-1" />
      </div>
      <DashboardBlock
        blockTitle="Zbiór trudnych pytań"
        blockActions={
          <Button variant="primary" size="sm" asChild>
            <Link href="/search?hardOnly=true">Wyświetl swój zbiór</Link>
          </Button>
        }
      >
        <p className="text-muted">
          Zapisuj najtrudniejsze dla ciebie pytania z poziomu trybu jednego pytania oraz
          strony wyszukiwarki aby powtarzać je w specjalnym, trudnym trybie jednego
          pytania. Aby zobaczyć listę pytań najczęściej uznawanych przez wszystkich
          użytkowników serwisu za trudne, przejdź{" "}
          <Link href="/hardest" className="underline text-accent">
            tutaj
          </Link>
        </p>
      </DashboardBlock>
      <DashboardAccount accountData={accountData} />
    </div>
  );
}
