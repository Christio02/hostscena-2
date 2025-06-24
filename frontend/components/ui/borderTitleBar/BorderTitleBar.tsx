import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'
import Link from 'next/link'

type Props = {
  title?: string
  linkText?: string
  linkUrl?: string
  onClick?: () => void
  borderTop?: boolean
  noPadding?: boolean
  isArrowReversed?: boolean
}

export default function BorderTitleBar({
  title,
  linkText,
  linkUrl,
  onClick,
  borderTop = true,
  noPadding = false,
  isArrowReversed = false,
}: Props) {
  const showLink = linkText && (linkUrl || onClick)

  return (
    <div className={noPadding ? '' : 'px-[20px] py-[20px]'}>
      <div
        className="py-[10px] flex justify-between items-center border-b border-black"
        style={{ borderTop: borderTop ? '1px solid black' : 'none' }}
      >
        <div>{title && <h3 className="text-h3">{title}</h3>}</div>

        {showLink &&
          (linkUrl ? (
            <Link href={linkUrl} className="flex items-center gap-1 text-h6">
              {linkText!.toUpperCase()}
              <HiArrowLongRight size={30} />
            </Link>
          ) : (
            <button onClick={onClick} className="flex items-center gap-1 text-h6">
              {linkText!.toUpperCase()}
              {isArrowReversed ? <HiArrowLongLeft size={30} /> : <HiArrowLongRight size={30} />}
            </button>
          ))}
      </div>
    </div>
  )
}
