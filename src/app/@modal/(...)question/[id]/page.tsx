import { notFound } from "next/navigation";
import { cache } from "react";
import QuestionModal from "@/components/search/question-modal";
import getUser from "@/lib/supabase/get-user";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 36000;

const getQuestion = cache(async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .single();

  if (!data || error) {
    notFound();
  } else {
    return data;
  }
});

const getHardCollection = cache(async (userId: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hard_collections")
    .select("question_id_array")
    .eq("user_id", userId)
    .single();
  return data?.question_id_array || [];
});

export default async function ParallelQuestionPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ hideHardCollection: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const question = await getQuestion(params.id);
  const { user } = await getUser();
  const hardCollection = user ? await getHardCollection(user.id) : [];

  return (
    <QuestionModal
      question={question}
      fetchedHardCollection={hardCollection}
      isAuthenticated={user !== null}
      // biome-ignore lint/complexity/noExtraBooleanCast: this doesn't get coerced
      showHardCollectionButton={!Boolean(searchParams.hideHardCollection)}
    />
  );
}
