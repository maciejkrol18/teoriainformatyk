"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { HardestQuestionsEntry } from "@/types/hardest-questions-entry";

export const columns: ColumnDef<HardestQuestionsEntry>[] = [
  {
    accessorKey: "question_id",
    header: "ID",
  },
  {
    // accessorFn: (row) =>
    //   row.questions?.content ? row.questions?.content : 'Treść pytania',
    header: "Treść pytania",
    cell: ({ row }) => {
      return (
        <div className="max-w-xl text-ellipsis overflow-hidden whitespace-nowrap">
          {row.original.questions?.content || "Treść pytania"}
        </div>
      );
    },
  },
  {
    accessorKey: "count",
    header: "Ilość dodań",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.question_id;
      return (
        <Button asChild size="sm" variant="secondary">
          <Link href={`/question/${id}`}>Szczegóły</Link>
        </Button>
      );
    },
  },
];
