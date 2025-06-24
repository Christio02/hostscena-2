import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'archive',
  title: 'Arkiv',
  type: 'document',
  fields: [
    defineField({
      name: 'archiveUrls',
      title: 'Lenker til arkivsider',
      description: 'Her kan du legge inn år og link til arkivside',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Arkivside',
          fields: [
            {
              name: 'year',
              title: 'Årstall',
              type: 'string',
              description: 'Skriv inn årstallet for arkivet',
              validation: (Rule) =>
                Rule.required()
                  .regex(/^(19|20)\d{2}$/, {name: 'year'})
                  .error('Må være et gyldig årstall mellom 1900 og 2099'),
            },
            {
              name: 'url',
              title: 'Lenke',
              type: 'url',
              validation: (Rule) =>
                Rule.required()
                  .uri({scheme: ['http', 'https']})
                  .error('Må være en gyldig url'),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      urls: 'archiveUrls',
    },
    prepare({urls}) {
      const length = Array.isArray(urls) ? urls.length : 0
      return {
        title: length > 1 ? `${length} arkivlenker` : `${length} arkivlenke`,
      }
    },
  },
})
