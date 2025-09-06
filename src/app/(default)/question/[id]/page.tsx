import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import QuestionDetails from "@/components/ui/question-details";
import { QUALIFICATIONS } from "@/lib/constants";
import getUser from "@/lib/supabase/get-user";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 86400;

const getQuestion = cache(async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", Number.parseInt(id))
    .single();

  if (!data || error) {
    notFound();
  } else {
    return data;
  }
});

const getHardCollection = async (userId: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hard_collections")
    .select("question_id_array")
    .eq("user_id", userId)
    .single();
  return data?.question_id_array || [];
};

export async function generateMetadata(props: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {
  const params = await props.params;
  const question = await getQuestion(params.id);
  if (question === null) {
    return {
      title: `Pytanie #${params.id}`,
      description:
        "Znajdź odpowiedzi do pytania dla egzaminu teoretycznego z zawodu technik informatyk z obu kwalifikacji",
    };
  }

  return {
    title: `Pytanie ${params.id}`,
    description: `"${
      question.content
    }" - znajdź odpowiedzi do pytania dla egzaminu teoretycznego z zawodu technik informatyk z kwalifikacji ${
      QUALIFICATIONS[question.exam_id]?.code
    }`,
  };
}

export async function generateStaticParams(): Promise<unknown[]> {
  console.log("Started generating static params for /question route");

  const headers = {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  } as HeadersInit;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questions?select=id`,
    { headers }
  );

  if (!response.ok) {
    console.error(
      "Failed to fetch all questions when generating static params for /question route:",
      await response.text()
    );
    return [];
  }

  const data = (await response.json()) as Record<"id", number>[];

  console.log("Finished generating static params for /question route");
  return data.map((question) => ({
    id: String(question.id),
  }));
}

export default async function QuestionPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const params = await props.params;
  const question = await getQuestion(params.id);
  const { user } = await getUser();
  const hardCollection = user ? await getHardCollection(user.id) : [];
  return (
    <div className="flex flex-col gap-8 md:w-full md:max-w-xl md:mx-auto">
      <h1 className="text-2xl font-bold">Pytanie #{question.id}</h1>
      <QuestionDetails
        question={question}
        fetchedHardCollection={hardCollection}
        isAuthenticated={user !== null}
      />
    </div>
  );
}
