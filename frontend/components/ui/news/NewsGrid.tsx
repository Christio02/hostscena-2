'use client'

import type News from '@/interfaces/news'
import { useEffect, useState } from 'react'
import NewsCard from './NewsCard'

interface NewsGridProps {
  news: News[]
  limitMobile?: number
  limitTablet?: number
  limitDesktop?: number
}

export default function NewsGrid({ news, limitMobile, limitTablet, limitDesktop }: NewsGridProps) {
  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getVisibleNews = () => {
    if (windowWidth === null) return news

    if (windowWidth < 989 && limitMobile !== undefined) {
      return news.slice(0, limitMobile)
    } else if (windowWidth < 1440 && limitTablet !== undefined) {
      return news.slice(0, limitTablet)
    } else if (limitDesktop !== undefined) {
      return news.slice(0, limitDesktop)
    }

    return news
  }

  const visibleNews = getVisibleNews()

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-[20px] p-[20px]">
      {visibleNews.map((item, index) => (
        <NewsCard key={index} news={item} />
      ))}
    </div>
  )
}
