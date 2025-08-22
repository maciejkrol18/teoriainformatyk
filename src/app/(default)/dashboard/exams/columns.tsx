"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import type { ExamHistoryEntry } from "@/types/exam-history-entry";

export const columns: ColumnDef<ExamHistoryEntry>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center h-8 w-8">
        <Checkbox
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Wybierz wszystkie"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center h-8 w-8">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Wybierz wiersz"
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Data",
  },
  {
    accessorFn: (row) => (row.exams ? row.exams.name : "Nieznana"),
    header: "Kwalifikacja",
  },
  {
    accessorKey: "percentage_score",
    header: "Wynik",
    cell: ({ row }) => {
      const percentageScore = Number.parseFloat(row.getValue("percentage_score"));
      return (
        <div className={`${percentageScore > 50 ? "text-green-500" : "text-red-500"}`}>
          {percentageScore}%
        </div>
      );
    },
  },
  {
    accessorKey: "correct",
    header: "Poprawne",
  },
  {
    accessorKey: "incorrect",
    header: "Niepoprawne",
  },
  {
    accessorKey: "unanswered",
    header: "Bez odpowiedzi",
  },
  {
    accessorKey: "time_took",
    header: "Rozwiązano w",
  },
];
