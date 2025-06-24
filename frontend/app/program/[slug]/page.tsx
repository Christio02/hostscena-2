import EventDetail from '@/components/layout/event/EventDetail'
import { getEventBySlug } from '@/lib/sanity-cache'

import { notFound } from 'next/navigation'

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return notFound()
  }

  return <EventDetail event={event} />
}
