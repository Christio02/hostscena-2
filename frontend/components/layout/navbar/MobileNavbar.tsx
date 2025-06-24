import { navLinks } from '@/constants/navigation'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

type Props = {
  onClose: () => void
}

export default function MobileNavbar({ onClose }: Props) {
  return (
    <div className="absolute top-full left-0 w-full bg-white border-b border-black tablet:hidden">
      <nav>
        <div className="flex flex-col items-center gap-[10px] px-[20px] py-[20px]">
          {navLinks
            .filter((link) => link.label.toLowerCase() !== 'hjem')
            .map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="w-full text-center border-[1px] border-secondary text-button hover:bg-secondary hover:text-primary"
                onClick={onClose}
              >
                {label}
              </Link>
            ))}
        </div>

        <div className="flex gap-[20px] justify-center w-full border-t border-black py-[20px]">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={48} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={48} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={48} />
          </a>
        </div>
      </nav>
    </div>
  )
}
