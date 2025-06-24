'use client'
import { HiArrowLongRight } from 'react-icons/hi2'

interface Props {
  title: string
  link: string
  isLast?: boolean
}

export default function ArchiveItem({ title, link, isLast }: Props) {
  return (
    <div className={`border-t border-secondary ${isLast ? 'border-b' : ''}`}>
      <a
        className="py-[10px] tablet:px-[20px] flex gap-[5px] justify-center items-center tablet:hover:bg-secondary tablet:hover:text-primary transition-all duration-300 cursor-pointer"
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        <h3 className="text-h3">{title}</h3>
        <p className="flex items-center  text-h6">
          <HiArrowLongRight size={30} />
        </p>
      </a>
    </div>
  )
}
