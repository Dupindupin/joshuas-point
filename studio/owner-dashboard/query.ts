export const ownerDashboardQuery = /* groq */ `{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id,
    siteTitle,
    siteDescription,
    siteUrl,
    primaryLogo {asset},
    compactLogo {asset},
    faviconImage {asset},
    appIconImage {asset},
    defaultSocialImage {asset},
    squareProfileImage {asset},
    defaultSeo {metaTitle, metaDescription},
    contactDetails {
      email,
      phone,
      whatsappUrl,
      address {locality, region, postalCode, country}
    },
    propertyLocation {label, coordinates},
    primaryNavigation[] {label},
    bookingLinks {enabled, primary {label}},
    footer {
      socialLinks[] {platform, url},
      legalLinks[] {label}
    }
  },
  "documents": *[
    _type in [
      "homePage", "housePage", "roomsPage", "destinationsPage", "diveSitesPage",
      "scenicRoutesPage", "room", "destination", "diveSite", "scenicRoute"
    ] && !(_id in path("drafts.**"))
  ] | order(_type asc, title asc) {
    _id,
    _type,
    "title": coalesce(title, name, hero.title, internalTitle),
    "slug": slug.current,
    "heroImage": coalesce(heroImage, previewImage, hero.image) {asset},
    "stories": editorialPhotography.stories[] {
      title,
      heroImage {asset},
      openingImages[] {asset},
      journeyImages[] {asset},
      detailImages[] {asset},
      closingImages[] {asset}
    },
    "mapLocation": coalesce(mapLocation, propertyLocation) {coordinates},
    "routePathCount": count(routePath),
    "seoTitle": seo.metaTitle,
    "seoDescription": seo.metaDescription,
    "seoSocialImage": seo.socialImage {asset},
    "noIndex": coalesce(seo.noIndex, false),
    "canonicalUrl": seo.canonicalUrl
  },
  "guideEdition": *[_type == "guideEdition"] | order(_updatedAt desc)[0] {
    _id,
    _type,
    title,
    status,
    coverImage {asset},
    pdfReady,
    epubReady,
    photographyComplete
  },
  "guideChapters": *[_type == "guideChapter" && !(_id in path("drafts.**"))] {
    _id,
    _type,
    title
  },
  "guideJourneys": *[_type == "guideJourney" && !(_id in path("drafts.**"))] {
    _id,
    _type,
    title
  }
}`
