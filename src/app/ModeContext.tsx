import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { MODE_ORDER, MODES, type Mode, type ModeMeta } from './modes';

const DEFAULT_MODE: Mode = 'developer';
const MODE_PARAM = 'mode';

// Timings for the mode-switch "curtain": fade to black, swap content while
// fully covered, hold briefly, then fade back out. Keeping the content swap
// hidden behind an opaque curtain avoids any mid-transition flicker from
// each mode's own mount animations (e.g. Hero's entrance stagger).
const CURTAIN_FADE_MS = 240;
const CURTAIN_HOLD_MS = 90;

interface ModeContextValue {
  mode: Mode;
  meta: ModeMeta;
  setMode: (mode: Mode) => void;
  isTransitioning: boolean;
}

const ModeContext = createContext<ModeContextValue | null>(null);

function isMode(value: string | null): value is Mode {
  return value !== null && (MODE_ORDER as readonly string[]).includes(value);
}

// Reads the mode from ?mode=<id> so each mode is a shareable/bookmarkable link.
function readModeFromLocation(): Mode {
  const param = new URLSearchParams(window.location.search).get(MODE_PARAM);
  return isMode(param) ? param : DEFAULT_MODE;
}

// Developer is the default, so its URL stays clean (no query param).
function urlForMode(mode: Mode): string {
  const url = new URL(window.location.href);
  if (mode === DEFAULT_MODE) {
    url.searchParams.delete(MODE_PARAM);
  } else {
    url.searchParams.set(MODE_PARAM, mode);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeInternal] = useState<Mode>(() => readModeFromLocation());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pendingModeRef = useRef<Mode | null>(null);
  // Mirror of `mode` so the stable callbacks below can read the current value
  // without listing `mode` as a dependency (which would re-create them every switch).
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
    document.title = `Roope Myller — ${MODES[mode].label}`;
  }, [mode]);

  // Normalize the URL on first mount (e.g. an invalid ?mode= value falls back to the default).
  useEffect(() => {
    window.history.replaceState({ mode }, '', urlForMode(mode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transitionTo = useCallback((next: Mode) => {
    pendingModeRef.current = next;
    setIsTransitioning(true);

    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      setModeInternal(next);
      pendingModeRef.current = null;

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, CURTAIN_HOLD_MS);
    }, CURTAIN_FADE_MS);
  }, []);

  const setMode = useCallback(
    (next: Mode) => {
      if (next === modeRef.current || pendingModeRef.current === next) return;
      window.history.pushState({ mode: next }, '', urlForMode(next));
      transitionTo(next);
    },
    [transitionTo]
  );

  // Keeps the back/forward buttons working now that mode switches push history entries.
  useEffect(() => {
    const handlePopState = () => {
      const next = readModeFromLocation();
      if (next !== modeRef.current && pendingModeRef.current !== next) {
        transitionTo(next);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [transitionTo]);

  const value = useMemo<ModeContextValue>(
    () => ({ mode, meta: MODES[mode], setMode, isTransitioning }),
    [mode, setMode, isTransitioning]
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return ctx;
}
