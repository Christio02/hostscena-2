'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  text: string
  className?: string
}

export default function Marquee({ text, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [shouldScroll, setShouldScroll] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const textEl = textRef.current

    if (container && textEl) {
      const overflowAmount = textEl.scrollWidth - container.clientWidth

      if (overflowAmount > 0) {
        container.style.setProperty('--marquee-translate', `-${overflowAmount}px`)
        setShouldScroll(true)
      } else {
        setShouldScroll(false)
      }
    }
  }, [text])

  return (
    <div ref={containerRef} className={`relative overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={textRef} className={`inline-block ${shouldScroll ? 'animate-marquee' : ''}`}>
        {text}
      </div>
    </div>
  )
}
