import {
  EditorialContainer,
  EditorialGrid,
  EditorialMedia,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {MotionReveal} from '@/components/motion'
import type {SocialProfile} from '@/lib/social-profiles'
import type {EditorialInstagramPost} from '@/sanity/mappers/instagram-posts'

type EditorialInstagramSectionProps = {
  heading?: string
  introduction?: string
  posts?: readonly EditorialInstagramPost[]
  profile: Pick<SocialProfile, 'href' | 'label'>
}

const externalLinkClasses =
  'inline-flex min-h-11 items-center border-b border-ink/35 font-body text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus'

export function EditorialInstagramSection({
  heading = "From Joshua's Point",
  introduction = 'Occasional photographs and observations from the house and the places around it.',
  posts = [],
  profile,
}: EditorialInstagramSectionProps) {
  const selectedPosts = posts.slice(0, 3)

  return (
    <SectionSpacing aria-labelledby="instagram-editorial-title" className="bg-surface-soft" size="generous">
      <EditorialContainer>
        <EditorialGrid gap="generous">
          <EditorialText className="lg:col-span-2" variant="eyebrow">
            Instagram
          </EditorialText>
          <MotionReveal className="lg:col-span-8 lg:col-start-4">
            <EditorialText
              as="h2"
              className="max-w-3xl"
              headingSize="medium"
              id="instagram-editorial-title"
              variant="heading"
            >
              {heading}
            </EditorialText>
            <EditorialText className="mt-9 max-w-2xl" variant="body">
              {introduction}
            </EditorialText>
          </MotionReveal>
        </EditorialGrid>

        {selectedPosts.length > 0 ? (
          <div className="mt-16 grid gap-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {selectedPosts.map((post, index) => (
              <MotionReveal as="article" delay={index === 0 ? 'none' : 'short'} key={post.id}>
                <figure>
                  <a
                    aria-label={`View selected Joshua's Point post ${index + 1} on Instagram (opens in a new tab)`}
                    className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                    href={post.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <EditorialMedia
                      image={post.image}
                      imageClassName="transition-transform duration-[var(--jp-motion-duration-reveal)] ease-[var(--jp-motion-ease-soft)] group-hover:scale-[1.012]"
                      ratio="portrait"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
                      tone="stone"
                    />
                  </a>
                  {post.caption ? (
                    <EditorialText as="figcaption" className="mt-5 max-w-sm" variant="caption">
                      {post.caption}
                    </EditorialText>
                  ) : null}
                </figure>
              </MotionReveal>
            ))}
          </div>
        ) : null}

        <div className="mt-12 lg:ml-[25%]">
          <a
            aria-label={`Visit ${profile.label} — Joshua's Point (opens in a new tab)`}
            className={externalLinkClasses}
            href={profile.href}
            rel="noreferrer"
            target="_blank"
          >
            Visit Joshua&apos;s Point on {profile.label}
          </a>
        </div>
      </EditorialContainer>
    </SectionSpacing>
  )
}
