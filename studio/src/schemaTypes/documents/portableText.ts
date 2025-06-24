import {defineType} from 'sanity'

export default defineType({
  name: 'portableText',
  title: 'Rich Text Content',
  type: 'array',
  description:
    'Husk å kopiere tekst som ren tekst (Ctrl+Shift+V) for å unngå formateringsproblemer fra nettsider.',
  of: [
    {
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                description: 'Read https://css-tricks.com/use-target_blank/',
                type: 'boolean',
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  {type: 'event'},
                  {type: 'news'},
                  // other types you may want to link to
                ],
              },
            ],
          },
        ],
      },
    },
  ],
})
