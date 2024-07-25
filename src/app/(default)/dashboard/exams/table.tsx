'use client'

import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import { deleteExamScores } from './actions'
import { toast } from 'sonner'
import { columns } from './columns'

interface ExamHistoryTable {
  data: ExamHistoryEntry[]
  canPrevPage: boolean
  canNextPage: boolean
  pageNumber: number
  totalPages: number
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
  })

  const handleDeleteSelectedRows = async () => {
    const scoresToDelete = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.score_id)
    const { success, error } = await deleteExamScores(scoresToDelete)
    if (success) {
      toast.success('Usunięto wybrane wyniki')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      window && window.location.reload()
    } else {
      toast.error(`Wystąpił błąd w trakcie usuwania wyników: ${error}`)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable table={table} columns={columns} />
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <p>
            Wybrano {table.getSelectedRowModel().rows.length} z {data.length}{' '}
            wyświetlanych wyników
          </p>
          <Button variant="outline" size="sm" onClick={handleDeleteSelectedRows}>
            Usuń wybrane
          </Button>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <Button asChild variant="outline">
            <Link href="?page=1" scroll={false}>
              <ChevronsLeft />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={!canPrevPage ? '#' : `?page=${pageNumber - 1}`} scroll={false}>
              <ChevronLeft />
            </Link>
          </Button>
          <p className="text-center">
            Strona {pageNumber} z {totalPages}
          </p>
          <Button asChild variant="outline">
            <Link href={!canNextPage ? '#' : `?page=${pageNumber + 1}`} scroll={false}>
              <ChevronRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`?page=${totalPages}`} scroll={false}>
              <ChevronsRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
