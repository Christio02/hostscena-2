import BlackTitleBar from '@/components/ui/blackTitleBar/BlackTitleBar'
import { getMap } from '@/lib/sanity-cache'

interface MapProps {
  url: string
}

export default async function Kart() {
  const mapData: MapProps = await getMap()
  // to be used
  console.log(mapData)

  // render the link
  return (
    <section>
      <BlackTitleBar title="Kart" />
    </section>
  )
}
