import type Person from '@/interfaces/person'
import ContributorCard from './ContributorCard'

interface Props {
  persons: Person[]
}

export default function ContributorsGrid({ persons }: Props) {
  return (
    <div className="w-full flex justify-center px-[20px]">
      <div className="w-full flex flex-col phone:flex-row phone:flex-wrap justify-center phone:gap-[20px] pb-[20px]">
        {persons.map((p, i) => (
          <div key={p.name} className="flex justify-center">
            <ContributorCard person={p} showTopBorder={i !== 0} />
          </div>
        ))}
      </div>
    </div>
  )
}
