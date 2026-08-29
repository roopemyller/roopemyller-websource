import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModeProvider } from '../../app/ModeContext';
import { MODES } from '../../app/modes';
import Navigation from './Navigation';

function renderNav() {
  return render(
    <ModeProvider>
      <Navigation />
      {/* Scroll targets the nav looks up by id */}
      {MODES.developer.sections.map((s) => (
        <div key={s.id} id={s.id} />
      ))}
    </ModeProvider>
  );
}

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('Navigation', () => {
  it('renders a link for every section in the active mode', () => {
    renderNav();
    for (const section of MODES.developer.sections) {
      expect(screen.getByRole('button', { name: section.label })).toBeInTheDocument();
    }
  });

  it('renders the three mode switch tabs', () => {
    renderNav();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((t) => t.textContent)).toEqual(['Dev', 'Photo', 'SRA']);
  });

  it('scrolls the target section into view when a section link is clicked', async () => {
    renderNav();
    const about = document.getElementById('about')!;
    const spy = vi.spyOn(about, 'scrollIntoView');
    await userEvent.click(screen.getByRole('button', { name: 'About' }));
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth', block: 'start' }));
  });

  it('scrolls to top for the Home link', async () => {
    renderNav();
    await userEvent.click(screen.getByRole('button', { name: 'Home' }));
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });

  it('switching mode updates the URL query param', () => {
    vi.useFakeTimers();
    try {
      renderNav();
      // fireEvent.click is synchronous — setMode pushes history before the curtain timer.
      fireEvent.click(screen.getByRole('tab', { name: 'Photo' }));
      expect(window.location.search).toBe('?mode=photography');
      act(() => {
        vi.runOnlyPendingTimers();
      });
    } finally {
      vi.useRealTimers();
    }
  });
});
