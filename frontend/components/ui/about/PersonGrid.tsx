import type Person from '@/interfaces/person'
import PersonCard from './PersonCard'

export default function PersonGrid({ persons }: { persons: Person[] }) {
  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 py-[40px] gap-y-[20px]">
      {persons.map((p) => (
        <PersonCard key={p.name} person={p} />
      ))}
    </div>
  )
}
