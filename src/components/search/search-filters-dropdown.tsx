"use client";

import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { QUALIFICATIONS } from "@/lib/constants";
import type { SearchFilters } from "@/types/search-filters";
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

interface SearchFiltersDropdownProps {
  isAuthenticated: boolean;
}

export default function SearchFiltersDropdown({
  isAuthenticated,
}: SearchFiltersDropdownProps) {
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
          <DropdownMenuRadioItem value={"id"}>ID</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"content"}>Alfabetycznie</DropdownMenuRadioItem>
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
        {isAuthenticated && (
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
