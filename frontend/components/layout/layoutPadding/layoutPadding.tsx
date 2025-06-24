'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LayoutPadding() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isHome = pathname === '/'

  return <div className={isHome ? '' : 'pt-[71px] tablet:pt-[79px]'} />
}
