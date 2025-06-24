import News from '@/interfaces/news'
import BlackTitleBar from '../blackTitleBar/BlackTitleBar'
import NewsGrid from './NewsGrid'

interface NewsProps {
  news: News[]
}

export default function NewsClient({ news }: NewsProps) {
  return (
    <section>
      <BlackTitleBar title="Nyheter" />
      <NewsGrid news={news} />
    </section>
  )
}
