'use client'

import MobileNavbar from '@/components/layout/navbar/MobileNavbar'
import NavLinks from '@/components/layout/navbar/NavLinks'
import useScrollDirection from '@/utils/useScrollDirection'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const logo = '/assets/images/logo/logo_no_border.svg'

interface NavbarProps {
  fixed?: boolean
}

export default function Navbar({ fixed = true }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const toggleMenu = () => setOpen((prev) => !prev)
  const [show, setShow] = useState(true)
  const scrollDirection = useScrollDirection()
  const pathname = usePathname()

  useEffect(() => {
    if (scrollDirection === 'down') {
      setShow(false)
    } else if (scrollDirection === 'up') {
      setShow(true)
    }
  }, [scrollDirection])

  useEffect(() => {
    if (pathname !== '/') setShow(true)
  }, [pathname])

  return (
    <header
      className={`w-full z-50 ${fixed ? 'fixed' : 'relative'} ${show ? 'top-0' : '-top-28'} left-0 bg-white transition-all duration-300 ease-in-out`}
    >
      <div className="border-b border-black px-[20px] py-[15px] tablet:py-[14px] bg-white">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={107}
              height={40}
              className="w-[81px] tablet:w-[107px] h-auto cursor-pointer"
              priority
            />
          </Link>

          <NavLinks />

          <div className="tablet:hidden">
            <button
              onClick={toggleMenu}
              className={`flex flex-col gap-[6px] transition-transform duration-300 ${open ? 'rotate-90' : ''} focus:outline-none`}
              aria-label="Toggle menu"
            >
              <span className="w-[28px] h-[3px] bg-black" />
              <span className="w-[28px] h-[3px] bg-black" />
            </button>
          </div>
        </div>
      </div>

      {open && <MobileNavbar onClose={() => setOpen(false)} />}
    </header>
  )
}
