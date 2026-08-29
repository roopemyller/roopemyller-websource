import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConsentProvider, useConsent } from '../../app/consent';
import CookieBanner from './CookieBanner';

const STORAGE_KEY = 'rm-consent';
const stored = () => JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');

function Harness() {
  return (
    <ConsentProvider>
      <CookieBanner />
      <ReopenButton />
    </ConsentProvider>
  );
}
function ReopenButton() {
  const { openPreferences } = useConsent();
  return <button onClick={openPreferences}>Cookie settings</button>;
}

describe('CookieBanner', () => {
  it('shows on first visit with all three choices', () => {
    render(<Harness />);
    expect(screen.getByRole('dialog', { name: /cookie/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accept all' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject non-essential' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Manage choices' })).toBeInTheDocument();
  });

  it('"Accept all" stores full consent and dismisses the banner', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Accept all' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(stored()).toMatchObject({ analytics: true, captcha: true });
  });

  it('"Reject non-essential" stores a deny-all decision', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Reject non-essential' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(stored()).toMatchObject({ analytics: false, captcha: false });
  });

  it('lets you enable a single category through "Manage choices"', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Manage choices' }));

    const analytics = screen.getByRole('checkbox', { name: /performance analytics/i });
    const captcha = screen.getByRole('checkbox', { name: /spam protection/i });
    const necessary = screen.getByRole('checkbox', { name: /necessary/i });
    expect(necessary).toBeDisabled();
    expect(necessary).toBeChecked();

    await userEvent.click(analytics);
    await userEvent.click(screen.getByRole('button', { name: 'Save choices' }));

    expect(stored()).toMatchObject({ analytics: true, captcha: false });
    expect(captcha).toBeDefined();
  });

  it('is re-openable in the preferences view after a decision', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Accept all' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Cookie settings' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /privacy choices/i })).toBeInTheDocument();
    // Reflects the stored "accept all" state.
    expect(screen.getByRole('checkbox', { name: /performance analytics/i })).toBeChecked();

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
