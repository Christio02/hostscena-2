import { defineQuery } from 'next-sanity'

export const NEWS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)] && !(_id in path("drafts.**"))
    | order(date desc)[0...12]{
      _id,
      title,
      slug,
      tag,
      person,
      date,
      time,
      image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
      content
      video {
      videoType,
      youtubeUrl,
      videoFile {
        asset->{
          _id,
          url,
          originalFilename,
          mimeType
        }
      }
    },
    imageCarousel[] {
      _key,
      caption,
      alt,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        hotspot,
        crop
      }
    }
    }
`)

export const NEWS_DETAIL_QUERY = defineQuery(`
  *[_type == "news" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    slug,
    tag,
    person,
    date,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
    image,
    content
  }
`)

export const ALL_NEWS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(date desc){
      _id,
      title,
      slug,
      tag,
      person,
      date,
      time,
      image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
      content
    }
`)
