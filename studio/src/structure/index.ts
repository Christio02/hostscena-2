import {StructureResolver} from 'sanity/structure'
import {
    HomeIcon,
    CalendarIcon,
    BookmarkIcon,
    TargetIcon,
    TrolleyIcon,
    UsersIcon,
    ArchiveIcon,
    UserIcon,
} from '@sanity/icons'

const singletonTypes = ['home', 'map', 'contactFooter', 'contactPersons']

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Innhold')
        .items([
            S.listItem()
                .title('Hjemmesider')
                .icon(HomeIcon)
                .schemaType('home')
                .child(S.documentTypeList('home').title('Alle hjemmesider')),

            S.divider(),

            S.listItem()
                .title('Nyheter')
                .icon(BookmarkIcon)
                .child(S.documentTypeList('news').title('Nyhetsartikler')),

            S.listItem()
                .title('Arrangementer')
                .icon(CalendarIcon)
                .child(S.documentTypeList('event').title('Arrangementer')),

            S.listItem()
                .title('Billettsiden')
                .icon(TrolleyIcon)
                .child(S.documentTypeList('tickets').title('Billetter')),

            S.divider(),

            S.listItem()
                .title('Kontaktpersoner')
                .icon(UsersIcon)
                .child(S.editor().id('contactPersons').schemaType('contactPersons').documentId('contactPersons')),

            S.listItem()
                .title('Footer-kontaktinfo')
                .icon(UserIcon)
                .child(S.editor().id('contactFooter').schemaType('contactFooter').documentId('contactFooter')),

            S.divider(),

            S.listItem()
                .title('Kart')
                .icon(TargetIcon)
                .child(S.editor().id('map').schemaType('map').documentId('map')),

            S.listItem()
                .title('Arkiv')
                .icon(ArchiveIcon)
                .child(S.documentTypeList('archive').title('Arkivsider')),

            S.divider(),

            S.listItem()
                .title('Alle dokumenter')
                .child(
                    S.list()
                        .title('Alle dokumenttyper')
                        .items(
                            S.documentTypeListItems().filter(
                                (listItem) => !singletonTypes.includes(listItem.getId()!)
                            )
                        )
                ),
        ])
