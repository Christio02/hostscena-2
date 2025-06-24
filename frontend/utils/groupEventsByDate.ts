import type Event from '@/interfaces/event'

export const groupEventsByDate = (events: Event[]) => {
  return events.reduce(
    (acc, event) => {
      if (!acc[event.date]) acc[event.date] = []
      acc[event.date].push(event)
      return acc
    },
    {} as Record<string, Event[]>,
  )
}
