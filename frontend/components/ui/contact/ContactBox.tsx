import { ContactPersons, SocialLinks } from '@/interfaces/contact'
import { createCachedSanityQuery, getContactPersons } from '@/lib/sanity-cache'
import { SOCIAL_LINKS } from '@/sanity/queries/contactFooter'
import { getSocialMediaIcon } from '@/utils/getSocialMediaIcon'

export default async function ContactBox() {
  const socialLinksData: SocialLinks[] | null = await createCachedSanityQuery<SocialLinks[] | null>(
    SOCIAL_LINKS,
  )()
  const contactPersonsData: ContactPersons[] = (await getContactPersons()) || []
  return (
    <div className="flex flex-col gap-[20px]">
      {contactPersonsData?.map((person, idx) => (
        <div
          className="flex flex-col py-[20px] px-[40px] border border-secondary items-center min-w-[300px] text-h5"
          key={person._key || person.email || idx}
        >
          <p className="font-bold">{person.name}</p>
          <p>{person.position}</p>
          <p>{person.email}</p>
          <p>{person.phone}</p>
        </div>
      ))}

      <div className="flex gap-[20px] justify-center items-center ">
        {socialLinksData?.map((sm) => (
          <a href={sm.someUrl} target="_blank" rel="noopener noreferrer" key={sm._key}>
            {getSocialMediaIcon(sm.platform, 48)}
          </a>
        ))}
      </div>
    </div>
  )
}
