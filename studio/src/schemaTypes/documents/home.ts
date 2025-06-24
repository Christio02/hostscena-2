import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Hjemmeside',
  type: 'document',
  fields: [
    defineField({
      name: 'startDate',
      title: 'StartDato',
      type: 'date',
      description: 'StartDato til festivalen som vises i header',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (Rule) => Rule.required().error('Må ha startdato satt!'),
    }),
    defineField({
      name: 'endDate',
      title: 'SluttDato',
      type: 'date',
      description: 'SluttDato til festivalen som vises i header',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (Rule) => Rule.required().error('Må ha sluttdato satt!'),
    }),
    defineField({
      name: 'imageGallery',
      title: 'Bilder for galleri',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/*',
          },

          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt tekst',
              validation: (Rule) => Rule.required().min(1).error('Må legge til minst 1 bilde!'),
            },
          ],
        },
      ],
      options: {
        sortable: true,
        layout: 'grid',
      },
    }),
    defineField({
      name: 'backgroundVideo',
      title: "Video bak 'Kjøp festivalpass'",
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required().error('Bakgrunnsvideo må legges til!'),
    }),
  ],
  preview: {
    select: {
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare: ({startDate, endDate}) => {
      return {
        title: `${startDate} - ${endDate}`,
      }
    },
  },
})
