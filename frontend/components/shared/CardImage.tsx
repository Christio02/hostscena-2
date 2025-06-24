import { SanityImage } from '@/interfaces/sanityImage'
import Image from 'next/image'

interface Props {
  imageData: SanityImage
  title: string
}
export default function CardImage({ imageData, title }: Props) {
  const src = imageData.asset.url
  if (!src) return null

  const blurDataURL = imageData.asset.metadata.lqip
  return (
    <Image
      src={src}
      alt={title}
      fill
      placeholder={blurDataURL ? 'blur' : undefined}
      blurDataURL={blurDataURL}
      sizes="(max-width: 640px) 100vw, 33vw"
      style={{ objectFit: 'cover' }}
    />
  )
}
