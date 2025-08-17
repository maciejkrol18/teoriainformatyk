import OneQuestion from "./one-question";
import PageTitle from "@/components/ui/page-title";
import getUser from "@/lib/supabase/get-user";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  // TODO: Determine the qualification text based off the db
  const qualification =
    params.code === "inf02" ? "INF.02/EE.08" : "INF.03/EE.09/E.14";
  return {
    title: `Jedno pytanie ${qualification}`,
    description: `Nieskończenie losuj i rozwiązuj jedno pytanie z kwalifikacji ${qualification} teoretycznego egzaminu zawodu technik informatyk`,
  };
}

async function getHardCollection(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hard_collections")
    .select("question_id_array")
    .eq("user_id", userId)
    .single();

  return data?.question_id_array || [];
}

export default async function OneQuestionPage(props: {
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
  const fetchedHardCollection = user ? await getHardCollection(user.id) : [];

  return (
    <>
      <PageTitle title="Jedno pytanie" subtitle={data.name} />
      <OneQuestion
        examId={data.id}
        userId={user?.id || null}
        fetchedHardCollection={fetchedHardCollection}
      />
    </>
  );
}
