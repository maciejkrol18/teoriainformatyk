import getUser from "@/lib/supabase/get-user";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import pl from "dayjs/locale/pl";
import { cache } from "react";
import HardestQuestionsTable from "./table";

export const metadata = {
  title: "Najtrudniejsze pytania",
};

dayjs.locale(pl);

export const revalidate = 36000;

const fetchHardestQuestions = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hardest_questions")
    .select("created_at, question_id, count, questions (content)");
  if (!data || error) {
    throw new Error(
      `Wystąpił błąd podczas ładowania strony. Spróbuj ponownie później. Treść błędu: ${
        error.message || "brak"
      }`
    );
  }
  return data;
});

export default async function HardestQuestionsPage() {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }

  const data = await fetchHardestQuestions();

  const getLastUpdateDate = (): string => {
    if (data[0]?.created_at) {
      return dayjs(data[0].created_at).format("D MMMM YYYY, H[:]mm");
    }
    return "nieznana";
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-display">Najtrudniejsze pytania</h1>
        <p className="text-muted max-w-2xl mx-auto">
          Poniżej znajduje się tabela z pytaniami które są najczęściej dodawane
          do zbiorów trudnych pytań przez użytkowników naszego serwisu. Co 24
          godziny strona analizuje zbiory trudnych pytań użytkowników i
          aktualizuje poniższe dane
        </p>
        <p className="text-lg text-accent">
          Data ostatniej aktualizacji: {getLastUpdateDate()}
        </p>
      </div>
      <HardestQuestionsTable data={data} />
    </div>
  );
}
