'use client'

import { useEffect, useRef, useState } from 'react'
import { HiArrowLongRight } from 'react-icons/hi2'

interface Props {
  content: React.ReactNode
}

export default function CreditsToggle({ content }: Props) {
  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && ref.current) {
      setHeight(ref.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [open])

  return (
    <div className="block tablet:hidden w-full border border-secondary">
      <button
        className="w-full  flex justify-between items-center p-[20px] text-left"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>Vis kreditering</span>
        <HiArrowLongRight
          size={32}
          className={`transform transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={ref} className="p-[20px] border-secondary">
          {content}
        </div>
      </div>
    </div>
  )
}
