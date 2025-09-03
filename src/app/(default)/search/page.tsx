import SearchBar from "@/components/search/search-bar";
import SearchPagination from "@/components/search/search-pagination";
import SearchResult from "@/components/search/search-result";
import getUser from "@/lib/supabase/get-user";
import { createClient } from "@/lib/supabase/server";
import type { SearchFilters } from "@/types/search-filters";

const RESULTS_PER_PAGE = 10;

export const metadata = {
  title: "Wyszukiwarka",
  description:
    "Wyszukaj wszystkie dostępne pytania w naszej bazie danych dla egzaminów INF.02/EE.08 oraz INF.03/EE.09/E.14",
};

interface SearchPageProps {
  searchParams: Promise<SearchFilters>;
}

async function getHardCollection() {
  const { user } = await getUser();
  if (!user) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("hard_collections")
    .select("question_id_array")
    .eq("user_id", user.id)
    .single();
  return data?.question_id_array || [];
}

async function fetchPaginatedQuestions({
  query,
  page = "1",
  examId,
  sortBy = "id",
  hasImage,
  hardOnly,
}: SearchFilters) {
  const supabase = await createClient();

  const pageOffset = (Number.parseInt(page) - 1) * RESULTS_PER_PAGE;

  const dbQuery = supabase
    .from("questions")
    .select("id, content", { count: "exact" })
    .range(pageOffset, pageOffset + RESULTS_PER_PAGE - 1)
    .order(sortBy);

  if (examId) {
    dbQuery.eq("exam_id", Number.parseInt(examId));
  }

  if (query) {
    dbQuery.textSearch("content", query, {
      type: "websearch",
    });
  }

  if (hardOnly) {
    const hardCollection = (await getHardCollection()) ?? [];
    dbQuery.in("id", hardCollection);
  }

  if (hasImage) {
    dbQuery.eq("image", Boolean(hasImage));
  }

  const { data, count, error } = await dbQuery;

  if (error) {
    throw new Error("Nie udało się wykonać wyszukiwania. Spróbuj ponownie.");
  }

  return {
    results: data,
    totalAmount: count,
  };
}

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;
  const page = searchParams.page || "1";
  const examId = searchParams.examId;
  const sortBy = searchParams.sortBy;
  const searchQuery = searchParams.query;
  const hasImage = searchParams.hasImage;
  const hardOnly = searchParams.hardOnly;

  const { results, totalAmount } = await fetchPaginatedQuestions({
    query: searchQuery,
    page: page,
    examId: examId,
    sortBy: sortBy,
    hasImage: hasImage,
    hardOnly: hardOnly,
  });

  const totalPages = totalAmount ? Math.ceil(totalAmount / RESULTS_PER_PAGE) : 1;

  return (
    <div className="flex flex-col gap-8 md:w-full md:max-w-xl md:mx-auto">
      <SearchBar />
      <div className="flex flex-col gap-4">
        {results && results.length > 0 ? (
          results.map((question) => {
            return <SearchResult question={question} key={question.id} />;
          })
        ) : (
          <p className="text-muted text-center">Brak wyników dla twojego wyszukiwania</p>
        )}
      </div>
      <SearchPagination page={Number.parseInt(page)} totalPages={totalPages} />
    </div>
  );
}
