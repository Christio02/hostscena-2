import { defineQuery } from 'next-sanity'
//  single contact info document
export const SINGLE_CONTACT_FOOTER_QUERY = defineQuery(`
  *[_type == "contactFooter" && !(_id in path("drafts.**"))][0] {
    _id,
    _type,
    email,
    address,
    postbox,
    "socialLinks": coalesce(socialLinks, [])[]{
      _key,
      platform,
      someUrl
    }
  } 
`)

// query for social links only
export const SOCIAL_LINKS = defineQuery(`
  *[_type == "contactFooter" && !(_id in path("drafts.**"))][0].socialLinks[] {
      _key,
      platform,
      someUrl
  }
`)
