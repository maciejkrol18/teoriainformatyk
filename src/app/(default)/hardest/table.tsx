"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { HardestQuestionsEntry } from "@/types/hardest-questions-entry";
import { columns } from "./columns";

interface HardestQuestionsTableProps {
  data: HardestQuestionsEntry[];
}

export default function HardestQuestionsTable({ data }: HardestQuestionsTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} columns={columns} />;
}
