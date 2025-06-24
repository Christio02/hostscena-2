import Image from 'next/image'
import type Person from '@/interfaces/person'

interface Props {
  person: Person
}

export default function PersonCard({ person }: Props) {
  const { name, image, email, phone, jobTitle } = person

  return (
    <div className="flex w-full max-w-full min-h-[125px] tablet:min-h-[165px] desktop:min-h-[220px]">
      <div className="w-[20%] min-w-[100px] relative">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="pl-[10px] flex flex-col text-2s font-light phone:text-caption w-[80%]">
        <p className="font-bold">{name}</p>
        {jobTitle && <p>{jobTitle}</p>}
        {phone && <p>{phone}</p>}
        {email && <p>{email}</p>}
      </div>
    </div>
  )
}
