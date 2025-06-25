import BuyFestivalPassHome from './BuyFestivalPassHome'
import { getBackgroundVideo } from '@/lib/sanity-cache'

export default async function BuyFestivalPassServer() {
  const videoData = await getBackgroundVideo()
  const videoUrl = videoData?.asset?.url

  return (
    <BuyFestivalPassHome
      videoUrl={videoUrl}
      button={
        <button className="btn font-wittgenstein text-nowrap text-[3.688rem] px-[26px] py-[13px]">
          Kjøp festivalpass her
        </button>
      }
    />
  )
}
