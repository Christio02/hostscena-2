import { HiArrowLongRight } from 'react-icons/hi2'
import Link from 'next/link'

type Props = {
  title: string
  linkText?: string
  linkUrl?: string
  hideLinkOnMobile?: boolean
}

export default function BlackTitleBar({ title, linkText, linkUrl, hideLinkOnMobile }: Props) {
  return (
    <div className="bg-secondary py-[40px] tablet:py-[30px] px-[20px] text-primary flex justify-between items-center">
      <h2 className="text-h2">{title}</h2>
      {linkText && linkUrl && (
        <Link
          href={linkUrl}
          className={`flex items-center gap-1 text-h6 group ${
            hideLinkOnMobile ? 'hidden mobile:flex' : ''
          }`}
        >
          {linkText.toUpperCase()}
          <HiArrowLongRight size={30} />
        </Link>
      )}
    </div>
  )
}
