'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Modal from 'react-modal'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { SanityImage } from '@/interfaces/sanityImage'
import 'swiper/css'
import 'swiper/css/autoplay'

const IMAGE_HEIGHT = 200
const GAP = 10
// const sampleImages = Array.from(
//   { length: 18 },
//   (_, i) => `/assets/images/snake/Hostscena-bildeslange-bilde${String(i + 1).padStart(2, '0')}.jpg`,
// )

interface Props {
  images?: SanityImage[]
  className?: string
}

export default function ImageCarousel({ images = [], className = '' }: Props) {
  const half = Math.ceil(images.length / 2)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalSrc, setModalSrc] = useState<string | null>(null)

  const openImage = (src: string) => {
    setModalSrc(src)
    setModalIsOpen(true)
  }
  const closeModal = () => setModalIsOpen(false)

  const rows = [images.slice(0, half), images.slice(half)]

  useEffect(() => {
    const node = document.getElementById('__next')
    if (typeof window !== 'undefined' && node) {
      Modal.setAppElement(node)
    }
  }, [])
  const containerClasses = `flex flex-col gap-[10px] pt-[20px] z-0 relative ${className}`.trim()
  return (
    <>
      <div className={containerClasses}>
        {rows.map((row, idx) => (
          <Swiper
            key={idx}
            modules={[Autoplay]}
            freeMode={true}
            spaceBetween={GAP}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={8000}
          >
            {row.map((image, i) => (
              <SwiperSlide key={i} className="!w-auto" style={{ height: `${IMAGE_HEIGHT}px` }}>
                <button onClick={() => openImage(image.asset.url)} className="p-0 border-none m-0">
                  <div style={{ height: `${IMAGE_HEIGHT}px`, width: 'auto' }} className="relative">
                    <Image
                      src={image.asset.url}
                      alt={`Bilde ${i + 1}`}
                      height={IMAGE_HEIGHT}
                      width={0}
                      className="h-full w-auto object-contain"
                      unoptimized
                    />
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Bilde"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
        className="relative outline-none max-w-[90vw] max-h-[90vh]"
      >
        {modalSrc && (
          <Image
            src={modalSrc}
            alt="Forstørret bilde"
            width={800}
            height={800}
            className="object-contain max-h-[80vh]"
          />
        )}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-4xl text-secondary bg-primary rounded-full"
        >
          <IoMdClose />
        </button>
      </Modal>
    </>
  )
}
