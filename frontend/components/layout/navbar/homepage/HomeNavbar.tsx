'use client'

import NavLinks from '@/components/layout/navbar/NavLinks'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const logo = '/assets/images/logo/logo_no_border.svg'

export default function HomeNavbar() {
  const [isFixed, setIsFixed] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const top = navRef.current.getBoundingClientRect().top
        setIsFixed(top <= 0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`hidden tablet:block px-[20px] border-b border-black bg-primary ${isFixed ? 'sticky top-0 z-50' : 'relative'}`}
    >
      <div className={`py-[15px] relative h-[82px] ${isFixed ? '' : 'border-t border-secondary'}`}>
        {/* Logo */}
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-500 ${
            isFixed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={107}
              height={40}
              className="w-[81px] tablet:w-[107px] h-auto"
            />
          </Link>
        </div>

        {/* NavLinks */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 transition-all ease-in-out duration-500 ${
            isFixed ? 'left-[calc(100%-628px)]' : 'left-0'
          }`}
        >
          <NavLinks />
        </div>
      </div>
    </nav>
  )
}
