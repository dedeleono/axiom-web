'use client'

import { visionTool } from '@sanity/vision'
import { PluginOptions, defineConfig } from 'sanity'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId, studioUrl } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { pageStructure, singletonPlugin } from './sanity/plugins/settings'
import { blogSettings } from './sanity/schemaTypes/blog'
import faqPage from './sanity/schemaTypes/faqPage'
import philosophySection from './sanity/schemaTypes/philosophySection'
import { resolveHref } from './sanity/lib/utils'

const blogLocation = {
  title: "Blog",
  href: "/blog",
} satisfies DocumentLocation;

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema,
  plugins: [
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: "/blog/posts/:slug",
            filter: `_type == "post" && slug.current == $slug`,
          },
          {
            route: "/areas/:slug",
            filter: `_type == "location" && slug.current == $slug`,
          },
        ]),
        locations: {
          blogSettings: defineLocations({
            locations: [blogLocation],
            message: "This document is used on the blog pages",
            tone: "caution",
          }),
          post: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Untitled",
                  href: resolveHref("post", doc?.slug)!,
                },
                blogLocation,
              ],
            }),
          }),
          location: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => {
              const href = resolveHref("location", doc?.slug);
              return {
                locations: href
                  ? [{ title: doc?.title || "Area", href }]
                  : [],
              };
            },
          }),
        },
      },
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    structureTool({ structure: pageStructure([blogSettings, faqPage, philosophySection]) }),
    singletonPlugin([blogSettings.name, faqPage.name, philosophySection.name]),
    unsplashImageAsset(),
    process.env.NODE_ENV === 'development' &&
      visionTool({ defaultApiVersion: apiVersion }),
  ].filter(Boolean) as PluginOptions[],
})
