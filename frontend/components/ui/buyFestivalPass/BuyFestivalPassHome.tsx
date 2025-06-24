'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  imageSrc: string
  button: React.ReactNode
}

export default function BuyFestivalPassHome({ imageSrc, button }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | null = null
    const frame = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        if (!sectionRef.current || !buttonRef.current) return

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top-=80 top',
          end: '+=100%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
        })

        gsap.fromTo(
          buttonRef.current,
          { y: '50vh', scale: 0.9 },
          {
            y: '0vh',
            scale: 1.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top-=80 top',
              end: 'bottom end',
              scrub: true,
            },
          },
        )
      }, sectionRef)
    })

    return () => {
      cancelAnimationFrame(frame)
      ctx?.revert()
    }
  }, [])

  return (
    <main>
      <section
        ref={sectionRef}
        className="hidden tablet:block relative w-full h-[calc(100vh-79px)] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </div>
        <div
          ref={buttonRef}
          className="absolute inset-0 flex items-center justify-center will-change-transform"
        >
          {button}
        </div>
      </section>
    </main>
  )
}
