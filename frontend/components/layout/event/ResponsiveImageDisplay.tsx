'use client'

import Image from 'next/image'
import Carousel from '@/components/ui/carousel/Carousel'
import { useEffect, useState, useCallback, JSX } from 'react'
import Modal from 'react-modal'
import { IoMdClose } from 'react-icons/io'

interface Props {
  images: Array<{
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
  }>
}

export default function ResponsiveImageDisplay({ images }: Props) {
  const [windowWidth, setWindowWidth] = useState<number>(1024)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalSrc, setModalSrc] = useState<string | null>(null)

  const openModal = useCallback((src: string) => {
    setModalSrc(src)
    setModalIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
  }, [])

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth)
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  if (!images || images.length === 0) return null

  let content: JSX.Element

  if (images.length === 1) {
    const img = images[0]
    const width = img.asset.metadata?.dimensions?.width ?? 800
    const height = img.asset.metadata?.dimensions?.height ?? 600

    content = (
      <div className="flex justify-center py-[20px] border-b border-secondary">
        <button onClick={() => openModal(img.asset.url)}>
          <Image
            src={img.asset.url}
            alt={img.alt ?? ''}
            width={width}
            height={height}
            className="max-w-[950px] w-full h-auto object-contain"
          />
        </button>
      </div>
    )
  } else {
    const shouldUseCarousel =
      (images.length === 2 && windowWidth < 450) ||
      (images.length === 3 && windowWidth < 720) ||
      (images.length === 4 && windowWidth < 990) ||
      images.length > 4

    if (shouldUseCarousel) {
      content = (
        <div className="py-[20px]">
          <Carousel
            images={images}
            height={windowWidth < 768 ? '300px' : '500px'}
            className="w-full"
          />
        </div>
      )
    } else {
      content = (
        <div className="flex justify-between gap-[10px] py-[20px]">
          {images.map((img, i) => (
            <div
              key={img.asset.url + i}
              className="flex items-center"
              style={{
                flex: `0 0 calc(${100 / images.length}% - ${((images.length - 1) * 10) / images.length}px)`,
              }}
            >
              <button onClick={() => openModal(img.asset.url)} className="w-full">
                <Image
                  src={img.asset.url}
                  alt={img.alt ?? ''}
                  width={img.asset.metadata?.dimensions?.width ?? 800}
                  height={img.asset.metadata?.dimensions?.height ?? 600}
                  className="w-full object-contain max-h-[500px]"
                />
              </button>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <>
      {content}

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
