import { useRef, useState } from 'react';
import { m } from 'framer-motion';
import Lightbox from '../Lightbox/Lightbox';
import type { Photo } from './types';
import styles from './Gallery.module.css';

interface GalleryProps {
  photos: Photo[];
}

export default function Gallery({ photos }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openAt = (index: number, el: HTMLButtonElement) => {
    lastTriggerRef.current = el;
    setActiveIndex(index);
  };

  const handleClose = () => {
    setActiveIndex(null);
    lastTriggerRef.current?.focus();
  };

  return (
    <>
      <div className={styles.grid}>
        {photos.map((photo, idx) => (
          <m.button
            key={photo.src}
            type="button"
            className={styles.item}
            onClick={(e) => openAt(idx, e.currentTarget)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View photo: ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            {photo.caption && <span className={styles.caption}>{photo.caption}</span>}
          </m.button>
        ))}
      </div>
      <Lightbox photos={photos} activeIndex={activeIndex} onClose={handleClose} onNavigate={setActiveIndex} />
    </>
  );
}
