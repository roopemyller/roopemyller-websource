import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import type { Photo } from '../Gallery/types';
import { EASE_OUT } from '../../app/motion';
import styles from './Lightbox.module.css';

interface LightboxProps {
  photos: Photo[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, activeIndex, onClose, onNavigate }: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Cached once per open — the focusable set doesn't change while the lightbox
  // is mounted, so there's no need to re-query it on every Tab keypress.
  const focusablesRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const isOpen = activeIndex !== null;
  const photo = isOpen ? photos[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + photos.length) % photos.length);
  }, [activeIndex, photos.length, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % photos.length);
  }, [activeIndex, photos.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';
    focusablesRef.current =
      containerRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      ) ?? null;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Tab' && containerRef.current) {
        const focusables = focusablesRef.current;
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, goPrev, goNext, onClose]);

  return createPortal(
    <AnimatePresence>
      {photo && (
        <m.div
          ref={containerRef}
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <m.figure
            className={styles.frame}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <img src={photo.src} alt={photo.alt} />
            {photo.caption && <figcaption className={styles.caption}>{photo.caption}</figcaption>}
          </m.figure>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.nav} ${styles.prev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous photo"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                className={`${styles.nav} ${styles.next}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next photo"
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
