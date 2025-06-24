import InfoItem from '@/components/ui/info/InfoItem'
import ContactBox from '@/components/ui/contact/ContactBox'
import LocationContainer from '@/components/ui/location/LocationContainer'
import About from '@/components/layout/about/About'

export default function InfoContainer() {
  const items = [
    { title: 'Ankomst', content: <p>Informasjon om ankomst.</p> },
    { title: 'Kart', content: <p>Her er kartet over området.</p> },
    { title: 'Lokaler', content: <LocationContainer /> },
    { title: 'Kontakt', content: <ContactBox /> },
    { title: 'Om Høstscena', content: <About /> },
  ]

  return (
    <div className="px-[20px] py-[20px]">
      {items.map((item, i) => (
        <InfoItem
          key={item.title}
          title={item.title}
          content={item.content}
          isLast={i === items.length - 1}
        />
      ))}
    </div>
  )
}
