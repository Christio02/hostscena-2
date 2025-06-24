import PersonGrid from '@/components/ui/about/PersonGrid'
import { team, praktikanter } from '@/mockdata/persons'
import BorderTitleBar from '@/components/ui/borderTitleBar/BorderTitleBar'

export default function About() {
  return (
    <div className="w-full">
      <section>
        <BorderTitleBar title={'Festivalteam'} noPadding={true} />
        <PersonGrid persons={team} />
      </section>
      <section>
        <BorderTitleBar title={'Praktikanter'} noPadding={true} />
        <PersonGrid persons={praktikanter} />
      </section>
      <section>
        <BorderTitleBar title={'Styret 2025'} noPadding={true} />
      </section>
    </div>
  )
}
