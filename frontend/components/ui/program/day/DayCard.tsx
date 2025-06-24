import SanityImage from '@/components/shared/CardImage'
import Event from '@/interfaces/event'
import Link from 'next/link'

interface Props {
  event: Event
}

export default function DayCard({ event }: Props) {
  const { title, image, performer, startTime, endTime, location, slug } = event

  return (
    <Link href={`/program/${slug.current}`} className="block">
      <div className="w-full border border-secondary hover-lift">
        <div className="relative w-full h-[190px] phone:h-[170px] tablet:h-[260px]">
          <SanityImage imageData={image} title={title} />
        </div>
        <div className="flex flex-col justify-between px-[10px]">
          <div className="py-[10px] border-b border-secondary">
            <h1 className="text-title-s">{title}</h1>
          </div>
          <div className="py-[5px]">
            <p className="text-caption">{performer}</p>
            <p className="text-caption">
              {startTime} - {endTime}
            </p>
            <p className="text-caption">{location}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
