import ProgramClient from '@/components/ui/program/ProgramClient'
import { getEvents } from '@/lib/sanity-cache'

export default async function ProgramPage() {
  const events = await getEvents()
  return <ProgramClient events={events} />
}
