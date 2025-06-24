'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  const isHome = pathname === '/'
  if (isHome) return null
  return <Navbar />
}
