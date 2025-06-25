import BlackTitleBar from '@/components/ui/blackTitleBar/BlackTitleBar'
import InfoContainer from '@/components/ui/info/InfoContainer'

export default function Info() {
  return (
    <section className="min-h-[65vh]">
      <BlackTitleBar title="Info" />
      <InfoContainer />
    </section>
  )
}
