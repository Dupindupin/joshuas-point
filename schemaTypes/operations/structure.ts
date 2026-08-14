import type {StructureResolver} from 'sanity/structure'

export const operationsStructure: StructureResolver = (structureBuilder) =>
  structureBuilder
    .list()
    .title("Joshua's Point Operations")
    .items([
      structureBuilder
        .documentTypeListItem('stayEnquiry')
        .title('Enquiry Center')
        .child(
          structureBuilder
            .documentTypeList('stayEnquiry')
            .title('Enquiry Center')
            .defaultOrdering([{field: 'receivedAt', direction: 'desc'}]),
        ),
      structureBuilder
        .documentTypeListItem('wholeHouseStay')
        .title('Stay Center')
        .child(
          structureBuilder
            .documentTypeList('wholeHouseStay')
            .title('Stay Center')
            .defaultOrdering([{field: 'dates.arrival', direction: 'asc'}]),
        ),
    ])
