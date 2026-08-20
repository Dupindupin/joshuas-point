import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {EditorialAmenityList} from '@/components/amenities'
import {
  EditorialContainer,
  EditorialFigure,
  EditorialGrid,
  EditorialLink,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {RoomPreview} from '@/components/rooms/room-preview'
import {SiteHeader} from '@/components/site/site-header'
import {approvedAmenityKeys, selectApprovedAmenities} from '@/lib/amenities'
import {createPageMetadata} from '@/lib/seo/metadata'
import {stayPolicy} from '@/lib/stay/policy'
import {mapSanityRoomsPage} from '@/sanity/mappers/rooms-page'
import {getPublicAmenities} from '@/sanity/queries/amenities'
import {getRoomsPage} from '@/sanity/queries/rooms-page'

import {roomsPageData} from './rooms-page-data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getRoomsPage()

  return createPageMetadata({
    description: "Ocean Suite and Garden Suite at Joshua's Point.",
    pathname: '/rooms',
    seo: page?.seo,
    socialImage: page?.featuredRooms?.find((room) => room?.previewImage)?.previewImage,
    title: "Rooms | Joshua's Point",
  })
}

export default async function RoomsPage() {
  const [sanityRoomsPage, publicAmenities] = await Promise.all([
    getRoomsPage(),
    getPublicAmenities(),
  ])
  const pageData = sanityRoomsPage ? mapSanityRoomsPage(sanityRoomsPage) : roomsPageData
  if (!pageData) notFound()
  const sharedRoomAmenities = selectApprovedAmenities(publicAmenities, [
    approvedAmenityKeys.airConditioning,
    approvedAmenityKeys.wifi,
    approvedAmenityKeys.filteredWater,
    approvedAmenityKeys.exclusiveUse,
  ])

  const {
    closingReflection,
    collectionIntroduction,
    comfortPhilosophy,
    editorialIntroduction,
    hero,
    imageBreak,
    rooms,
  } = pageData

  return (
    <>
      <SiteHeader activeHref="/rooms" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow={hero.eyebrow}
          introduction={`Joshua’s Point is always offered as one private whole-house stay. The Ocean Suite and Garden Suite are yours together, accommodating a maximum of ${stayPolicy.maximumGuests} guests.`}
          title={hero.title}
        />

        {editorialIntroduction ? (
          <SectionSpacing aria-labelledby="rooms-introduction-title" size="generous">
            <EditorialContainer size="reading">
              <EditorialText
                as="h2"
                headingSize="small"
                id="rooms-introduction-title"
                variant="heading"
              >
                {editorialIntroduction.heading}
              </EditorialText>
              <EditorialText className="mt-10 max-w-xl lg:mt-12" variant="body">
                {editorialIntroduction.body}
              </EditorialText>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <SectionSpacing aria-labelledby="room-collection-title" size="generous">
          <EditorialContainer>
            <EditorialGrid>
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                {collectionIntroduction.eyebrow}
              </EditorialText>
              <EditorialText
                className="max-w-3xl lg:col-span-8 lg:col-start-3"
                headingSize="medium"
                id="room-collection-title"
                variant="heading"
              >
                {collectionIntroduction.heading}
              </EditorialText>
            </EditorialGrid>

            <div className="mt-12 sm:mt-16">
              {rooms.map((room, index) => (
                <SectionSpacing as="div" key={room.id} size="compact">
                  <RoomPreview
                    layout={index % 2 === 0 ? 'image-left' : 'image-right'}
                    room={room}
                  />
                </SectionSpacing>
              ))}
            </div>
            <div className="mt-10 lg:ml-[16.666667%]">
              <EditorialLink href="/plan-your-stay" label="Plan your stay" />
            </div>
            {sharedRoomAmenities.length > 0 ? (
              <section
                aria-labelledby="shared-room-amenities-title"
                className="mt-20 border-t border-border pt-12 lg:ml-[16.666667%] lg:max-w-4xl"
              >
                <EditorialText variant="eyebrow">Throughout the house</EditorialText>
                <EditorialText
                  as="h3"
                  className="mt-7"
                  headingSize="small"
                  id="shared-room-amenities-title"
                  variant="heading"
                >
                  A few practical details for a stay at Joshua&apos;s Point.
                </EditorialText>
                <EditorialAmenityList className="mt-10" items={sharedRoomAmenities} />
              </section>
            ) : null}
          </EditorialContainer>
        </SectionSpacing>

        {imageBreak ? (
          <SectionSpacing aria-label="Rooms photography" size="standard">
            <EditorialFigure
              caption={imageBreak.caption}
              captionAlignment="end"
              captionContainer="wide"
              media={{
                image: imageBreak.image,
                ratio: 'panoramic',
                sizes: '100vw',
                tone: 'stone',
              }}
            />
          </SectionSpacing>
        ) : null}

        {comfortPhilosophy ? (
          <SectionSpacing aria-labelledby="comfort-title" size="immersive">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  {comfortPhilosophy.eyebrow}
                </EditorialText>
                <EditorialText
                  className="max-w-3xl lg:col-span-8 lg:col-start-3"
                  headingSize="medium"
                  id="comfort-title"
                  variant="heading"
                >
                  {comfortPhilosophy.heading}
                </EditorialText>
                <EditorialText
                  className="max-w-xl lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:mt-12"
                  variant="body"
                >
                  {comfortPhilosophy.body}
                </EditorialText>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        {closingReflection ? (
          <SectionSpacing
            aria-label="Closing reflection"
            className="bg-inverse-surface"
            size="immersive"
          >
            <EditorialContainer size="reading">
              <EditorialText tone="inverse" variant="lead">
                {closingReflection.body}
              </EditorialText>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}
      </main>
    </>
  )
}
