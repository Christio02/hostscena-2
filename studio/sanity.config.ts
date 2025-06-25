/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */
import {assist} from '@sanity/assist'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  defineDocuments,
  defineLocations,
  presentationTool,
  type DocumentLocation,
} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {resolve} from './src/presentation/resolve'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'o5icaqul'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'


export default defineConfig({
  name: 'default',
  title: 'Høstscena',
  projectId,
  dataset,
  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        preview: '/',
        previewMode: {
          enable: `/api/draft-mode/enable`,
        },
      },
      resolve,
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },
})
