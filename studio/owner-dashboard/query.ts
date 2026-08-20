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
  "houseAvailability": {
    "published": *[_type == "houseAvailability" && _id == "houseAvailability"][0] {
      _id,
      _rev,
      publicDisplayEnabled,
      availabilityConfirmedThrough,
      lastReviewedAt,
      periods[] {
        _key,
        startDate,
        endDate,
        status
      }
    },
    "draft": *[_type == "houseAvailability" && _id == "drafts.houseAvailability"][0] {
      _id,
      _rev,
      publicDisplayEnabled,
      availabilityConfirmedThrough,
      lastReviewedAt,
      periods[] {
        _key,
        startDate,
        endDate,
        status
      }
    }
  },
  "documents": *[
    _type in [
      "homePage", "housePage", "roomsPage", "destinationsPage", "diveSitesPage",
      "scenicRoutesPage", "room", "destination", "diveSite", "scenicRoute",
      "informationPage"
    ]
  ] | order(_type asc, title asc) {
    _id,
    _type,
    _updatedAt,
    "title": coalesce(title, name, hero.title, internalTitle),
    "slug": slug.current,
    workflowStatus,
    lastReviewedAt,
    "summaryDescription": coalesce(excerpt, hero.introduction, introduction, siteDescription),
    "contentBlockCount": count(body),
    "heroImage": coalesce(heroImage, previewImage, hero.image) {asset},
    "roomImages": featuredRooms[]->previewImage {asset},
    "viewImage": view.image {asset},
    "sharedHeartImageCount": count(sharedHeart.images[defined(asset)]),
    "indoorOutdoorImageCount": count(indoorOutdoorStory.images[defined(image.asset)]),
    "morningPresent": defined(dailyRhythms.morning),
    "morningImage": dailyRhythms.morning.image {asset},
    "rainPresent": defined(dailyRhythms.rain),
    "rainImage": dailyRhythms.rain.image {asset},
    "eveningPresent": defined(dailyRhythms.evening),
    "eveningImage": dailyRhythms.evening.image {asset},
    "materialCount": count(materialsAndArchitecture.materials),
    "materialImageCount": count(materialsAndArchitecture.materials[defined(image.asset)]),
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
