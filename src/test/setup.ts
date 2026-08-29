import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Re-install the jsdom-missing browser APIs before every test, so a test file
// that calls vi.restoreAllMocks() can't strip them out from under the next one.
beforeEach(() => {
  // Report `prefers-reduced-motion: reduce` as true so components render their
  // static (non-animated) DOM — the stable path to assert against in unit tests.
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: /prefers-reduced-motion(:\s*reduce)?/.test(query),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  }
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

  Element.prototype.scrollIntoView = vi.fn();
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.removeAttribute('data-mode');
  document.documentElement.removeAttribute('data-consent');
});
