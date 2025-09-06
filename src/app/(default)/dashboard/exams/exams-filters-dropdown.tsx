"use client";

import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { QUALIFICATIONS } from "@/lib/constants";
import type { ExamHistoryFilters } from "@/types/exam-history-filters";

export default function ExamFiltersDropdown() {
  const [scoreGreaterThan, setScoreGreaterThan] = useState<string>("");
  const [scoreLessThan, setScoreLessThan] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterChange = (filter: keyof ExamHistoryFilters, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleGreaterThanChange = useDebouncedCallback((value) => {
    handleFilterChange("scoreMoreThan", value);
  }, 300);

  const handleLessThanChange = useDebouncedCallback((value) => {
    handleFilterChange("scoreLessThan", value);
  }, 300);

  return (
    <DropdownMenu>
      <Button variant="outline" className="max-w-fit" asChild>
        <DropdownMenuTrigger className="max-w-fit">
          Filtruj wyniki
          <SlidersHorizontal />
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent>
        <DropdownMenuLabel>Kwalifikacja</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={searchParams.get("examId") || ""}
          onValueChange={(value) => handleFilterChange("examId", value)}
        >
          <DropdownMenuRadioItem value={""}>Wszystkie</DropdownMenuRadioItem>
          {QUALIFICATIONS.map((qualification) => (
            <DropdownMenuRadioItem
              value={qualification.id.toString()}
              key={qualification.id}
            >
              {qualification.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sortuj według</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={searchParams.get("sortBy") || "id"}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
        >
          <DropdownMenuRadioItem value={"created_at"}>Data</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"percentage_score"}>
            Wynik procentowy
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Wynik</DropdownMenuLabel>
        <div className="flex flex-col py-1.5 pl-8 pr-2 gap-2 text-sm">
          <p>Większy niż (%)</p>
          <Input
            className="h-6"
            value={scoreGreaterThan}
            defaultValue={searchParams.get("scoreGreaterThan")?.toString()}
            type="number"
            min={0}
            max={100}
            onChange={(e) => {
              setScoreGreaterThan(e.target.value);
              handleGreaterThanChange(e.target.value);
            }}
          />
          <p>Mniejszy niż (%)</p>
          <Input
            className="h-6"
            value={scoreLessThan}
            defaultValue={searchParams.get("scoreLessThan")?.toString()}
            type="number"
            min={0}
            max={100}
            onChange={(e) => {
              setScoreLessThan(e.target.value);
              handleLessThanChange(e.target.value);
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
