import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactPersons',
  title: 'Kontaktpersoner',
  type: 'document',
  fields: [
    defineField({
      name: 'persons',
      title: 'Personer',
      type: 'array',
      validation: (Rule) => Rule.required().error('Du må legge til minst én person!'),
      of: [
        {
          type: 'object',
          title: 'Kontaktperson',
          fields: [
            {
              name: 'namePerson',
              title: 'Navn',
              type: 'string',
              validation: (Rule) => Rule.required().error('Navn er påkrevd'),
            },
            {
              name: 'position',
              title: 'Posisjon',
              type: 'string',
              validation: (Rule) => Rule.required().error('Posisjon er påkrevd'),
            },
            {
              name: 'email',
              title: 'Mail til personen',
              type: 'string',
              validation: (Rule) => Rule.email().required().error('Email er påkrevd'),
            },
            {
              name: 'phone',
              title: 'Telefonnummer',
              type: 'string',
              validation: (Rule) =>
                Rule.required()
                  .regex(/^[0-9]{8}$/)
                  .error('Telefonnummer må bestå av 8 tegn, bare tall og uten mellomrom'),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      firstName: 'persons.0.namePerson',
      count: 'persons.length',
    },
    prepare({firstName, count}) {
      return {
        title: firstName || 'Ingen kontaktperson',
        subtitle: count > 1 ? `+${count - 1} andre` : '',
      }
    },
  },
})
