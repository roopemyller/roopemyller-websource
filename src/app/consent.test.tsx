import { describe, it, expect } from 'vitest';
import { render, renderHook, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConsentProvider, useConsent } from './consent';

const STORAGE_KEY = 'rm-consent';
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ConsentProvider>{children}</ConsentProvider>
);

const stored = () => JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');

describe('useConsent', () => {
  it('throws when used outside the provider', () => {
    expect(() => renderHook(() => useConsent())).toThrow(/ConsentProvider/);
  });

  it('starts undecided with all non-essential categories off', () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    expect(result.current.decided).toBe(false);
    expect(result.current.consent).toEqual({ analytics: false, captcha: false });
  });

  it('acceptAll grants every category and persists a versioned record', () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    act(() => result.current.acceptAll());
    expect(result.current.decided).toBe(true);
    expect(result.current.consent).toEqual({ analytics: true, captcha: true });
    expect(stored()).toMatchObject({ v: 1, analytics: true, captcha: true });
    expect(typeof stored().ts).toBe('string');
  });

  it('rejectAll records a decision with everything off', () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    act(() => result.current.rejectAll());
    expect(result.current.decided).toBe(true);
    expect(result.current.consent).toEqual({ analytics: false, captcha: false });
    expect(stored()).toMatchObject({ analytics: false, captcha: false });
  });

  it('save persists an arbitrary per-category choice', () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    act(() => result.current.save({ analytics: true, captcha: false }));
    expect(result.current.consent).toEqual({ analytics: true, captcha: false });
  });

  it('reads an existing valid record on mount', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: 1, analytics: true, captcha: false, ts: '2026-01-01T00:00:00.000Z' })
    );
    const { result } = renderHook(() => useConsent(), { wrapper });
    expect(result.current.decided).toBe(true);
    expect(result.current.consent).toEqual({ analytics: true, captcha: false });
  });

  it('ignores a record from an older schema version', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 0, analytics: true, captcha: true }));
    const { result } = renderHook(() => useConsent(), { wrapper });
    expect(result.current.decided).toBe(false);
  });

  it('ignores corrupt JSON without throwing', () => {
    localStorage.setItem(STORAGE_KEY, '{not json');
    const { result } = renderHook(() => useConsent(), { wrapper });
    expect(result.current.decided).toBe(false);
  });

  it('reflects decision state on <html data-consent>', () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    expect(document.documentElement.dataset.consent).toBe('pending');
    act(() => result.current.rejectAll());
    expect(document.documentElement.dataset.consent).toBe('set');
  });

  it('openPreferences / closePreferences toggle the panel flag', async () => {
    function Probe() {
      const { preferencesOpen, openPreferences, closePreferences } = useConsent();
      return (
        <div>
          <span data-testid="open">{String(preferencesOpen)}</span>
          <button onClick={openPreferences}>open</button>
          <button onClick={closePreferences}>close</button>
        </div>
      );
    }
    render(<Probe />, { wrapper });
    expect(screen.getByTestId('open')).toHaveTextContent('false');
    await userEvent.click(screen.getByText('open'));
    expect(screen.getByTestId('open')).toHaveTextContent('true');
    await userEvent.click(screen.getByText('close'));
    expect(screen.getByTestId('open')).toHaveTextContent('false');
  });
});
