import Marquee from '@/components/ui/marquee/Marquee'
import type Location from '@/interfaces/location'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  location: Location
}

export default function LocationCard({ location }: Props) {
  const { name, image, link } = location

  const Wrapper = link ? Link : 'div'

  return (
    <Wrapper href={link ?? '#'}>
      <div className="w-[220px] tablet:hover-lift">
        <div className="relative w-full h-[220px] ">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="px-[10px] py-[10px] h-[45px] flex items-center border border-secondary border-t-0">
          <Marquee text={name} className="text-h6 w-full" />
        </div>
      </div>
    </Wrapper>
  )
}
