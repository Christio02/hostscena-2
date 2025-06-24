import { defineQuery } from 'next-sanity'

export const ARCHIVE_QUERY = defineQuery(`
  *[_type == "archive"]{
   _id,
   archiveUrls[]{
     year,
     url
   }
  } | order(archiveUrls[0].year desc)
`)
