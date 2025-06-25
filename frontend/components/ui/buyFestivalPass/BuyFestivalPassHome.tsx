'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  videoUrl?: string
  button?: React.ReactNode
}

export default function BuyFestivalPassHome({ videoUrl, button }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
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
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hidden tablet:block relative w-full h-[calc(100vh-79px)] overflow-hidden"
    >
      {videoUrl && (
        <video
          className="absolute top-0 left-0 w-full h-full max-w-none object-cover z-0"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div
        ref={buttonRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform z-50"
      >
        {button}
      </div>
    </section>
  )
}
