import { describe, it, expect } from 'vitest';
import { MODES, MODE_ORDER, type Mode } from './modes';

describe('mode registry', () => {
  it('MODE_ORDER and MODES agree on the set of modes', () => {
    expect([...MODE_ORDER].sort()).toEqual((Object.keys(MODES) as Mode[]).sort());
    expect(MODE_ORDER).toHaveLength(3);
    expect(new Set(MODE_ORDER).size).toBe(MODE_ORDER.length);
  });

  it('developer is first so its URL stays param-free', () => {
    expect(MODE_ORDER[0]).toBe('developer');
  });

  for (const mode of MODE_ORDER) {
    describe(mode, () => {
      const meta = MODES[mode];

      it('carries all required copy fields', () => {
        for (const key of [
          'label',
          'shortLabel',
          'heroEyebrow',
          'heroTitle',
          'heroSubtitle',
          'heroTagline',
          'aboutHeading',
          'aboutBio',
          'aboutChipsLabel',
          'contactPrompt',
        ] as const) {
          expect(meta[key], key).toBeTypeOf('string');
          expect(meta[key], key).not.toHaveLength(0);
        }
        expect(meta.id).toBe(mode);
        expect(meta.icon).toBeTypeOf('function');
      });

      it('has a non-empty aboutChips list of unique strings', () => {
        expect(meta.aboutChips.length).toBeGreaterThan(0);
        expect(new Set(meta.aboutChips).size).toBe(meta.aboutChips.length);
      });

      it('has sections starting with hero, ending with contact, all ids unique', () => {
        const ids = meta.sections.map((s) => s.id);
        expect(ids[0]).toBe('hero');
        expect(ids.at(-1)).toBe('contact');
        expect(new Set(ids).size).toBe(ids.length);
        for (const s of meta.sections) {
          expect(s.label).toBeTypeOf('string');
          expect(s.label).not.toHaveLength(0);
        }
      });
    });
  }
});
