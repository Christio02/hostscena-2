export default interface Contributor {
  name: string
  image?: {
    asset?: {
      url?: string
    }
  }
  bio?: string
  artistType?: string
}
