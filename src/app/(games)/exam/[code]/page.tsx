import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Exam from "@/components/exam/exam";
import PageTitle from "@/components/ui/page-title";
import { QUALIFICATIONS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import type { ExamQuestion } from "@/types/exam-question";

export async function generateMetadata(props: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const qualification = QUALIFICATIONS.find(
    (qualification) => qualification.code === params.code
  )?.name;
  return {
    title: `Egzamin ${qualification}`,
    description: `Rozwiąż losowy godzinny 40-pytaniowy egzamin teoretyczny dla zawodu technik informatyk z kwalifikacji ${qualification}`,
  };
}

async function getQuestions(id: number): Promise<ExamQuestion[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_random_questions", {
    amount: 40,
    exam_id: id,
  });
  if (error) throw new Error(`Wystąpił błąd: ${error.message}`);
  if (!data) throw new Error("Błąd pobierania pytań z bazy. Spróbuj ponownie");
  return data.map((question) => {
    return {
      ...question,
      answers: question.answers.sort((_a: string, _b: string) => 0.5 - Math.random()),
      selected_answer: null,
      correct_selected: false,
    };
  });
}

async function getExamData(code: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exams")
    .select("id, name")
    .eq("code", code)
    .single();
  if (error || !data) {
    notFound();
  } else {
    return data;
  }
}

export default async function ExamPage(props: { params: Promise<{ code: string }> }) {
  const params = await props.params;
  const examData = await getExamData(params.code);
  const fetchedQuestions = await getQuestions(examData.id);

  return (
    <>
      <PageTitle title="Egzamin" subtitle={examData.name} />
      <Exam examId={examData.id} fetchedQuestions={fetchedQuestions} />
    </>
  );
}
