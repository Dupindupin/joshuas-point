import type {Metadata} from 'next'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialMedia,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {RoomPreview, type RoomPreviewData} from '@/components/rooms/room-preview'
import {SiteHeader} from '@/components/site/site-header'

export const metadata: Metadata = {
  title: "Rooms | Joshua's Point",
  description: 'Rooms shaped by natural light, moving air, and the landscape of the ridge.',
}

const rooms = [
  {
    capacity: 'Two guests',
    description:
      'A quiet room along the eastern edge of the house, where early light moves slowly across timber and stone.',
    href: '/rooms/ridge-room',
    id: 'ridge-room',
    name: 'The Ridge Room',
    tone: 'morning',
  },
  {
    capacity: 'Two guests',
    description:
      'Set closer to the planted courtyard, this room is held by deep shade, moving air, and a sheltered view of the garden.',
    href: '/rooms/garden-room',
    id: 'garden-room',
    name: 'The Garden Room',
    tone: 'stone',
  },
  {
    capacity: 'Up to four guests',
    description:
      'A generous room for shared mornings, opening toward a quieter pocket of sky at the center of the house.',
    href: '/rooms/courtyard-room',
    id: 'courtyard-room',
    name: 'The Courtyard Room',
    tone: 'morning',
  },
] satisfies readonly RoomPreviewData[]

export default function RoomsPage() {
  return (
    <>
      <SiteHeader activeHref="/rooms" appearance="solid" />
      <main className="bg-linen">
        <EditorialPageHero
          eyebrow="Accommodation"
          introduction="Rooms arranged for unhurried mornings, open windows, and the quieter hours at the edge of the day."
          title="Rooms"
        />

        <SectionSpacing aria-labelledby="rooms-introduction-title" size="generous">
          <EditorialContainer size="reading">
            <EditorialText
              as="h2"
              headingSize="small"
              id="rooms-introduction-title"
              variant="heading"
            >
              Rest is part of the architecture.
            </EditorialText>
            <EditorialText className="mt-10 max-w-xl lg:mt-12" variant="body">
              The rooms at Joshua’s Point are composed around shade, natural air, and a direct
              relationship with the outdoors. Each one offers a different way of inhabiting the
              same landscape.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="room-collection-title" size="generous">
          <EditorialContainer>
            <EditorialGrid>
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                The rooms
              </EditorialText>
              <EditorialText
                className="max-w-3xl lg:col-span-8 lg:col-start-3"
                headingSize="medium"
                id="room-collection-title"
                variant="heading"
              >
                Spaces held close to the landscape.
              </EditorialText>
            </EditorialGrid>

            <div className="mt-12 sm:mt-16">
              {rooms.map((room, index) => (
                <SectionSpacing as="div" key={room.id} size="compact">
                  <RoomPreview layout={index % 2 === 0 ? 'image-left' : 'image-right'} room={room} />
                </SectionSpacing>
              ))}
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="Rooms opening toward the landscape" size="standard">
          <figure>
            <EditorialMedia ratio="panoramic" sizes="100vw" tone="stone" />
            <EditorialContainer>
              <EditorialText
                as="figcaption"
                className="mt-4 max-w-sm lg:ml-auto"
                variant="caption"
              >
                Late afternoon settles across the rooms and garden.
              </EditorialText>
            </EditorialContainer>
          </figure>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="comfort-title" size="immersive">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Comfort
              </EditorialText>
              <EditorialText
                className="max-w-3xl lg:col-span-8 lg:col-start-3"
                headingSize="medium"
                id="comfort-title"
                variant="heading"
              >
                Enough, carefully considered.
              </EditorialText>
              <EditorialText
                className="max-w-xl lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:mt-12"
                variant="body"
              >
                Comfort here is simple: a room that stays cool, materials that feel natural to the
                touch, soft light at the right hours, and enough quiet to hear the weather change.
              </EditorialText>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-label="Closing reflection"
          className="bg-charcoal"
          size="immersive"
        >
          <EditorialContainer size="reading">
            <EditorialText tone="inverse" variant="lead">
              A room at Joshua’s Point is a place to notice the light, leave the windows open, and
              let the day arrive in its own time.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
