"use client";

import { Search } from "lucide-react";
import { useRef } from "react";
import SearchFiltersDropdown from "./search-filters-dropdown";
import SearchInput from "./search-input";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: the onclick event is only used to focus the input
    <div
      className="flex justify-between gap-2 p-4 rounded-full bg-background-light text-muted hover:cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <Search />
      <SearchInput inputRef={inputRef} />
      <SearchFiltersDropdown />
    </div>
  );
}
