import { defineQuery } from 'next-sanity'

export const EVENT_QUERY = defineQuery(`
  *[_type == "event" && !(_id in path("drafts.**"))] | order(date asc) {
    _type,
    title,
    slug {
      _id,
      current
    },
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
    date,
    startTime,
    endTime,
    location,
    link,
    tag,
    content[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "reference": @.reference->{
            _id,
            _type,
            slug
          }
        }
      }
    },
    credits[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "reference": @.reference->{
            _id,
            _type,
            slug
          }
        }
      }
    },
    sponsor,
    contributors[] {
      _key,
      name,
      artistType,
      bio,
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
    },
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
    spotifyLink,
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

// single event by id/slug
export const EVENT_BY_ID_QUERY = defineQuery(`
  *[_type == "event" && _id == $id && !(_id in path("drafts.**"))][0] {
    _id,
    _type,
    title,
    date,
    startTime,
    endTime,
    location,
    link,
    tag,
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
    content[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "reference": @.reference->{
            _id,
            _type,
            slug
          }
        }
      }
    },
    credits[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "reference": @.reference->{
            _id,
            _type,
            slug
          }
        }
      }
    },
    sponsor
    contributors[] {
      _key,
      name,
      artistType,
      bio,
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
    },
    video {
      title,
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
    spotifyLink,
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

// upcoming events
export const UPCOMING_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && date >= now() && !(_id in path("drafts.**"))] | order(date asc) {
     _id,
    _type,
    title,
    date,
    startTime,
    endTime,
    location,
    link,
    tag,
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
    content[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "reference": @.reference->{
            _id,
            _type,
            slug
          }
        }
      }
    },
    credits[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "reference": @.reference->{
            _id,
            _type,
            slug
          }
        }
      }
    },
    sponsor,
    contributors[] {
      _key,
      name,
      artistType,
      bio,
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
    },
    video {
      title,
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
    spotifyLink,
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
