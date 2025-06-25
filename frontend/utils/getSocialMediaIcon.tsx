import { stegaClean } from '@sanity/client/stega'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'

export const getSocialMediaIcon = (platform?: string | null, size: number = 48) => {
  if (typeof platform !== 'string' || !platform.trim()) {
    console.warn('Missing or invalid platform:', platform)
    return null
  }

  const iconProps = { size }

  const normalizedPlatform = platform.toLowerCase().trim()

  // need to clean, because live API uses stega that has a bunch of invinsible characters
  const cleaned = stegaClean(normalizedPlatform)

  switch (cleaned) {
    case 'facebook':
      return <FaFacebook {...iconProps} />
    case 'instagram':
      return <FaInstagram {...iconProps} />
    case 'youtube':
      return <FaYoutube {...iconProps} />
    case 'twitter':
    case 'x':
      return <FaTwitter {...iconProps} />
    case 'linkedin':
      return <FaLinkedin {...iconProps} />
    case 'tiktok':
      return <FaTiktok {...iconProps} />
    default:
      console.warn(`Unknown social platform: ${cleaned}`)
      return null
  }
}
