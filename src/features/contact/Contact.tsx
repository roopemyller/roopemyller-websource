import { useState, useRef, lazy, Suspense } from 'react';
import type HCaptchaType from '@hcaptcha/react-hcaptcha';
import { FaEnvelope, FaInstagram, FaGithub, FaTelegram, FaLinkedin } from 'react-icons/fa';
import { useMode } from '../../app/ModeContext';
import { useConsent } from '../../app/consent';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import styles from './Contact.module.css';

// hCaptcha injects a ~200 KB third-party script + iframe on mount. Load it only
// once the visitor actually interacts with the form (privacy + performance), and
// split the wrapper out of the main bundle.
const HCaptcha = lazy(() => import('@hcaptcha/react-hcaptcha'));

type FormField = 'name' | 'email' | 'message';

export default function Contact() {
  const { meta } = useMode();
  const { consent, save } = useConsent();
  const [formData, setFormData] = useState<Record<FormField, string>>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formTouched, setFormTouched] = useState(false);
  const captchaRef = useRef<HCaptchaType>(null);

  // hCaptcha loads only after the visitor touches the form AND has allowed the
  // spam-protection category in the cookie banner.
  const captchaReady = formTouched && consent.captcha;
  const enableCaptcha = () => save({ analytics: consent.analytics, captcha: true });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus('error');
      setErrorMessage('Please complete the captcha verification.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          'h-captcha-response': captchaToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
      <SectionReveal>
        <h2 id="contact-heading" tabIndex={0}>
          Contact
        </h2>
        <p className={styles.prompt}>{meta.contactPrompt}</p>
        <form
          className={styles.form}
          aria-label="Contact form"
          onSubmit={handleSubmit}
          onFocus={() => setFormTouched(true)}
        >
          <label htmlFor="name" className="visually-hidden">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'loading'}
          />
          <label htmlFor="email" className="visually-hidden">
            Your Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'loading'}
          />
          <label htmlFor="message" className="visually-hidden">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            disabled={status === 'loading'}
          />
          <div className={styles.captchaContainer}>
            {captchaReady ? (
              <Suspense fallback={null}>
                <HCaptcha
                  sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  ref={captchaRef}
                />
              </Suspense>
            ) : (
              formTouched && (
                <p className={styles.captchaBlocked}>
                  Spam protection (hCaptcha) is turned off, so this form can't be sent.{' '}
                  <button type="button" onClick={enableCaptcha}>
                    Enable hCaptcha
                  </button>
                </p>
              )
            )}
          </div>
          <button type="submit" disabled={status === 'loading' || !captchaToken}>
            {status === 'loading' ? 'Sending...' : 'Send'}
          </button>
          {status === 'success' && <p className={styles.successMessage}>Message sent successfully! 🎉</p>}
          {status === 'error' && <p className={styles.errorMessage}>{errorMessage}</p>}
          <p className={styles.privacyNote}>
            Your message is sent via Web3Forms, with hCaptcha for spam protection (loaded only with
            your consent). See the <a href="/privacy.html">privacy notice</a> for how your data is
            handled.
          </p>
        </form>
        <nav className={styles.socials} aria-label="Social links">
          <a href="mailto:roope.myller@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
          <a href="https://www.linkedin.com/in/roopemyller/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/roopemyller" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://t.me/roopemyller" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <FaTelegram />
          </a>
          <a href="https://www.instagram.com/myllervisuals/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </nav>
      </SectionReveal>
    </section>
  );
}
