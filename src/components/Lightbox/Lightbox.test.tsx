import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Lightbox from './Lightbox';
import type { Photo } from '../Gallery/types';

const photos: Photo[] = [
  { src: '/a.jpg', alt: 'first photo', width: 100, height: 100 },
  { src: '/b.jpg', alt: 'second photo', width: 100, height: 100 },
  { src: '/c.jpg', alt: 'third photo', width: 100, height: 100 },
];

const setup = (activeIndex: number | null) => {
  const onClose = vi.fn();
  const onNavigate = vi.fn();
  render(
    <Lightbox photos={photos} activeIndex={activeIndex} onClose={onClose} onNavigate={onNavigate} />
  );
  return { onClose, onNavigate };
};

describe('Lightbox', () => {
  it('renders nothing while closed', () => {
    setup(null);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows the active photo in a labelled dialog', () => {
    setup(1);
    const dialog = screen.getByRole('dialog', { name: 'second photo' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'second photo' })).toHaveAttribute('src', '/b.jpg');
  });

  it('closes on Escape and on the close button', async () => {
    const { onClose } = setup(0);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('navigates with the arrow keys, wrapping at the ends', () => {
    const { onNavigate } = setup(0);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(onNavigate).toHaveBeenLastCalledWith(1);
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(onNavigate).toHaveBeenLastCalledWith(2); // wrapped from 0 -> last
  });

  it('navigates with the on-screen prev/next buttons', async () => {
    const { onNavigate } = setup(1);
    await userEvent.click(screen.getByRole('button', { name: /next photo/i }));
    expect(onNavigate).toHaveBeenLastCalledWith(2);
    await userEvent.click(screen.getByRole('button', { name: /previous photo/i }));
    expect(onNavigate).toHaveBeenLastCalledWith(0);
  });

  it('hides the prev/next controls when there is only one photo', () => {
    const onClose = vi.fn();
    const onNavigate = vi.fn();
    render(
      <Lightbox
        photos={[photos[0]]}
        activeIndex={0}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );
    expect(screen.queryByRole('button', { name: /next photo/i })).not.toBeInTheDocument();
  });

  it('closes when the backdrop is clicked but not the figure', async () => {
    const { onClose } = setup(0);
    await userEvent.click(screen.getByRole('img', { name: 'first photo' }));
    expect(onClose).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });
});
