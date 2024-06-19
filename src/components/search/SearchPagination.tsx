"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/Button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface SearchPaginationProps {
  page: number
  totalPages: number
}

export default function SearchPagination({ page, totalPages }: SearchPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updatePage = (page: string) => {
    const currentUrl = new URLSearchParams(Array.from(searchParams.entries()))
    if (!page) {
      currentUrl.delete("page")
    } else {
      currentUrl.set("page", page)
    }
    const search = currentUrl.toString()
    const searchQuery = search ? `?${search}` : ""
    router.push(`${pathname}${searchQuery}`, { scroll: false })
  }

  const handlePrev = () => {
    if (page - 1 >= 1) {
      updatePage((page - 1).toString())
    }
  }

  const handleNext = () => {
    if (page + 1 <= totalPages) {
      updatePage((page + 1).toString())
    }
  }

  return (
    <div className="flex gap-4 items-center justify-center">
      <Button onClick={() => updatePage("1")} variant={"outline"}>
        <ChevronsLeft />
      </Button>
      <Button onClick={handlePrev} variant={"outline"}>
        <ChevronLeft />
      </Button>
      Strona {page} z {totalPages}
      <Button onClick={handleNext} variant={"outline"}>
        <ChevronRight />
      </Button>
      <Button onClick={() => updatePage(totalPages.toString())} variant={"outline"}>
        <ChevronsRight />
      </Button>
    </div>
  )
}
