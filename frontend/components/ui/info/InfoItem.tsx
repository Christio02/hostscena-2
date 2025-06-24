'use client'

import { useState, useRef, useEffect } from 'react'
import { HiArrowLongRight } from 'react-icons/hi2'

interface Props {
  title?: string
  content?: React.ReactNode
  isLast?: boolean
}

export default function InfoItem({ title, content, isLast }: Props) {
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
    <div className={`border-t border-secondary ${isLast ? 'border-b' : ''}`}>
      <div
        className="py-[10px] tablet:px-[20px] flex justify-between items-center tablet:hover:bg-secondary tablet:hover:text-primary transition-all duration-300 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>{title && <h3 className="text-h3">{title}</h3>}</div>
        <p className="flex items-center gap-1 text-h6">
          LES MER
          <HiArrowLongRight
            size={30}
            className={`transform transition-transform duration-300 ${
              open ? 'rotate-90' : 'rotate-0'
            }`}
          />
        </p>
      </div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={ref} className="py-[40px] items-center flex w-full justify-center">
          {content}
        </div>
      </div>
    </div>
  )
}
