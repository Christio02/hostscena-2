import { useEffect, useRef, useState } from 'react'

export default function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScrollY = document.body.scrollHeight - window.innerHeight

      if (currentScrollY <= 0 || currentScrollY >= maxScrollY) return

      if (currentScrollY > lastScrollY.current) {
        setDirection('down')
      } else if (currentScrollY < lastScrollY.current) {
        setDirection('up')
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
