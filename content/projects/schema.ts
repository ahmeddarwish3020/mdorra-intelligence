import { z } from 'zod';

export const disciplineSchema = z.enum([
  'Architecture',
  'Interior Design',
  'Spatial Design',
  '3D Visualization',
  'Technical Design',
  'Design Presentation',
  'Fit-Out & Execution',
]);

export const projectTypeSchema = z.enum(['Architecture', 'Interior Design', 'Fit-Out & Execution']);

export const mediaSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const videoSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  poster: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const galleryImageSchema = mediaSchema.extend({
  caption: z.string().optional(),
});

export const drawingHotspotSchema = z.object({
  // Position as percentages of the drawing image box (0–100).
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  label: z.string().min(1),
  title: z.string().optional(),
  detail: z.string().optional(),
  material: z.string().optional(),
  meta: z.string().optional(),
});

export const drawingSchema = mediaSchema.extend({
  caption: z.string().optional(),
  index: z.string().optional(),
  hotspots: z.array(drawingHotspotSchema).optional(),
});

export const materialSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const processStageSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const creditEntrySchema = z.object({
  role: z.string().min(1),
  name: z.string().min(1),
});

export const beforeAfterSchema = z.object({
  before: galleryImageSchema,
  after: galleryImageSchema,
  // Optional state/material labels rendered on the panels. When absent the
  // generic "Before / After" labels are used. Real material names belong to
  // real commissions — never invent them for placeholder content.
  beforeLabel: z.string().min(1).optional(),
  afterLabel: z.string().min(1).optional(),
});

export const projectSeoSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().min(1).optional(),
});

function normalizeCredits(
  entries: Array<{ role: string; name: string } | string>,
): Array<{ role: string; name: string }> {
  return entries.map((entry) =>
    typeof entry === 'string' ? { role: 'Credit', name: entry } : entry,
  );
}

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  type: projectTypeSchema.optional(),
  summary: z.string().min(1).optional(),
  overview: z.string().min(1).optional(),
  designApproach: z.string().min(1).optional(),
  disciplines: z.array(disciplineSchema).min(1),
  year: z.number().int().min(1900).max(2100).optional(),
  location: z.string().min(1).optional(),
  client: z.string().min(1).optional(),
  clientType: z.string().min(1).optional(),
  scope: z.string().min(1).optional(),
  size: z.string().min(1).optional(),
  services: z.array(z.string().min(1)).optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  hero: z
    .object({
      media: mediaSchema,
      video: videoSchema.optional(),
    })
    .optional(),
  cover: mediaSchema.optional(),
  gallery: z.array(galleryImageSchema).optional(),
  drawings: z.array(drawingSchema).optional(),
  materials: z.array(materialSchema).optional(),
  beforeAfter: beforeAfterSchema.optional(),
  process: z.array(processStageSchema).optional(),
  credits: z
    .array(z.union([creditEntrySchema, z.string().min(1)]))
    .transform(normalizeCredits)
    .optional(),
  related: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).optional(),
  seo: projectSeoSchema.optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type Discipline = z.infer<typeof disciplineSchema>;
export type ProjectType = z.infer<typeof projectTypeSchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;
export type Drawing = z.infer<typeof drawingSchema>;
export type DrawingHotspot = z.infer<typeof drawingHotspotSchema>;
export type Material = z.infer<typeof materialSchema>;
export type ProcessStage = z.infer<typeof processStageSchema>;
export type ProjectCredit = z.infer<typeof creditEntrySchema>;
export type BeforeAfterPair = z.infer<typeof beforeAfterSchema>;
export type ProjectVideo = z.infer<typeof videoSchema>;
