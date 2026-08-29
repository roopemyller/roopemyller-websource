import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConsentProvider } from '../../app/consent';
import { ModeProvider } from '../../app/ModeContext';
import Contact from './Contact';

// Stand in for the real hCaptcha widget: exposes resetCaptcha and a button that
// fires onVerify, so tests can drive the token flow without the third-party script.
vi.mock('@hcaptcha/react-hcaptcha', async () => {
  const React = await import('react');
  type Props = { onVerify: (t: string) => void; onExpire: () => void };
  const MockHCaptcha = React.forwardRef<{ resetCaptcha: () => void }, Props>((props, ref) => {
    React.useImperativeHandle(ref, () => ({ resetCaptcha: () => props.onExpire() }));
    return React.createElement(
      'button',
      { type: 'button', onClick: () => props.onVerify('test-token') },
      'solve captcha'
    );
  });
  return { default: MockHCaptcha };
});

const renderContact = () =>
  render(
    <ConsentProvider>
      <ModeProvider>
        <Contact />
      </ModeProvider>
    </ConsentProvider>
  );

// Pre-seed a consent record so hCaptcha (the mock) is allowed to mount.
const allowCaptcha = () =>
  localStorage.setItem(
    'rm-consent',
    JSON.stringify({ v: 1, analytics: false, captcha: true, ts: '2026-01-01T00:00:00.000Z' })
  );

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('Contact form', () => {
  it('renders name/email/message fields wired to matching name attributes', async () => {
    renderContact();
    const name = screen.getByPlaceholderText('Your Name');
    const email = screen.getByPlaceholderText('Your Email');
    const message = screen.getByPlaceholderText('Your Message');
    expect(name).toHaveAttribute('name', 'name');
    expect(email).toHaveAttribute('name', 'email');
    expect(message).toHaveAttribute('name', 'message');

    await userEvent.type(name, 'Ada');
    expect(name).toHaveValue('Ada');
  });

  it('keeps Send disabled until there is a captcha token', () => {
    renderContact();
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  it('blocks the form and offers to enable hCaptcha when consent is missing', async () => {
    renderContact();
    await userEvent.click(screen.getByPlaceholderText('Your Name'));
    expect(screen.getByText(/spam protection \(hcaptcha\) is turned off/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /solve captcha/i })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /enable hcaptcha/i }));
    expect(await screen.findByRole('button', { name: /solve captcha/i })).toBeInTheDocument();
  });

  it('submits to Web3Forms once a token is present and shows the success state', async () => {
    allowCaptcha();
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));

    renderContact();
    await userEvent.type(screen.getByPlaceholderText('Your Name'), 'Ada');
    await userEvent.type(screen.getByPlaceholderText('Your Email'), 'ada@example.com');
    await userEvent.type(screen.getByPlaceholderText('Your Message'), 'Hello there');
    await userEvent.click(await screen.findByRole('button', { name: /solve captcha/i }));

    await userEvent.click(screen.getByRole('button', { name: /^send$/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(JSON.parse((init as RequestInit).body as string)).toMatchObject({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Hello there',
      'h-captcha-response': 'test-token',
    });
    expect(await screen.findByText(/message sent successfully/i)).toBeInTheDocument();
  });

  it('surfaces a network error from the submission', async () => {
    allowCaptcha();
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    renderContact();
    await userEvent.type(screen.getByPlaceholderText('Your Name'), 'Ada');
    await userEvent.type(screen.getByPlaceholderText('Your Email'), 'ada@example.com');
    await userEvent.type(screen.getByPlaceholderText('Your Message'), 'Hi');
    await userEvent.click(await screen.findByRole('button', { name: /solve captcha/i }));
    await userEvent.click(screen.getByRole('button', { name: /^send$/i }));

    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });
});
