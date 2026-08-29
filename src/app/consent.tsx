import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

// Non-essential cookie/processing categories the site can use. "Necessary" is
// implicit (the site itself sets no cookies; only the stored consent record).
export interface ConsentState {
  analytics: boolean; // Vercel Speed Insights
  captcha: boolean; // hCaptcha on the contact form
}

const STORAGE_KEY = 'rm-consent';
const STORAGE_VERSION = 1;
const DENIED: ConsentState = { analytics: false, captcha: false };
const GRANTED: ConsentState = { analytics: true, captcha: true };

interface StoredConsent extends ConsentState {
  v: number;
  ts: string;
}

interface ConsentContextValue {
  /** Current choices. All false until the visitor decides. */
  consent: ConsentState;
  /** True once a choice has been saved (banner should be hidden). */
  decided: boolean;
  /** Whether the preferences panel is currently requested open. */
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (choices: ConsentState) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStored(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.v !== STORAGE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredConsent | null>(() => readStored());
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const persist = useCallback((choices: ConsentState) => {
    const record: StoredConsent = { v: STORAGE_VERSION, ts: new Date().toISOString(), ...choices };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Storage unavailable (private mode etc.) — keep the choice for this session only.
    }
    setStored(record);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => persist(GRANTED), [persist]);
  const rejectAll = useCallback(() => persist(DENIED), [persist]);
  const save = useCallback((choices: ConsentState) => persist(choices), [persist]);
  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  // Reflect consent on <html> so CSS / third parties can key off it if needed.
  useEffect(() => {
    const el = document.documentElement;
    el.dataset.consent = stored ? 'set' : 'pending';
  }, [stored]);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent: stored ? { analytics: stored.analytics, captcha: stored.captcha } : DENIED,
      decided: stored !== null,
      preferencesOpen,
      acceptAll,
      rejectAll,
      save,
      openPreferences,
      closePreferences,
    }),
    [stored, preferencesOpen, acceptAll, rejectAll, save, openPreferences, closePreferences]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return ctx;
}
