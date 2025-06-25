'use client'

import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import Modal from 'react-modal'
import { IoMdClose } from 'react-icons/io'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import '@/styles/embla.css'

type CarouselImage = {
  asset: {
    url: string
    metadata?: {
      dimensions?: {
        width: number
        height: number
      }
    }
  }
  alt?: string
}

interface Props {
  images?: CarouselImage[]
  className?: string
  direction?: 'ltr' | 'rtl'
  speed?: number
  height?: string
  autoScrollDirection?: 'forward' | 'backward'
}

export default function Carousel({
  images = [],
  className = '',
  direction = 'ltr',
  speed = 1,
  height = '31vh',
  autoScrollDirection = 'forward',
}: Props) {
  const slides = images.length < 3 ? [...images, ...images, ...images] : images

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      axis: 'x',
      direction,
      dragFree: true,
      skipSnaps: true,
      containScroll: false,
    },
    [
      AutoScroll({
        playOnInit: false,
        speed,
        stopOnInteraction: false,
        direction: autoScrollDirection,
      }),
      WheelGesturesPlugin({ forceWheelAxis: 'x' }),
    ],
  )

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalSrc, setModalSrc] = useState<string | null>(null)

  const openModal = useCallback(
    (src: string) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll
      if (autoScroll) {
        const resetOrStop =
          autoScroll.options.stopOnInteraction === false ? autoScroll.reset : autoScroll.stop
        resetOrStop()
      }
      setModalSrc(src)
      setModalIsOpen(true)
    },
    [emblaApi],
  )

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (autoScroll && !autoScroll.isPlaying()) {
      autoScroll.play()
    }
  }, [emblaApi])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll || typeof autoScroll.play !== 'function') return
    requestAnimationFrame(() => {
      try {
        autoScroll.play()
      } catch (err) {
        console.error('AutoScroll play error:', err)
      }
    })
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const autoScroll = emblaApi.plugins()?.autoScroll
    if (!autoScroll || typeof autoScroll.play !== 'function') return

    const timer = setTimeout(() => {
      try {
        autoScroll.play()
      } catch (err) {
        console.error('AutoScroll play error:', err)
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [emblaApi])

  useEffect(() => {
    const handleResize = () => {
      if (emblaApi) {
        emblaApi.reInit() // reinitialiser ved resize
        const autoScroll = emblaApi.plugins().autoScroll
        if (autoScroll) autoScroll.play() // sørg for at autoplay starter på ny
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [emblaApi])

  return (
    <>
      <div className={`embla ${className}`} style={{ height }}>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((img, i) => (
              <div key={`${img.asset.url}-${i}`} className="embla__slide">
                <button onClick={() => openModal(img.asset.url)} className="block overflow-hidden">
                  <Image
                    src={img.asset.url}
                    alt={img.alt ?? ''}
                    width={img.asset.metadata?.dimensions?.width ?? 800}
                    height={img.asset.metadata?.dimensions?.height ?? 600}
                    className="w-auto object-contain"
                    style={{ height }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Bilde"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
        className="relative outline-none"
      >
        {modalSrc && (
          <div className="relative">
            <Image
              src={modalSrc}
              alt="Fullskjermsbilde"
              width={600}
              height={800}
              className="object-contain max-h-[90vh] max-w-[90vw]"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-4xl text-secondary bg-primary rounded-full hover:bg-secondary hover:text-primary transition-colors p-2"
            >
              <IoMdClose />
            </button>
          </div>
        )}
      </Modal>
    </>
  )
}
