import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../app/ModeContext';
import { MODE_ORDER, MODES, type Mode } from '../../app/modes';
import styles from './Navigation.module.css';

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export default function Navigation() {
  const { mode, setMode } = useMode();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const activeSections = MODES[mode].sections;
  const [activeSectionId, setActiveSectionId] = useState(activeSections[0]?.id);

  // The active-mode pill is positioned from measured button offsets rather than
  // Framer's layoutId/layout FLIP animation. `.nav` is `position: fixed`, and
  // Framer's layout projection compensates for ancestor scroll assuming normal
  // document flow — inside a fixed element that's wrong, so the pill animated
  // in from an offset equal to however far the page had been scrolled. Explicit
  // offsetLeft/offsetTop measurement is scroll-position-independent by construction.
  const modeSwitcherRef = useRef<HTMLDivElement>(null);
  const modeButtonRefs = useRef<Partial<Record<Mode, HTMLButtonElement>>>({});
  const [pillRect, setPillRect] = useState<Rect | null>(null);

  const updatePillRect = () => {
    const btn = modeButtonRefs.current[mode];
    if (!btn) return;
    setPillRect({
      left: btn.offsetLeft,
      top: btn.offsetTop,
      width: btn.offsetWidth,
      height: btn.offsetHeight,
    });
  };

  // Same fix as the mode pill, same reason: `.navList` sits inside the fixed
  // `.nav`, so the underline's old layoutId FLIP animated in offset by the
  // page's scroll position. Measured offsets sidestep that entirely, and work
  // for both the horizontal desktop list and the stacked mobile dropdown since
  // they're read from the button's actual layout regardless of orientation.
  const navListRef = useRef<HTMLUListElement>(null);
  const sectionLinkRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [underlineRect, setUnderlineRect] = useState<Rect | null>(null);

  // Clicking a nav link smooth-scrolls through every section in between, and the
  // IntersectionObserver below would fire for each one — making the underline
  // bounce (target → about → career → target). While a programmatic scroll is
  // in flight we pin the clicked section and ignore observer updates until the
  // scroll settles (`scrollend`, or a timeout fallback for Safari / no-op scrolls).
  const programmaticScrollRef = useRef(false);
  const scrollSettleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const updateUnderlineRect = () => {
    if (!activeSectionId) return;
    const btn = sectionLinkRefs.current[activeSectionId];
    if (!btn) return;
    const inset = 17.6; // 1.1rem at the default 16px root font size
    setUnderlineRect({
      left: btn.offsetLeft + inset,
      top: btn.offsetTop + btn.offsetHeight - 2 - 4.8,
      width: btn.offsetWidth - inset * 2,
      height: 2,
    });
  };

  // The transitionend and resize listeners below are attached once and must
  // always call the current measurement functions, not whatever was in scope
  // when they were registered — route them through refs so they never run a
  // stale closure (e.g. the resize listener re-measuring the pill against the
  // initial-render `mode` instead of the current one).
  const updateUnderlineRectRef = useRef(updateUnderlineRect);
  updateUnderlineRectRef.current = updateUnderlineRect;
  const updatePillRectRef = useRef(updatePillRect);
  updatePillRectRef.current = updatePillRect;

  useLayoutEffect(() => {
    updatePillRect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useLayoutEffect(() => {
    updateUnderlineRect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSectionId, isOpen]);

  // The mobile dropdown animates open/closed via a `max-height` transition.
  // The layout effect above measures synchronously the instant `isOpen`
  // flips, which is before that transition has actually run, so it can grab
  // stale (still-collapsed) offsets. Re-measuring once the transition finishes
  // corrects the underline to its real resting position.
  useEffect(() => {
    const el = navListRef.current;
    if (!el) return;
    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'max-height') updateUnderlineRectRef.current();
    };
    el.addEventListener('transitionend', handleTransitionEnd);
    return () => el.removeEventListener('transitionend', handleTransitionEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      updatePillRectRef.current();
      updateUnderlineRectRef.current();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    setActiveSectionId(activeSections[0]?.id);
    const observer = new IntersectionObserver(
      (entries) => {
        if (programmaticScrollRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    const raf = requestAnimationFrame(() => {
      activeSections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    const releaseGuard = () => {
      programmaticScrollRef.current = false;
    };
    window.addEventListener('scrollend', releaseGuard);
    return () => {
      window.removeEventListener('scrollend', releaseGuard);
      clearTimeout(scrollSettleTimer.current);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    setActiveSectionId(sectionId);
    programmaticScrollRef.current = true;
    clearTimeout(scrollSettleTimer.current);
    // Fallback: 'scrollend' is unsupported in Safari, and never fires when the
    // page is already at the target (nothing to scroll).
    scrollSettleTimer.current = setTimeout(() => {
      programmaticScrollRef.current = false;
    }, 1200);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleModeChange = (next: Mode) => {
    setMode(next);
    setIsOpen(false);
  };

  return (
    <nav ref={navRef} className={styles.nav} role="navigation" aria-label="Main navigation">
      <span className="visually-hidden" role="status" aria-live="polite">
        {MODES[mode].label} mode active
      </span>
      <div className={styles.navContainer}>
        <div ref={modeSwitcherRef} className={styles.modeSwitcher} role="tablist" aria-label="Portfolio mode">
          {pillRect && (
            <motion.span
              className={styles.modePill}
              animate={{ left: pillRect.left, top: pillRect.top, width: pillRect.width, height: pillRect.height }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          {MODE_ORDER.map((m) => {
            const meta = MODES[m];
            const Icon = meta.icon;
            const isActive = m === mode;
            return (
              <button
                key={m}
                ref={(el) => {
                  if (el) modeButtonRefs.current[m] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.modeButton} ${isActive ? styles.modeButtonActive : ''}`}
                onClick={() => handleModeChange(m)}
              >
                <span className={styles.modeButtonContent}>
                  <Icon aria-hidden="true" />
                  <span className={styles.modeLabel}>{meta.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.menuIcon}>{isOpen ? '✕' : '☰'}</span>
        </button>

        <ul ref={navListRef} className={`${styles.navList} ${isOpen ? styles.navListOpen : ''}`}>
          {underlineRect && (
            <motion.span
              className={styles.underline}
              animate={{
                left: underlineRect.left,
                top: underlineRect.top,
                width: underlineRect.width,
                height: underlineRect.height,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 34 }}
            />
          )}
          {activeSections.map((section) => {
            const isSectionActive = section.id === activeSectionId;
            return (
              <li key={section.id}>
                <button
                  ref={(el) => {
                    sectionLinkRefs.current[section.id] = el;
                  }}
                  onClick={() => scrollToSection(section.id)}
                  className={`${styles.navLink} ${isSectionActive ? styles.navLinkActive : ''}`}
                  aria-current={isSectionActive ? 'true' : undefined}
                >
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
