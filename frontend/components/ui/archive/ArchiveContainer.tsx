import ArchiveItem from '@/components/ui/archive/ArchiveItem'

export default function ArchiveContainer() {
  const items = [
    { title: '2024', link: 'https://www.vg.no' },
    { title: '2023', link: 'https://www.vg.no' },
    { title: '2022', link: 'https://www.vg.no' },
    { title: '2021', link: 'https://www.vg.no' },
  ]

  return (
    <div className="px-[20px] py-[20px]">
      {items.map((item, i) => (
        <ArchiveItem
          key={item.title}
          title={item.title}
          link={item.link}
          isLast={i === items.length - 1}
        />
      ))}
    </div>
  )
}
