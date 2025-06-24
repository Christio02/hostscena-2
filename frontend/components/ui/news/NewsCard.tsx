import Marquee from '@/components/ui/marquee/Marquee'
import News from '@/interfaces/news'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  news: News
}

export default function NewsCard({ news }: Props) {
  return (
    <Link href={`/nyheter/${news.slug.current}`}>
      <div className="w-full hover-lift">
        <div className="relative w-full h-[190px] mobile:h-[260px]">
          <Image
            src={news.image.asset.url}
            alt={news.title}
            fill
            className="object-cover w-full"
            priority
          />
        </div>
        <div className="px-[10px] py-[10px] h-[45px] flex items-center border border-secondary border-t-0">
          <Marquee text={news.title} className="text-h6 w-full" />
        </div>
      </div>
    </Link>
  )
}
