import Link from 'next/link'

import {
  EditorialContainer,
  EditorialFigure,
  EditorialGrid,
  EditorialMedia,
  EditorialText,
  SectionSpacing,
  type EditorialImage,
} from '@/components/editorial'
import {EditorialMap} from '@/components/maps'
import type {
  EditorialMapMarker,
  EditorialMapRoute,
  EditorialMapViewport,
} from '@/components/maps'
import {HorizonLine, MotionReveal} from '@/components/motion'
import {
  PremiumPhotoEssays,
  type PremiumPhotoEssayData,
} from '@/components/premium-guide/premium-photo-essay'

export type PremiumJourneySequenceItem = {
  body: string
  label: string
  title: string
}

export type PremiumJourneyLink = {
  description?: string
  href: string
  label: string
}

export type PremiumJourneyDetailProps = {
  audience: readonly string[]
  bring: readonly string[]
  confirmNotes: readonly string[]
  fieldNotes: readonly string[]
  image?: EditorialImage
  imageCaption: string
  imagePosition?: string
  introduction: string
  localPerspective: readonly string[]
  mapCaption: string
  mapMarkers?: readonly EditorialMapMarker[]
  mapRoutes?: readonly EditorialMapRoute[]
  mapViewport?: EditorialMapViewport
  number: string
  photographyRoles: readonly string[]
  photoEssays?: readonly PremiumPhotoEssayData[]
  photographySummary: string
  place: readonly string[]
  practicalNotes: readonly string[]
  preparation: readonly string[]
  relatedLinks: readonly PremiumJourneyLink[]
  route: string
  sequence: readonly PremiumJourneySequenceItem[]
  smallDetails: readonly string[]
  title: string
  why: readonly string[]
}

type SectionHeadingProps = {
  eyebrow: string
  id: string
  title: string
  tone?: 'default' | 'inverse'
}

function SectionHeading({eyebrow, id, title, tone = 'default'}: SectionHeadingProps) {
  return (
    <div>
      <EditorialText tone={tone} variant="eyebrow">
        {eyebrow}
      </EditorialText>
      <EditorialText
        as="h2"
        className="mt-7"
        headingSize="small"
        id={id}
        tone={tone}
        variant="heading"
      >
        {title}
      </EditorialText>
    </div>
  )
}

function Paragraphs({items}: {items: readonly string[]}) {
  return (
    <div className="space-y-7">
      {items.map((item) => (
        <EditorialText key={item} variant="body">
          {item}
        </EditorialText>
      ))}
    </div>
  )
}

function QuietList({items}: {items: readonly string[]}) {
  return (
    <ul className="border-t border-border">
      {items.map((item) => (
        <li
          className="border-b border-border py-5 font-body text-sm leading-7 text-ink-muted sm:text-base"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function PremiumJourneyDetail({
  audience,
  bring,
  confirmNotes,
  fieldNotes,
  image,
  imageCaption,
  imagePosition,
  introduction,
  localPerspective,
  mapCaption,
  mapMarkers = [],
  mapRoutes = [],
  mapViewport,
  number,
  photographyRoles,
  photoEssays = [],
  photographySummary,
  place,
  practicalNotes,
  preparation,
  relatedLinks,
  route,
  sequence,
  smallDetails,
  title,
  why,
}: PremiumJourneyDetailProps) {
  const hasMapData = mapMarkers.length > 0 || mapRoutes.length > 0
  const selectedItemId = mapRoutes[0]?.id ?? mapMarkers[0]?.id

  return (
    <article>
      <SectionSpacing size="immersive">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-2">
              <EditorialText variant="eyebrow">Journey {number}</EditorialText>
              <p className="mt-6 font-body text-xs leading-6 text-ink-subtle">{route}</p>
            </div>
            <div className="lg:col-span-9 lg:col-start-4">
              <EditorialText as="h1" headingSize="large" variant="heading">
                {title}
              </EditorialText>
              <EditorialText className="mt-10 max-w-2xl" variant="lead">
                {introduction}
              </EditorialText>
            </div>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <EditorialFigure
        caption={imageCaption}
        captionContainer="wide"
        media={{
          image,
          objectPosition: imagePosition,
          ratio: 'panoramic',
          sizes: '100vw',
          tone: number === '02' ? 'morning' : 'stone',
        }}
      />

      <SectionSpacing aria-labelledby="premium-place-title" size="generous">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-3">
              <HorizonLine />
              <div className="mt-8">
                <SectionHeading eyebrow="01 · Context" id="premium-place-title" title="The Place" />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-6">
              <Paragraphs items={place} />
            </div>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <SectionSpacing
        aria-labelledby="premium-recommendation-title"
        className="bg-surface-soft"
        size="generous"
      >
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="02 · Joshua’s Point"
                id="premium-recommendation-title"
                title="Why We Recommend It"
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-6">
              <Paragraphs items={why} />
            </div>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <SectionSpacing aria-labelledby="premium-journey-title" size="generous">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-3">
              <SectionHeading eyebrow="03 · Sequence" id="premium-journey-title" title="The Journey" />
            </div>
            <ol className="border-t border-border lg:col-span-8 lg:col-start-5">
              {sequence.map((item, index) => (
                <MotionReveal
                  as="li"
                  className="grid gap-4 border-b border-border py-8 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-7"
                  delay={index % 3 === 0 ? 'none' : index % 3 === 1 ? 'short' : 'medium'}
                  key={`${item.label}-${item.title}`}
                >
                  <span className="font-body text-xs tracking-[0.12em] text-ink-subtle">
                    {item.label}
                  </span>
                  <div>
                    <h3 className="font-display text-3xl leading-tight text-ink">{item.title}</h3>
                    <EditorialText className="mt-4 max-w-2xl" variant="body">
                      {item.body}
                    </EditorialText>
                  </div>
                </MotionReveal>
              ))}
            </ol>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <SectionSpacing
        aria-labelledby="premium-local-perspective-title"
        className="bg-inverse-surface"
        size="immersive"
      >
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-3">
              <SectionHeading
                eyebrow="04 · Tobias"
                id="premium-local-perspective-title"
                title="Local Perspective"
                tone="inverse"
              />
            </div>
            <div className="space-y-8 lg:col-span-7 lg:col-start-5">
              {localPerspective.map((paragraph, index) =>
                index === 0 ? (
                  <EditorialText className="text-inverse" key={paragraph} tone="inverse" variant="quote">
                    {paragraph}
                  </EditorialText>
                ) : (
                  <EditorialText
                    className="max-w-2xl text-inverse/72"
                    key={paragraph}
                    tone="inverse"
                    variant="body"
                  >
                    {paragraph}
                  </EditorialText>
                ),
              )}
            </div>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <SectionSpacing size="generous">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <section aria-labelledby="premium-audience-title" className="lg:col-span-5">
              <SectionHeading
                eyebrow="05 · Character"
                id="premium-audience-title"
                title="Who Will Love It"
              />
              <div className="mt-10">
                <QuietList items={audience} />
              </div>
            </section>
            <section
              aria-labelledby="premium-prepare-title"
              className="lg:col-span-5 lg:col-start-8 lg:mt-28"
            >
              <SectionHeading
                eyebrow="06 · Readiness"
                id="premium-prepare-title"
                title="Prepare For The Day"
              />
              <div className="mt-10">
                <QuietList items={preparation} />
              </div>
            </section>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <SectionSpacing className="bg-surface-soft" size="generous">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <section aria-labelledby="premium-bring-title" className="lg:col-span-5">
              <SectionHeading eyebrow="07 · Pack" id="premium-bring-title" title="What To Bring" />
              <div className="mt-10">
                <QuietList items={bring} />
              </div>
            </section>
            <section
              aria-labelledby="premium-details-title"
              className="lg:col-span-5 lg:col-start-8"
            >
              <SectionHeading
                eyebrow="08 · Field notes"
                id="premium-details-title"
                title="Small Details That Make It Better"
              />
              <ul className="mt-10 space-y-7">
                {smallDetails.map((item) => (
                  <li className="border-l border-accent/45 pl-6" key={item}>
                    <EditorialText variant="body">{item}</EditorialText>
                  </li>
                ))}
              </ul>
            </section>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <SectionSpacing
        aria-labelledby="premium-map-title"
        className="bg-inverse-surface"
        size="generous"
      >
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-3 lg:self-end lg:pb-8">
              <SectionHeading
                eyebrow="09 · Offline orientation"
                id="premium-map-title"
                title="Map"
                tone="inverse"
              />
              <EditorialText className="mt-7 text-inverse/70" tone="inverse" variant="body">
                The map supports the sequence. It never replaces current local guidance or the
                readable journey beside it.
              </EditorialText>
            </div>
            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              {hasMapData ? (
                <EditorialMap
                  ariaLabel={`Editorial map for ${title}`}
                  caption={mapCaption}
                  className="[&>figcaption]:text-inverse/60"
                  markers={mapMarkers}
                  routes={mapRoutes}
                  selectedItemId={selectedItemId}
                  viewport={mapViewport}
                />
              ) : (
                <div>
                  <EditorialMedia ratio="landscape" tone="stone" />
                  <EditorialText className="mt-4 text-inverse/60" tone="inverse" variant="caption">
                    {mapCaption}
                  </EditorialText>
                </div>
              )}
            </div>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <SectionSpacing aria-labelledby="premium-photography-title" size="generous">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="10 · Visual essay"
                id="premium-photography-title"
                title="Photography"
              />
              <EditorialText className="mt-8" variant="body">
                {photographySummary}
              </EditorialText>
            </div>
            <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {photographyRoles.map((role, index) => (
                <li className="border-t border-border pt-5" key={role}>
                  <span className="font-body text-[0.625rem] tracking-[0.16em] text-ink-subtle">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <EditorialText className="mt-3" variant="caption">
                    {role}
                  </EditorialText>
                </li>
              ))}
            </ol>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <PremiumPhotoEssays essays={photoEssays} />

      <SectionSpacing
        aria-labelledby="premium-related-title"
        className="bg-surface-soft"
        size="standard"
      >
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-3">
              <SectionHeading
                eyebrow="11 · Continue outward"
                id="premium-related-title"
                title="Related Places"
              />
            </div>
            <nav aria-label={`Related places for ${title}`} className="lg:col-span-8 lg:col-start-5">
              <ul className="border-t border-border">
                {relatedLinks.map((link) => (
                  <li className="border-b border-border" key={link.href}>
                    <Link
                      className="group grid rounded-sm py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] sm:items-baseline sm:gap-8"
                      href={link.href}
                    >
                      <span className="font-display text-2xl text-ink">{link.label}</span>
                      <span className="mt-2 font-body text-sm leading-6 text-ink-muted sm:mt-0">
                        {link.description}
                      </span>
                      <span aria-hidden="true" className="mt-3 text-ink-subtle group-hover:text-ink sm:mt-0">
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <SectionSpacing aria-labelledby="premium-practical-title" size="generous">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-3">
              <SectionHeading
                eyebrow="12 · Verified only"
                id="premium-practical-title"
                title="Practical Notes"
              />
            </div>
            <div className="lg:col-span-4 lg:col-start-5">
              <EditorialText variant="eyebrow">Held in the guide</EditorialText>
              <div className="mt-6">
                <QuietList items={practicalNotes} />
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:mt-20">
              <EditorialText variant="eyebrow">Confirm before leaving</EditorialText>
              <div className="mt-6">
                <QuietList items={confirmNotes} />
              </div>
            </div>
            {fieldNotes.length > 0 ? (
              <EditorialText className="lg:col-span-8 lg:col-start-5" variant="caption">
                {fieldNotes.join(' · ')}
              </EditorialText>
            ) : null}
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>
    </article>
  )
}
