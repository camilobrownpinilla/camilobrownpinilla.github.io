// Data files and the fields they're allowed to have.
// A typo (e.g. a link without a url) stops the build with a clear error.
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const publications = defineCollection({
  loader: file('src/sections/publications/publications.yaml'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      authors: z.string().optional(),
      venue: z.string().optional(),
      image: image().optional(),
      featured: z.boolean().default(false),
      links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    }),
});

const places = defineCollection({
  loader: file('src/sections/misc/places.yaml'),
  schema: z.object({
    name: z.string(),
    country: z.string().default(''),
    lat: z.number(),
    long: z.number(),
  }),
});

export const collections = { publications, places };
