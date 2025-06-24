export interface HomeHeaderProps {
  startDate: string
  endDate: string
}

export interface ImageDimensions {
  width: number
  height: number
}

export interface ImageMetadata {
  dimensions: ImageDimensions
  lqip: string
}

export interface ImageAsset {
  _id: string
  url: string
  metadata: ImageMetadata
}

export interface ImageGalleryItem {
  _key: string
  alt: string
  asset: ImageAsset
  hotspot: { x: number; y: number } | null
  crop: { top: number; bottom: number; left: number; right: number } | null
}

export interface VideoAsset {
  _id: string
  url: string
  originalFilename: string
  mimeType: string
  size: number
}

export interface BackgroundVideo {
  asset: VideoAsset
}

export interface HomeProps extends HomeHeaderProps {
  imageGallery?: ImageGalleryItem[]
  backgroundVideo?: BackgroundVideo
}
