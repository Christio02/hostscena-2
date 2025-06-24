import { PortableTextBlock } from '@portabletext/types'
import { SanityImage } from './sanityImage'
import { Slide, Video } from '@/interfaces/event'

export default interface News {
  slug: {
    _id: string
    current: string
  }
  image: SanityImage
  title: string
  tag?: string
  person?: string
  date: string
  time: string
  content?: PortableTextBlock[]
  video: Video
  imageCarousel: Slide[]
}
