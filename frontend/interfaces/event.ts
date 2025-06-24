import type { PortableTextBlock } from '@portabletext/types'
import { SanityImage } from './sanityImage'

interface Contributor {
  image: SanityImage
  name: string
  artistType: string
  bio?: string
}

export interface Video {
  videoType: 'youtube' | 'upload'
  youtubeUrl?: string
  videoFile?: {
    asset: {
      _id: string
      url: string
      originalFilename: string
      mimeType: string
    }
  }
}

export interface Slide {
  _key: string
  caption?: string
  alt?: string
  image: SanityImage
}

export default interface Event {
  slug: {
    _id: string
    current: string
  }
  image: SanityImage
  title: string
  performer: string
  date: string
  startTime: string
  endTime?: string
  location: string
  link?: string
  tag?: string
  content?: PortableTextBlock[]
  credits?: PortableTextBlock[]
  sponsor?: string
  contributors?: Contributor[]
  video?: Video
  spotifyLink?: string
  imageCarousel?: Slide[]
}
