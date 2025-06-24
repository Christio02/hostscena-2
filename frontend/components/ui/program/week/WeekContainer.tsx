import BorderTitleBar from '@/components/ui/borderTitleBar/BorderTitleBar'
import WeekColumn from '@/components/ui/program/week/WeekColumn'
import Event from '@/interfaces/event'
import { groupEventsByDate } from '@/utils/groupEventsByDate'

interface Props {
  hasLink?: boolean
  onSwitch?: () => void
  events: Event[]
}

export default function WeekContainer({ hasLink = true, onSwitch, events }: Props) {
  const grouped = groupEventsByDate(events)
  const dates = Object.keys(grouped).sort()

  return (
    <>
      {hasLink ? (
        <BorderTitleBar
          title="Ukeoversikt"
          linkText="Dagsoversikt"
          onClick={onSwitch}
          isArrowReversed={true}
        />
      ) : (
        <BorderTitleBar title="Ukeoversikt" />
      )}
      <div className="overflow-x-auto w-full scroll-pl-[40px] snap-x snap-mandatory">
        <div className="flex gap-[20px] px-[20px] tablet:px-[40px] w-fit">
          {dates.map((date) => (
            <WeekColumn key={date} date={date} events={grouped[date]} />
          ))}
        </div>
      </div>
    </>
  )
}
