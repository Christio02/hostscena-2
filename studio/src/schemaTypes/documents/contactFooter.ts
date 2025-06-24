import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactFooter',
  title: 'Kontaktinfo i Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'KontaktEmail',
      type: 'string',
      validation: (Rule) => Rule.email().required().error('Kontakt mail er påkrevd'),
    }),
    defineField({
      name: 'address',
      title: 'Besøksadresse',
      type: 'string',
      validation: (Rule) => Rule.required().error('Addresse er påkrevd'),
    }),
    defineField({
      name: 'postbox',
      title: 'Postadresse',
      type: 'string',
      description: 'Til postbox',
      validation: (Rule) => Rule.required().error('Postaddresse er påkrevd'),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosiale Medier lenker',
      description: 'Her kan du legge til flere sosiale medier lenker',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Sosiale medier',
          fields: [
            {
              name: 'platform',
              title: 'Plattform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Twitter/X', value: 'twitter'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'TikTok', value: 'tiktok'},
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required().error('Platform må velges'),
            },
            {
              name: 'someUrl',
              title: 'Lenke',
              type: 'url',
              description: 'Legg inn lenken til sosiale mediet',
              validation: (Rule) =>
                Rule.required()
                  .uri({scheme: ['http', 'https']})
                  .error('Du må legge til hele lenken, med https:// foran'),
            },
          ],
        },
      ],
    }),
  ],
})
