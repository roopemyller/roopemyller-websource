import { useEffect, useRef, useState } from 'react';
import { useConsent, type ConsentState } from '../../app/consent';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const { consent, decided, preferencesOpen, acceptAll, rejectAll, save, closePreferences } =
    useConsent();

  const visible = !decided || preferencesOpen;
  const [showDetails, setShowDetails] = useState(preferencesOpen);
  const [draft, setDraft] = useState<ConsentState>(consent);
  const panelRef = useRef<HTMLDivElement>(null);

  // Sync local state whenever the banner (re)opens.
  useEffect(() => {
    if (visible) {
      setShowDetails(preferencesOpen);
      setDraft(consent);
    }
  }, [visible, preferencesOpen, consent]);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      // Escape only cancels the preferences view when a choice already exists;
      // it never counts as consent.
      if (e.key === 'Escape' && decided) closePreferences();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, decided, closePreferences]);

  useEffect(() => {
    if (visible && showDetails) panelRef.current?.focus();
  }, [visible, showDetails]);

  if (!visible) return null;

  return (
    <div
      className={styles.wrap}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie and privacy choices"
    >
      <div className={styles.card} ref={panelRef} tabIndex={-1}>
        {!showDetails ? (
          <>
            <p className={styles.text}>
              This site uses no tracking cookies. It can optionally load{' '}
              <strong>anonymous performance analytics</strong> and, on the contact form,{' '}
              <strong>hCaptcha</strong> for spam protection — both only with your consent. See the{' '}
              <a href="/privacy.html">privacy notice</a>.
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.secondary} onClick={() => setShowDetails(true)}>
                Manage choices
              </button>
              <button type="button" className={styles.secondary} onClick={rejectAll}>
                Reject non-essential
              </button>
              <button type="button" className={styles.primary} onClick={acceptAll}>
                Accept all
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.heading}>Privacy choices</h2>
            <ul className={styles.categories}>
              <li>
                <label className={styles.category}>
                  <input type="checkbox" checked disabled />
                  <span>
                    <span className={styles.categoryName}>Necessary</span>
                    <span className={styles.categoryDesc}>
                      Required for the site to work and to remember this choice. Always on.
                    </span>
                  </span>
                </label>
              </li>
              <li>
                <label className={styles.category}>
                  <input
                    type="checkbox"
                    checked={draft.analytics}
                    onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
                  />
                  <span>
                    <span className={styles.categoryName}>Performance analytics</span>
                    <span className={styles.categoryDesc}>
                      Vercel Speed Insights — anonymous, cookieless page-speed metrics. Loads its
                      script only if enabled.
                    </span>
                  </span>
                </label>
              </li>
              <li>
                <label className={styles.category}>
                  <input
                    type="checkbox"
                    checked={draft.captcha}
                    onChange={(e) => setDraft((d) => ({ ...d, captcha: e.target.checked }))}
                  />
                  <span>
                    <span className={styles.categoryName}>Spam protection (hCaptcha)</span>
                    <span className={styles.categoryDesc}>
                      Needed to submit the contact form. Sets cookies and processes your IP/device
                      data for bot detection. If off, the form can't be sent.
                    </span>
                  </span>
                </label>
              </li>
            </ul>
            <div className={styles.actions}>
              {decided && (
                <button type="button" className={styles.secondary} onClick={closePreferences}>
                  Cancel
                </button>
              )}
              <button type="button" className={styles.secondary} onClick={() => save(draft)}>
                Save choices
              </button>
              <button type="button" className={styles.primary} onClick={acceptAll}>
                Accept all
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
