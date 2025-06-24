import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'map',
  title: 'Kart over festivalen',
  type: 'document',
  fields: [
    defineField({
      name: 'mapUrl',
      title: 'Lenke til Google Maps kart',
      type: 'url',
      description: 'Lim inn lenke til Google maps kart',
      validation: (Rule) =>
        Rule.required()
          .uri({scheme: ['http', 'https']})
          .error('URLen må være i gyldig format'),
    }),
  ],
})
