import Image from 'next/image'

export type BrandLogoSources = {
  horizontal?: string
  mark?: string
}

type BrandLogoProps = {
  alt?: string
  className?: string
  priority?: boolean
  sources?: BrandLogoSources
  tone?: 'adaptive' | 'inverse'
  variant?: 'horizontal' | 'mark'
}

const horizontalDimensions = {
  height: 360,
  width: 1200,
}

const markDimensions = {
  height: 64,
  width: 64,
}

export function BrandLogo({
  alt = "Joshua's Point",
  className = '',
  priority = false,
  sources,
  tone = 'adaptive',
  variant = 'horizontal',
}: BrandLogoProps) {
  if (variant === 'mark') {
    return (
      <Image
        alt={alt}
        className={className}
        height={markDimensions.height}
        priority={priority}
        src={sources?.mark ?? '/brand/favicon.svg'}
        unoptimized={!sources?.mark}
        width={markDimensions.width}
      />
    )
  }

  if (tone === 'inverse') {
    return (
      <Image
        alt={alt}
        className={className}
        height={horizontalDimensions.height}
        priority={priority}
        src="/brand/logo-light.png"
        width={horizontalDimensions.width}
      />
    )
  }

  return (
    <span className={`jp-brand-logo-adaptive relative inline-block aspect-[10/3] ${className}`}>
      <Image
        alt={alt}
        className="jp-brand-logo-on-light object-contain"
        fill
        priority={priority}
        sizes="(min-width: 640px) 240px, 200px"
        src={sources?.horizontal ?? '/brand/logo-horizontal.png'}
      />
      <Image
        alt=""
        aria-hidden="true"
        className="jp-brand-logo-on-dark object-contain"
        fill
        priority={priority}
        sizes="(min-width: 640px) 240px, 200px"
        src="/brand/logo-light.png"
      />
    </span>
  )
}
