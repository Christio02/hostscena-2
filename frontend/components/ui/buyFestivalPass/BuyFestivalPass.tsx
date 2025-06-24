import Image from 'next/image'
import { ReactNode } from 'react'

interface BackgroundBoxesProps {
  imageSrc: string
  className?: string
  button: ReactNode
  content?: ReactNode
}

export default function BuyFestivalPass({
  imageSrc,
  className = '',
  button,
  content,
}: BackgroundBoxesProps) {
  return (
    <div className={`${className}`}>
      {/* Background Image with button and tablet content */}
      <div
        className={`relative flex items-center justify-center w-full ${className}`}
        style={{ height: 'inherit' }}
      >
        <Image
          src={imageSrc}
          alt="Background"
          fill
          className="object-cover object-top -z-10"
          priority
        />
        <div className="flex flex-col items-center tablet:gap-[60px] z-10">
          <div>{button}</div>
          {/* Only show on tablet+ */}
          {content && <div className="hidden tablet:block">{content}</div>}
        </div>
      </div>

      {/* Only show on mobile */}
      {content && <div className="block border-0 tablet:hidden py-[10px]">{content}</div>}
    </div>
  )
}
