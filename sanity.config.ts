import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import DashboardIcon from '@sanity/icons/Dashboard'
import {schemaTypes} from './schemaTypes'
import {
  reviewDateBadge,
  supportsEditorialBadges,
  workflowStatusBadge,
} from './schemaTypes/editorial/badges'
import {singletonTypes, structure} from './schemaTypes/structure'
import {OwnerDashboard} from './studio/owner-dashboard/OwnerDashboard'

export default defineConfig({
  name: 'default',
  title: "Joshua's Point",

  projectId: '8m6fb3x7',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  tools: (tools) => [
    {
      name: 'owner-dashboard',
      title: 'Owner Dashboard',
      icon: DashboardIcon,
      component: OwnerDashboard,
    },
    ...tools,
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => !singletonTypes.has(template.schemaType)),
  },

  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(
            ({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action),
          )
        : actions,
    badges: (badges, context) =>
      supportsEditorialBadges(context.schemaType)
        ? [...badges, workflowStatusBadge, reviewDateBadge]
        : badges,
  },
})
