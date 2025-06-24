import NewsClient from '@/components/ui/news/NewsClient'
import { getNews } from '@/lib/sanity-cache'

export default async function Nyheter() {
  const news = await getNews()
  return <NewsClient news={news} />
}
