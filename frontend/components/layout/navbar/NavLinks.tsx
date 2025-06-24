import { navLinks } from '@/constants/navigation'
import Link from 'next/link'

export default function NavLinks() {
  return (
    <nav className="hidden tablet:flex gap-[10px] text-button w-[628px]">
      {navLinks
        .filter((link) => link.label.toLowerCase() !== 'hjem')
        .map(({ label, href }) => (
          <Link key={href} href={href} className="btn px-[10px]">
            {label}
          </Link>
        ))}
    </nav>
  )
}
