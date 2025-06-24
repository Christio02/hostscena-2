export interface SanityImageDimensions {
  width: number
  height: number
  aspectRatio: number
}
export interface SanityImageMetadata {
  dimensions: SanityImageDimensions
  lqip?: string
}

export interface SanityImageAssetLite {
  _id: string
  url: string
  metadata: SanityImageMetadata
  altText?: string
}

export interface SanityImage {
  asset: SanityImageAssetLite
  crop?: unknown
  hotspot?: unknown
}
