import {getCliClient} from 'sanity/cli'

const applyChanges = process.argv.includes('--apply')
const client = getCliClient({apiVersion: '2025-02-19'})

const documents = await client.fetch(
  '*[_id in ["siteSettings", "drafts.siteSettings", "destinationsPage", "drafts.destinationsPage"]]{_id, footer, seo}',
)

const transaction = client.transaction()
const changes = []

for (const document of documents) {
  if (document._id === 'siteSettings' || document._id === 'drafts.siteSettings') {
    const groups = document.footer?.navigationGroups
    if (!Array.isArray(groups)) continue

    const nextGroups = groups.map((group) =>
      group?.title?.trim().toLowerCase() === 'guides'
        ? {
            ...group,
            items: (group.items ?? []).filter(
              (item) => item?.link?.internalRoute !== '/dive-sites',
            ),
          }
        : group,
    )

    transaction.patch(document._id, (patch) => patch.set({'footer.navigationGroups': nextGroups}))
    changes.push(`${document._id}: removed the duplicate Dive Guide footer link`)
  }

  if (document._id === 'destinationsPage' || document._id === 'drafts.destinationsPage') {
    transaction.patch(document._id, (patch) =>
      patch.set({
        'seo.socialTitle': "Destinations | Joshua's Point",
        'seo.socialDescription':
          'A slowly gathered editorial guide to exploring southern Negros from Joshua’s Point.',
      }),
    )
    changes.push(`${document._id}: aligned Open Graph title and description with page SEO`)
  }
}

if (applyChanges && changes.length > 0) await transaction.commit()

console.log(
  JSON.stringify(
    {
      mode: applyChanges ? 'applied' : 'dry-run',
      changes,
    },
    null,
    2,
  ),
)
