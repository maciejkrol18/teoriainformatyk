'use client'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { Input } from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'
import { SlidersHorizontal } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface ExamData {
  id: number
  name: string
}

export default function ExamFiltersDropdown() {
  const [examData, setExamData] = useState<ExamData[] | null>(null)
  const [scoreGreaterThan, setScoreGreaterThan] = useState<string>('')
  const [scoreLessThan, setScoreLessThan] = useState<string>('')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleFilterChange = (filter: keyof ExamHistoryFilters, value?: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(filter, value)
    } else {
      params.delete(filter)
    }
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleGreaterThanChange = useDebouncedCallback((value) => {
    handleFilterChange('scoreMoreThan', value)
  }, 300)

  const handleLessThanChange = useDebouncedCallback((value) => {
    handleFilterChange('scoreLessThan', value)
  }, 300)

  const fetchExams = async () => {
    const supabase = createClient()

    const { data, error } = await supabase.from('exams').select('id, name')

    if (error || !data) {
      setExamData(null)
    } else {
      setExamData(data)
    }
  }

  useEffect(() => {
    fetchExams()
  }, [])
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
          value={searchParams.get('examId') || ''}
          onValueChange={(value) => handleFilterChange('examId', value)}
        >
          <DropdownMenuRadioItem value={''}>Wszystkie</DropdownMenuRadioItem>
          {examData ? (
            examData.map((exam) => (
              <DropdownMenuRadioItem value={exam.id.toString()} key={exam.id}>
                {exam.name}
              </DropdownMenuRadioItem>
            ))
          ) : (
            <p className="py-1.5 pl-8 pr-2 text-sm">Ładowanie kwalifikacji...</p>
          )}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sortuj według</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={searchParams.get('sortBy') || 'id'}
          onValueChange={(value) => handleFilterChange('sortBy', value)}
        >
          <DropdownMenuRadioItem value={'created_at'}>Data</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={'percentage_score'}>
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
            defaultValue={searchParams.get('scoreGreaterThan')?.toString()}
            type="number"
            min={0}
            max={100}
            onChange={(e) => {
              setScoreGreaterThan(e.target.value)
              handleGreaterThanChange(e.target.value)
            }}
          />
          <p>Mniejszy niż (%)</p>
          <Input
            className="h-6"
            value={scoreLessThan}
            defaultValue={searchParams.get('scoreLessThan')?.toString()}
            type="number"
            min={0}
            max={100}
            onChange={(e) => {
              setScoreLessThan(e.target.value)
              handleLessThanChange(e.target.value)
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
