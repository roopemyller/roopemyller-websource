import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Reveal from './Reveal';

// The test environment reports prefers-reduced-motion, so Reveal renders the
// plain element with no motion props — which is exactly what we want to assert.
describe('Reveal (reduced motion)', () => {
  it('renders a div by default with children and className', () => {
    render(
      <Reveal className="card">
        <span>hello</span>
      </Reveal>
    );
    const el = screen.getByText('hello').parentElement;
    expect(el?.tagName).toBe('DIV');
    expect(el).toHaveClass('card');
  });

  it('renders the requested element via `as`', () => {
    render(
      <ul>
        <Reveal as="li">item</Reveal>
      </ul>
    );
    expect(screen.getByText('item').tagName).toBe('LI');
  });

  it('passes anchor attributes through for as="a"', () => {
    render(
      <Reveal as="a" href="https://example.com" target="_blank" rel="noopener noreferrer">
        link
      </Reveal>
    );
    const link = screen.getByRole('link', { name: 'link' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('does not leak motion-only props onto the DOM node', () => {
    render(
      <Reveal as="article" whileHover={{ y: -8 }} index={2}>
        card
      </Reveal>
    );
    const el = screen.getByText('card');
    expect(el).not.toHaveAttribute('whileHover');
    expect(el).not.toHaveAttribute('index');
  });
});
