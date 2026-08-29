import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import photos from '../features/photography/photos';
import shootingPhotos from '../features/shooting/shooting-photos';
import projects from '../features/developer/projects';
import career from '../features/developer/career';
import education, { upcomingThesis } from '../features/developer/education';
import results from '../features/shooting/results';
import type { Photo } from '../components/Gallery/types';

// vitest runs with cwd at the project root.
const localPath = (src: string) => resolve(process.cwd(), 'public', src.replace(/^\//, ''));

describe.each([
  ['photography', photos],
  ['shooting', shootingPhotos],
])('%s gallery data', (_name, set: Photo[]) => {
  it('is non-empty', () => {
    expect(set.length).toBeGreaterThan(0);
  });

  it('every photo has alt text, intrinsic dimensions, and a file that exists', () => {
    for (const photo of set) {
      expect(photo.src, 'src').toMatch(/^\/photos\/.+\.(jpe?g|png|webp|avif)$/i);
      expect(photo.alt, `alt for ${photo.src}`).toBeTypeOf('string');
      expect(photo.alt.trim().length, `alt for ${photo.src}`).toBeGreaterThan(0);
      expect(photo.width, `width for ${photo.src}`).toBeGreaterThan(0);
      expect(photo.height, `height for ${photo.src}`).toBeGreaterThan(0);
      expect(existsSync(localPath(photo.src)), `${photo.src} missing on disk`).toBe(true);
    }
  });

  it('has no duplicate sources', () => {
    const srcs = set.map((p) => p.src);
    expect(new Set(srcs).size).toBe(srcs.length);
  });
});

describe('projects data', () => {
  it('every project has a title, description and https GitHub link', () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const p of projects) {
      expect(p.title.trim()).not.toHaveLength(0);
      expect(p.description.trim()).not.toHaveLength(0);
      expect(p.link).toMatch(/^https:\/\/github\.com\//);
      expect(p.image).toMatch(/^https:\/\//);
    }
  });

  it('titles are unique (used as React keys)', () => {
    const titles = projects.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

describe('career data', () => {
  it('each entry has an organization, a period, and either a role or positions', () => {
    for (const entry of career) {
      expect(entry.organization.trim()).not.toHaveLength(0);
      expect(entry.period.trim()).not.toHaveLength(0);
      expect(Boolean(entry.role) || (entry.positions?.length ?? 0) > 0).toBe(true);
      for (const pos of entry.positions ?? []) {
        expect(pos.title.trim()).not.toHaveLength(0);
        expect(pos.period.trim()).not.toHaveLength(0);
        for (const skill of pos.skills ?? []) expect(skill.trim()).not.toHaveLength(0);
      }
    }
  });

  it('entry keys (organization + period) are unique', () => {
    const keys = career.map((e) => `${e.organization}-${e.period}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('education data', () => {
  it('each entry has institution, degree, period; thesis links are https', () => {
    expect(education.length).toBeGreaterThan(0);
    for (const e of education) {
      expect(e.institution.trim()).not.toHaveLength(0);
      expect(e.degree.trim()).not.toHaveLength(0);
      expect(e.period.trim()).not.toHaveLength(0);
      if (e.thesis?.link) expect(e.thesis.link).toMatch(/^https?:\/\//);
    }
  });

  it('upcomingThesis has directions', () => {
    expect(upcomingThesis.directions.length).toBeGreaterThan(0);
  });
});

describe('results data', () => {
  it('each result has a unique id, a placement and a valid date', () => {
    const ids = results.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const r of results) {
      expect(r.placement.trim()).not.toHaveLength(0);
      expect(r.eventName.trim()).not.toHaveLength(0);
      expect(Number.isNaN(new Date(r.date).getTime()), `bad date: ${r.date}`).toBe(false);
    }
  });
});
