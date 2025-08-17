"use client";

import { createClient } from "@/lib/supabase/client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SearchFilters } from "@/types/search-filters";
import getUser from "@/lib/supabase/get-user";

interface ExamData {
  id: number;
  name: string;
}

export default function SearchFiltersDropdown() {
  const [examData, setExamData] = useState<ExamData[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterChange = (filter: keyof SearchFilters, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const fetchExams = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from("exams").select("id, name");

    if (error || !data) {
      setExamData(null);
    } else {
      setExamData(data);
    }
  };

  const fetchUserId = async () => {
    const { user } = await getUser();
    setUserId(!user ? null : user.id);
  };

  useEffect(() => {
    fetchExams();
    fetchUserId();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SlidersHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filtruj wyszukiwanie</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Kwalifikacja</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={searchParams.get("examId") || ""}
          onValueChange={(value) => handleFilterChange("examId", value)}
        >
          <DropdownMenuRadioItem value={""}>Wszystkie</DropdownMenuRadioItem>
          {examData ? (
            examData.map((exam) => (
              <DropdownMenuRadioItem value={exam.id.toString()} key={exam.id}>
                {exam.name}
              </DropdownMenuRadioItem>
            ))
          ) : (
            <p className="py-1.5 pl-8 pr-2 text-sm">
              Ładowanie kwalifikacji...
            </p>
          )}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sortuj według</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={searchParams.get("sortBy") || "id"}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
        >
          <DropdownMenuRadioItem value={"id"}>ID</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"content"}>
            Alfabetycznie
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Załączony obrazek</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={searchParams.get("hasImage") || ""}
          onValueChange={(value) => handleFilterChange("hasImage", value)}
        >
          <DropdownMenuRadioItem value={""}>Wszystkie</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"true"}>Tak</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"false"}>Nie</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        {userId && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Użytkownik</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={Boolean(searchParams.get("hardOnly"))}
              onCheckedChange={(value) =>
                handleFilterChange("hardOnly", value ? "true" : "")
              }
            >
              Tylko zbiór trudnych
            </DropdownMenuCheckboxItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
