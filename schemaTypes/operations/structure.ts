import type {StructureResolver} from 'sanity/structure'

export const operationsStructure: StructureResolver = (structureBuilder) =>
  structureBuilder
    .list()
    .title("Joshua's Point Operations")
    .items([
      structureBuilder
        .documentTypeListItem('stayEnquiry')
        .title('Stay Enquiries')
        .child(
          structureBuilder
            .documentTypeList('stayEnquiry')
            .title('Stay Enquiries')
            .defaultOrdering([{field: 'receivedAt', direction: 'desc'}]),
        ),
      structureBuilder
        .documentTypeListItem('wholeHouseStay')
        .title('Whole-house Stays')
        .child(
          structureBuilder
            .documentTypeList('wholeHouseStay')
            .title('Whole-house Stays')
            .defaultOrdering([{field: 'dates.arrival', direction: 'asc'}]),
        ),
    ])
