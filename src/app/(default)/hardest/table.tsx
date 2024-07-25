'use client'

import { HardestQuestionsEntry } from '@/types/hardest-questions-entry'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { columns } from './columns'
import { DataTable } from '@/components/ui/DataTable'

interface HardestQuestionsTableProps {
  data: HardestQuestionsEntry[]
}

export default function HardestQuestionsTable({ data }: HardestQuestionsTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return <DataTable table={table} columns={columns} />
}
