"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { ExamHistoryEntry } from "@/types/exam-history-entry";
import { deleteExamScores } from "./actions";
import { columns } from "./columns";
import ExamFiltersDropdown from "./exams-filters-dropdown";

interface ExamHistoryTable {
  data: ExamHistoryEntry[];
  canPrevPage: boolean;
  canNextPage: boolean;
  pageNumber: number;
  totalPages: number;
}

export default function ExamHistoryTable({
  data,
  canPrevPage,
  canNextPage,
  pageNumber,
  totalPages,
}: ExamHistoryTable) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteSelectedRows = async () => {
    const scoresToDelete = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.score_id);
    const { success, error } = await deleteExamScores(scoresToDelete);
    if (success) {
      toast.success("Usunięto wybrane wyniki");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window?.location.reload();
    } else {
      toast.error(`Wystąpił błąd w trakcie usuwania wyników: ${error}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 justify-between flex-col xl:flex-row">
        <div className="flex gap-4 items-center">
          <p>
            Wybrano {table.getSelectedRowModel().rows.length} z {data.length}{" "}
            wyświetlanych wyników
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeleteSelectedRows}
            disabled={table.getSelectedRowModel().rows.length === 0}
          >
            Usuń wybrane
          </Button>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <Button
            asChild
            variant="outline"
            onClick={() => table.resetRowSelection()}
          >
            <Link href="?page=1" scroll={false}>
              <ChevronsLeft />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            onClick={() => table.resetRowSelection()}
          >
            <Link
              href={!canPrevPage ? "#" : `?page=${pageNumber - 1}`}
              scroll={false}
            >
              <ChevronLeft />
            </Link>
          </Button>
          <p className="text-center">
            Strona {pageNumber} z {totalPages}
          </p>
          <Button
            asChild
            variant="outline"
            onClick={() => table.resetRowSelection()}
          >
            <Link
              href={!canNextPage ? "#" : `?page=${pageNumber + 1}`}
              scroll={false}
            >
              <ChevronRight />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            onClick={() => table.resetRowSelection()}
          >
            <Link href={`?page=${totalPages}`} scroll={false}>
              <ChevronsRight />
            </Link>
          </Button>
        </div>
        <ExamFiltersDropdown />
      </div>
      <DataTable table={table} columns={columns} />
    </div>
  );
}
