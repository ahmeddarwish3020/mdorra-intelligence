import 'server-only';

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import { projectSchema, type Project } from '@/content/projects/schema';

const contentDirectory = join(process.cwd(), 'content', 'projects');

function parseProjectFile(filePath: string): Project {
  const raw = readFileSync(filePath, 'utf8');
  const { data } = matter(raw);

  return projectSchema.parse(data);
}

export const getAllProjects = cache((): Project[] => {
  if (!existsSync(contentDirectory)) {
    return [];
  }

  // Files prefixed with `_` (e.g. content/projects/_template.md) are
  // authoring templates and are never treated as projects.
  return readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => parseProjectFile(join(contentDirectory, file)));
});

export function getPublishedProjects(): Project[] {
  return getAllProjects().filter((project) => project.status === 'published');
}

export function getProjectBySlug(slug: string): Project | undefined {
  if (slug.startsWith('_')) {
    return undefined;
  }

  const filePath = join(contentDirectory, `${slug}.md`);

  if (!existsSync(filePath)) {
    return undefined;
  }

  return parseProjectFile(filePath);
}
