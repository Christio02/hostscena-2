import InfoItem from '@/components/ui/info/InfoItem'
import ContactBox from '@/components/ui/contact/ContactBox'
import LocationContainer from '@/components/ui/location/LocationContainer'
import About from '@/components/layout/about/About'

export default function InfoContainer() {
  const items = [
    { title: 'Billetter', content: <p>Informasjon om billetter.</p> },
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
