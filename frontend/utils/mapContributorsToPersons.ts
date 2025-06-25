import type Person from '@/interfaces/person'
import Contributor from '@/interfaces/contributor'

export function mapContributorsToPersons(contributors: Contributor[]): Person[] {
  return contributors.map((c) => ({
    name: c.name,
    image: c.image?.asset?.url ?? '',
    description: c.bio,
    jobTitle: c.artistType,
  }))
}
