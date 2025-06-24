import {
  defineDocuments,
  defineLocations,
  DocumentLocation,
  PresentationPluginOptions
} from 'sanity/presentation'
import { locationConfigs } from '../utils/locationsConfig'

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {
      route: '/',
      filter: `_type == "home"`,
    },
    {
      route: '/nyheter/:slug',
      filter: `_type == "news" && (slug.current == $slug || _id == $slug)`,
    },
    {
      route: '/program/:slug',
      filter: `_type == "event" && (slug.current == $slug || _id == $slug)`,
    },
    {
      route: '/billetter',
      filter: `_type == "tickets"`
    },
    {
      route: '/arkiv',
      filter: `_type == "archive"`
    },
    {
      route: '/kontakt',
      filter: `_type == "contactFooter"`
    },
    {
      route: '/kart',
      filter: `_type == "map"`
    },
    {
      route: '/:slug',
      filter: `_type == "page" && (slug.current == $slug || _id == $slug)`,
    },
  ]),

  locations: Object.fromEntries(
    locationConfigs.map(({ type, select, buildSingle }) => [
      type,
      defineLocations({
        select,
        resolve: (doc) => ({ locations: buildSingle(doc ?? {}) }),
      }),
    ])
  ),
}
