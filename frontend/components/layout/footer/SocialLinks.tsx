// src/components/ui/footer/SocialLinks.tsx
import { SocialLinks as LinkType } from '@/interfaces/contact'
import { getSocialMediaIcon } from '@/utils/getSocialMediaIcon'

export default function SocialLinks({ links, size = 48 }: { links?: LinkType[]; size?: number }) {
  return (
    <div className="flex gap-5">
      {links?.map((sm) => (
        <a
          key={sm._key}
          href={sm.someUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit our ${sm.platform} page`}
        >
          {getSocialMediaIcon(sm.platform, size)}
        </a>
      ))}
    </div>
  )
}
