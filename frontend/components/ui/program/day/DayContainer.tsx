import BorderTitleBar from '@/components/ui/borderTitleBar/BorderTitleBar'
import DateBadge from '@/components/ui/program/dateBadge/DateBadge'
import Event from '@/interfaces/event'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'
import { groupEventsByDate } from '@/utils/groupEventsByDate'
import { useEffect, useState } from 'react'
import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from 'react-icons/lia'
import DayGrid from './DayGrid'

type Props = { onSwitch: () => void; events: Event[] }

export default function DayContainer({ onSwitch, events }: Props) {
  const grouped = groupEventsByDate(events)
  const dates = Object.keys(grouped).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  const [hasMounted, setHasMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + dates.length) % dates.length)
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % dates.length)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 990)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isMobile) setActiveIndex(0)
  }, [isMobile])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    <div>
      <BorderTitleBar title="Dagsoversikt" linkText="Ukeoversikt" onClick={onSwitch} />

      {/* Desktop badges */}
      <div className="hidden tablet:flex justify-center gap-[20px] py-[20px]">
        {dates.map((date) => (
          <a key={date} href={`#${date}`}>
            <DateBadge className="text-secondary px-[20px] btn" date={date} />
          </a>
        ))}
      </div>

      {/* Mobile slider nav */}
      <div className="block tablet:hidden px-[20px]">
        <div className="flex items-center justify-center  border-b border-secondary pb-[20px]">
          <div className="flex justify-between min-w-[300px]">
            <button onClick={handlePrev}>
              <LiaLongArrowAltLeftSolid size={44} />
            </button>
            <p className="text-h4 text-center text-nowrap">
              {capitalizeFirstLetter(
                new Date(dates[activeIndex]).toLocaleDateString('no-NO', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'numeric',
                }),
              )}
            </p>
            <button onClick={handleNext}>
              <LiaLongArrowAltRightSolid size={44} />
            </button>
          </div>
        </div>
      </div>

      {/* Render days */}
      <div>
        {dates.map((date, index) => {
          const d = new Date(date)
          const formatted = `${d.toLocaleDateString('no-NO', { weekday: 'long' })} ${d.getDate()}.${
            d.getMonth() + 1
          }`.toLowerCase()
          const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1)

          return (
            <section
              key={date}
              id={date}
              className={`flex flex-col transition-all duration-300 ${
                index === activeIndex || (typeof window !== 'undefined' && window.innerWidth >= 990)
                  ? 'block'
                  : 'hidden'
              }`}
            >
              <div className="hidden tablet:block">
                <BorderTitleBar title={capitalized} borderTop={false} />
              </div>
              <DayGrid events={grouped[date]} />
            </section>
          )
        })}
      </div>
    </div>
  )
}
