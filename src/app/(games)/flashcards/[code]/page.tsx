import Flashcards from "@/components/flashcards/flashcards";
import PageTitle from "@/components/ui/page-title";
import getUser from "@/lib/supabase/get-user";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  // TODO: Determine the qualification text based off the db
  const qualification =
    params.code === "inf02" ? "INF.02/EE.08" : "INF.03/EE.09/E.14";
  return {
    title: `Fiszki ${qualification}`,
    description: `Powtarzaj wszystkie pytania na egzamin teoretyczny ${qualification} w formie fiszek`,
  };
}

async function getKnownQuestions(userId: string, examId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("flashcards")
    .select("question_id_array")
    .eq("user_id", userId)
    .eq("exam_id", examId)
    .single();
  if (!data || error) {
    return [];
  }
  return data.question_id_array;
}

async function getQuestionIdArray(examId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("questions")
    .select("id")
    .eq("exam_id", examId);

  if (!data || data.length < 1 || error) {
    throw new Error("Failed to fetch questions from the database");
  }
  return data.map((obj) => obj.id);
}

export default async function FlashcardsPage(props: {
  params: Promise<{ code: string }>;
}) {
  const params = await props.params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("exams")
    .select("id, name")
    .eq("code", params.code)
    .single();

  if (error || !data) {
    notFound();
  }

  const { user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  const knownQuestions = await getKnownQuestions(user.id, data.id);
  const questionIds = await getQuestionIdArray(data.id);

  return (
    <>
      <PageTitle title="Fiszki" subtitle={data.name} />
      <div className="flex flex-col gap-4 w-full max-w-[576px] sm:mx-auto">
        <Flashcards
          fetchedKnownQuestions={knownQuestions}
          questionIds={questionIds}
          examId={data.id}
        />
      </div>
    </>
  );
}
