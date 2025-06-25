import {StructureResolver} from 'sanity/structure'
import {HomeIcon, CalendarIcon, BookmarkIcon, TargetIcon, TrolleyIcon, UsersIcon, ArchiveIcon, UserIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Home Page')
                .icon(HomeIcon)
                .child(
                    S.editor()
                        .id('home')
                        .schemaType('home')
                        .documentId('home')
                ),

            S.divider(),

            S.listItem()
                .title('News')
                .icon(BookmarkIcon)
                .schemaType('news')
                .child(S.documentTypeList('news').title('News Articles')),

            S.listItem()
                .title('Events')
                .icon(CalendarIcon)
                .schemaType('event')
                .child(S.documentTypeList('event').title('Events')),

            S.listItem()
                .title('Tickets')
                .icon(TrolleyIcon)
                .schemaType('tickets')
                .child(S.documentTypeList('tickets').title('Tickets')),

            S.divider(),

            S.listItem()
                .title('Contact Persons')
                .icon(UsersIcon)
                .schemaType('contactPersons')
                .child(S.documentTypeList('contactPersons').title('Contacts')),

            S.listItem()
                .title('Contact Footer')
                .icon(UserIcon)
                .schemaType('contactFooter')
                .child(S.editor().id('contactFooter').schemaType('contactFooter').documentId('contactFooter')),

            S.divider(),

            S.listItem()
                .title('Map')
                .icon(TargetIcon)
                .schemaType('map')
                .child(S.editor().id('map').schemaType('map').documentId('map')),

            S.listItem()
                .title('Archive')
                .icon(ArchiveIcon)
                .schemaType('archive')
                .child(S.documentTypeList('archive').title('Archive')),


            S.listItem()
                .title('All Documents')
                .child(
                    S.list()
                        .title('All Documents')
                        .items(S.documentTypeListItems())
                )

        ])
