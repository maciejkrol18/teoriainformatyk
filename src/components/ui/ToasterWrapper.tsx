'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTheme } from 'next-themes'
import { Toaster } from 'sonner'

const desktop = '(min-width: 768px)'

export default function ToasterWrapper() {
  const isDesktop = useMediaQuery(desktop)
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme as 'dark' | 'light'

  return (
    <Toaster
      theme={theme ?? 'system'}
      position={isDesktop ? 'bottom-right' : 'top-center'}
      richColors={true}
    />
  )
}
