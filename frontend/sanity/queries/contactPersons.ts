import { defineQuery } from 'next-sanity'

export const CONTACT_PERSONS_QUERY = defineQuery(
  `  *[_type == "contactPersons" && !(_id in path("drafts.**"))][0].persons[]{
      _key,
      namePerson,
      position,
      email,
      phone
  }`,
)
