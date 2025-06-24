import {defineField, defineType} from 'sanity'
import type {PortableTextBlock, PortableTextSpan} from '@portabletext/types'

export default defineType({
  name: 'tickets',
  title: 'Billettside',
  type: 'document',
  fields: [
    defineField({
      name: 'section',
      title: 'Avsnitt',
      type: 'portableText',
      description:
        'Første avsnittet på billettsiden. ' +
        'Trykk Enter for nytt avsnitt, ' +
        'Shift+Enter for linjeskift',
      validation: (Rule) => Rule.required().error('Du må legge til innhold!'),
    }),
  ],
  preview: {
    select: {
      blocks: 'section',
    },
    prepare({blocks}: {blocks?: PortableTextBlock[]}) {
      if (!Array.isArray(blocks)) {
        return {title: 'Ingen tekst'}
      }
      const onlyBlocks = blocks.filter((blk): blk is PortableTextBlock => blk._type === 'block')
      // filter for spans
      const paragraphs = onlyBlocks.map((blk) => {
        const spans = blk.children.filter(
          (child): child is PortableTextSpan => child._type === 'span',
        )
        return spans.map((span) => span.text).join('')
      })

      // join the texts
      const fullText = paragraphs.join(' ')
      const excerpt = fullText.length > 20 ? fullText.slice(0, 20) + '…' : fullText || 'Ingen tekst'

      return {title: excerpt}
    },
  },
})
