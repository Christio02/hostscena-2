import type Person from '@/interfaces/person'
import PersonCard from './PersonCard'

interface Props {
  persons: Person[]
  isIntern?: boolean
}

export default function PersonGrid({ persons, isIntern = false }: Props) {
  const gridClasses = isIntern
    ? 'grid grid-cols-1 phone:grid-cols-3 desktop:grid-cols-6'
    : 'grid grid-cols-1 phone:grid-cols-2 desktop:grid-cols-4'

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[750px] desktop:max-w-full">
        <div className={`${gridClasses}  phone:gap-[20px] justify-items-center`}>
          {persons.map((p, i) => (
            <PersonCard key={p.name} person={p} isIntern={isIntern} showTopBorder={i !== 0} />
          ))}
        </div>
      </div>
    </div>
  )
}
