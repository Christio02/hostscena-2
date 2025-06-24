import Footer from '@/components/layout/footer/Footer'
import LayoutPadding from '@/components/layout/layoutPadding/layoutPadding'
import NavbarWrapper from '@/components/layout/navbar/NavbarWrapper'
import { DisableDraftMode } from '@/components/sanitylive/DisableDraftMode'
import { SanityLive } from '@/sanity/lib/live'
import { VisualEditing } from 'next-sanity'
import { Source_Sans_3, Wittgenstein } from 'next/font/google'
import { draftMode } from 'next/headers'
import '../styles/globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source',
  weight: ['300', '400', '500', '600', '700'],
})

const wittgenstein = Wittgenstein({
  subsets: ['latin'],
  variable: '--font-wittgenstein',
  weight: ['400', '500', '600', '700', '800', '900'],
})
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${sourceSans.variable} ${wittgenstein.variable}`}>
      <body>
        <NavbarWrapper />
        <LayoutPadding />
        <main>{children}</main>
        <Footer />

        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  )
}
