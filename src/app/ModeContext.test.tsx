import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, renderHook, screen, act } from '@testing-library/react';
import { ModeProvider, useMode } from './ModeContext';

const wrapper = ({ children }: { children: React.ReactNode }) => <ModeProvider>{children}</ModeProvider>;

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('useMode', () => {
  it('throws outside a provider', () => {
    expect(() => renderHook(() => useMode())).toThrow(/ModeProvider/);
  });

  it('defaults to developer with a clean URL', () => {
    const { result } = renderHook(() => useMode(), { wrapper });
    expect(result.current.mode).toBe('developer');
    expect(result.current.meta.label).toBe('Developer');
    expect(window.location.search).toBe('');
  });

  it('reads a valid ?mode= param', () => {
    window.history.replaceState({}, '', '/?mode=photography');
    const { result } = renderHook(() => useMode(), { wrapper });
    expect(result.current.mode).toBe('photography');
  });

  it('falls back to developer and normalises an invalid ?mode= param', () => {
    window.history.replaceState({}, '', '/?mode=not-a-mode');
    const { result } = renderHook(() => useMode(), { wrapper });
    expect(result.current.mode).toBe('developer');
    expect(window.location.search).toBe('');
  });

  it('sets data-mode and the document title', () => {
    window.history.replaceState({}, '', '/?mode=shooting');
    renderHook(() => useMode(), { wrapper });
    expect(document.documentElement.getAttribute('data-mode')).toBe('shooting');
    expect(document.title).toMatch(/SRA/);
  });

  describe('setMode', () => {
    afterEach(() => vi.useRealTimers());

    it('pushes history immediately and swaps mode after the curtain delay', () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useMode(), { wrapper });

      act(() => result.current.setMode('photography'));
      // URL + history updated synchronously; visible mode still old behind the curtain.
      expect(window.location.search).toBe('?mode=photography');
      expect(result.current.isTransitioning).toBe(true);
      expect(result.current.mode).toBe('developer');

      act(() => vi.advanceTimersByTime(240));
      expect(result.current.mode).toBe('photography');

      act(() => vi.advanceTimersByTime(90));
      expect(result.current.isTransitioning).toBe(false);
    });

    it('ignores a no-op switch to the current mode', () => {
      const spy = vi.spyOn(window.history, 'pushState');
      const { result } = renderHook(() => useMode(), { wrapper });
      act(() => result.current.setMode('developer'));
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  it('responds to back/forward via popstate', () => {
    vi.useFakeTimers();
    window.history.replaceState({}, '', '/?mode=photography');
    const { result } = renderHook(() => useMode(), { wrapper });
    expect(result.current.mode).toBe('photography');

    act(() => {
      window.history.replaceState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      vi.advanceTimersByTime(400);
    });
    expect(result.current.mode).toBe('developer');
    vi.useRealTimers();
  });
});

describe('ModeProvider rendering', () => {
  it('provides meta copy to consumers', () => {
    function Probe() {
      const { meta } = useMode();
      return <h1>{meta.heroTitle}</h1>;
    }
    render(<Probe />, { wrapper });
    expect(screen.getByRole('heading', { name: 'Roope Myller' })).toBeInTheDocument();
  });
});
