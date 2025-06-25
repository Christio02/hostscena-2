import HomeHeader from "@/components/layout/navbar/homepage/HomeHeader";
import HomeMobileNavbar from "@/components/layout/navbar/homepage/HomeMobileNavbar";
import HomeNavbar from "@/components/layout/navbar/homepage/HomeNavbar";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import BlackTitleBar from "@/components/ui/blackTitleBar/BlackTitleBar";
import BuyFestivalPass from "@/components/ui/buyFestivalPass/BuyFestivalPass";
import BuyFestivalPassServer from "@/components/ui/buyFestivalPass/BuyFestivalPassServer";
import Carousel from "@/components/ui/carousel/Carousel";
import NewsGrid from "@/components/ui/news/NewsGrid";
import WeekContainer from "@/components/ui/program/week/WeekContainer";
import { HomeProps } from "@/interfaces/home";
import { Tickets } from "@/interfaces/tickets";
import { getEvents, getHome, getNews, getTickets } from "@/lib/sanity-cache";

export default async function Home() {
  const [events, home, news] = await Promise.all([
    getEvents(),
    getHome(),
    getNews(),
  ]);
  const ticketsData: Tickets | null = await getTickets();

  const homeData: HomeProps = {
    ...home,
    startDate: home?.startDate || "Dato kommer",
    endDate: home?.endDate || "Dato kommer",
    imageGallery: home?.imageGallery || [],
    backgroundVideo: home?.backgroundVideo || undefined,
  };

  return (
    <>
      <HomeHeader startDate={homeData.startDate} endDate={homeData.endDate} />
      <div className="pt-[20px] tablet:py-[20px] space-y-[10px]">
        <Carousel
          images={homeData.imageGallery ?? []}
          autoScrollDirection="backward"
        />
        <Carousel
          images={homeData.imageGallery ?? []}
          autoScrollDirection="forward"
        />
      </div>
      <HomeNavbar />
      <HomeMobileNavbar />
      <BlackTitleBar
        title="Program"
        linkText="alle arrangementer"
        linkUrl="/program"
        hideLinkOnMobile={true}
      />
      <WeekContainer hasLink={false} events={events} />
      <BlackTitleBar
        title="Billetter"
        linkText="mer info"
        linkUrl="/billetter"
      />
      <BuyFestivalPassServer />

      <div className="block tablet:hidden">
        <BuyFestivalPass
          className=" min-h-[300px] tablet:h-[calc(100vh-215px)] w-full"
          button={
            <button className="btn font-wittgenstein max-w-[594px] text-nowrap text-h4 tablet:!text-[3.688rem] px-[20px] tablet:px-[26px] py-[10px] tablet:py-[13px]">
              Kjøp festivalpass her
            </button>
          }
          content={ticketsData?.section}
        />
      </div>
      <BlackTitleBar
        title="Nyheter"
        linkText="alle nyheter"
        linkUrl="/nyheter"
      />
      <NewsGrid news={news} limitMobile={3} limitTablet={4} limitDesktop={6} />
    </>
  );
}
