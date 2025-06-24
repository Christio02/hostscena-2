export interface ContactFooter {
  email: string
  address: string
  postbox: string
  socialLinks: SocialLinks[]
}

export interface SocialLinks {
  _key: string
  someUrl: string
  platform: string
}

export interface ContactPersons {
  _key: string
  name: string
  position: string
  email: string
  phone: string
}
