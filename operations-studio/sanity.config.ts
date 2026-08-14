import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {operationsSchemaTypes} from '../schemaTypes/operations'
import {operationsStructure} from '../schemaTypes/operations/structure'
import {OperationsOwnerDashboard} from './owner-dashboard/OperationsOwnerDashboard'

export default defineConfig({
  name: 'operations',
  title: "Joshua's Point Operations",

  projectId: 'bx0jlvt3',
  dataset: 'operations',

  plugins: [structureTool({structure: operationsStructure})],

  tools: (tools) => [
    {
      name: 'owner-operations',
      title: 'Owner Dashboard',
      component: OperationsOwnerDashboard,
    },
    ...tools,
  ],

  schema: {
    types: operationsSchemaTypes,
  },
})
