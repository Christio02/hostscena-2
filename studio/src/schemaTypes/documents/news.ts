import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'news',
  title: 'Nyhet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) =>
        Rule.required().uppercase().error('Tittel er påkrevd og må være i store bokstaver'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/ø/g, 'o')
            .replace(/æ/g, 'ae')
            .replace(/å/g, 'a')
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
      validation: (Rule) => Rule.required().error('Slug må være generert'),
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required().error('Hovedbilde er påkrevd'),
    }),

    defineField({
      name: 'tag',
      title: 'Tagg',
      type: 'string',
      description: 'Valgfri kort tagg (f.eks. "Arrangement" eller "Frivillig")',
    }),
    defineField({
      name: 'person',
      title: 'Person',
      type: 'string',
      description: 'Valgfri: hvem saken handler om eller er av (f.eks. “Høstscena Ensemblet”)',
    }),
    defineField({
      name: 'date',
      title: 'Dato',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required().error('Dato er påkrevd'),
    }),
    defineField({
      name: 'time',
      title: 'Klokkeslett',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).error('Må være i HH:mm format'),
      description: 'Valgfritt: f.eks. “18:00”',
    }),

    defineField({
      name: 'content',
      title: 'Innhold',
      type: 'portableText',
      description: 'Trykk Enter for å legge til nytt avsnitt',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      description: 'Legg til video som YouTube lenke eller last oppe en video!',
      type: 'object',
      fields: [
        {
          name: 'videoType',
          title: 'Video type',
          type: 'string',
          options: {
            list: [
              {title: 'YouTube lenke', value: 'youtube'},
              {title: 'Opplastet fil', value: 'upload'},
            ],
          },
        },
        {
          name: 'youtubeUrl',
          title: 'YouTube URL',
          type: 'url',
          description: 'Lim inn YouTube lenke',
          hidden: ({parent}) => parent?.videoType !== 'youtube',
          validation: (Rule) =>
            Rule.custom((url, context) => {
              const parent = context.parent as {videoType?: string}
              if (parent?.videoType === 'youtube' && !url) {
                return 'YouTube URL er påkrevd når video type er YouTube'
              }
              return true
            }),
        },
        {
          name: 'videoFile',
          title: 'Video fil',
          type: 'file',
          description: 'Last opp video fil',
          options: {
            accept: 'video/*',
          },
          hidden: ({parent}) => parent?.videoType !== 'upload',
          validation: (Rule) =>
            Rule.custom((file, context) => {
              const parent = context.parent as {videoType?: string}
              if (parent?.videoType === 'upload' && !file) {
                return 'Video fil er påkrevd når video type er opplastet fil'
              }
              return true
            }),
        },
      ],
      preview: {
        select: {
          videoType: 'videoType',
          youtubeUrl: 'youtubeUrl',
        },
        prepare({videoType, youtubeUrl}) {
          return {
            subtitle: videoType === 'youtube' ? `YouTube: ${youtubeUrl}` : 'Opplastet fil',
          }
        },
      },
    }),
    defineField({
      name: 'imageCarousel',
      title: 'Bildekarusell',
      type: 'array',
      description: 'Legg til bilder for karusell',
      of: [
        {
          type: 'object',
          title: 'Bilde',
          fields: [
            {
              name: 'image',
              title: 'Bilde',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required().error('Bilde er påkrevd'),
            },
            {
              name: 'caption',
              title: 'Bildetekst',
              type: 'string',
              description: 'Valgfri beskrivelse av bildet',
            },
            {
              name: 'alt',
              title: 'Alt-tekst',
              type: 'string',
              description: 'Beskrivelse for skjermlesere',
              validation: (Rule) => Rule.required().error('Alt-tekst er påkrevd'),
            },
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'alt',
              media: 'image',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Uten bildetekst',
                subtitle: subtitle,
                media: media,
              }
            },
          },
        },
      ],
    }),
  ],
})
