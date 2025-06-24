import DateBadge from '@/components/ui/program/dateBadge/DateBadge'
import type Event from '@/interfaces/event'
import WeekCell from './WeekCell'

interface Props {
  date: string
  events: Event[]
}

export default function WeekColumn({ date, events }: Props) {
  return (
    <div className="flex flex-col w-full gap-[20px] py-[20px]">
      <DateBadge date={date} className="min-w-[17vw] bg-secondary" />
      <div>
        {events
          .sort((a, b) => a.startTime.localeCompare(b.startTime))
          .map((event, index) => (
            <WeekCell key={index} event={event} isLast={index === events.length - 1} />
          ))}
      </div>
    </div>
  )
}
