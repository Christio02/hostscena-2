import NewsDetail from '@/components/layout/news/NewsDetail'
import { getNewsBySlug } from '@/lib/sanity-cache'
import { notFound } from 'next/navigation'

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const newsItem = await getNewsBySlug(slug)

  if (!newsItem) return notFound()

  return <NewsDetail news={newsItem} />
}
