import HomeHeader from '@/components/layout/navbar/homepage/HomeHeader'
import HomeMobileNavbar from '@/components/layout/navbar/homepage/HomeMobileNavbar'
import HomeNavbar from '@/components/layout/navbar/homepage/HomeNavbar'
import BlackTitleBar from '@/components/ui/blackTitleBar/BlackTitleBar'
import BuyFestivalPass from '@/components/ui/buyFestivalPass/BuyFestivalPass'
import BuyFestivalPassHome from '@/components/ui/buyFestivalPass/BuyFestivalPassHome'
import ImageCarousel from '@/components/ui/imageCarousel/ImageCarousel'
import ImageSnake from '@/components/ui/imageSnake/ImageSnake'
import NewsGrid from '@/components/ui/news/NewsGrid'
import WeekContainer from '@/components/ui/program/week/WeekContainer'
import { HomeProps } from '@/interfaces/home'
import { getEvents, getHome, getNews } from '@/lib/sanity-cache'
import { buyTickets1, buyTickets2 } from '@/mockdata/text'

export default async function Home() {
  const [events, home, news] = await Promise.all([getEvents(), getHome(), getNews()])

  const homeData: HomeProps = {
    ...home,
    startDate: home?.startDate || 'Dato kommer',
    endDate: home?.endDate || 'Dato kommer',
    imageGallery: home?.imageGallery || [],
    backgroundVideo: home?.backgroundVideo || undefined,
  }

  return (
    <>
      <HomeHeader startDate={homeData.startDate} endDate={homeData.endDate} />
      <ImageCarousel className="block tablet:hidden" />
      <ImageSnake images={homeData.imageGallery ?? []} />
      <HomeNavbar />
      <HomeMobileNavbar />
      <BlackTitleBar
        title="Program"
        linkText="alle arrangementer"
        linkUrl="/program"
        hideLinkOnMobile={true}
      />
      <WeekContainer hasLink={false} events={events} />
      <BlackTitleBar title="Billetter" linkText="mer info" linkUrl="/billetter" />
      <BuyFestivalPassHome
        imageSrc="/assets/images/snake/Hostscena-bildeslange-bilde07.jpg"
        button={
          <button className="btn font-wittgenstein text-nowrap text-[3.688rem] px-[26px] py-[13px]">
            Kjøp festivalpass her
          </button>
        }
      />

      <BuyFestivalPass
        imageSrc="/assets/images/snake/Hostscena-bildeslange-bilde07.jpg"
        className="min-h-[300px] block tablet:hidden w-full"
        button={
          <button className="btn font-wittgenstein max-w-[594px] text-nowrap text-h4 tablet:!text-[3.688rem] px-[20px] tablet:px-[26px] py-[10px] tablet:py-[13px]">
            Kjøp festivalpass her
          </button>
        }
        content={
          <div className="bg-white flex flex-col gap-[40px] p-[20px] font-source text-[1.188rem] tablet:max-w-[594px] tablet:border border-secondary">
            <p>{buyTickets1}</p>
            <p>{buyTickets2}</p>
          </div>
        }
      />
      <BlackTitleBar title="Nyheter" linkText="alle nyheter" linkUrl="/nyheter" />
      <NewsGrid news={news} limitMobile={3} limitTablet={4} limitDesktop={6} />
    </>
  )
}
