import { FC } from 'react'

interface Props {
  date: string
  className?: string
  format?: Intl.DateTimeFormatOptions
}

const DateBadge: FC<Props> = ({ date, className = '' }) => {
  const d = new Date(date)
  const weekday = d.toLocaleDateString('no-NO', { weekday: 'short' }).toUpperCase()
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')

  return (
    <div
      className={`text-primary text-center text-[1.5rem] font-wittgenstein py-[10px] uppercase ${className}`}
    >
      {`${weekday} ${day}.${month}`}
    </div>
  )
}

export default DateBadge
