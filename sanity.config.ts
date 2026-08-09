import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {singletonTypes, structure} from './schemaTypes/structure'

export default defineConfig({
  name: 'default',
  title: "Joshua's Point",

  projectId: '8m6fb3x7',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

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
  },
})
