import {
  FeaturedDestination,
  type FeaturedDestinationData,
} from '@/components/destinations/featured-destination'

export type FeaturedDiveSiteData = FeaturedDestinationData

type FeaturedDiveSiteProps = {
  diveSite: FeaturedDiveSiteData
}

export function FeaturedDiveSite({diveSite}: FeaturedDiveSiteProps) {
  return <FeaturedDestination destination={diveSite} />
}
