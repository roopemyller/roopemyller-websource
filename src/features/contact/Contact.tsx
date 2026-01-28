
import styles from './Contact.module.css';
import React, { useState, useRef } from 'react';
import { FaEnvelope, FaInstagram, FaGithub, FaTelegram, FaLinkedin } from 'react-icons/fa';
import HCaptcha from '@hcaptcha/react-hcaptcha';


/**
 * Contact section with form and social links.
 * Integrated with Web3Forms for serverless form submission.
 *
 * @component
 * @returns {JSX.Element}
 */
const Contact: React.FC = React.memo(() => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const captchaRef = useRef<HCaptcha>(null);

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
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    'h-captcha-response': captchaToken,
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setCaptchaToken(null);
                captchaRef.current?.resetCaptcha();
                // Reset success message after 5 seconds
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
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <section className={styles.contact} aria-labelledby="contact-heading">
            <h2 id="contact-heading" tabIndex={0}>Contact</h2>
            <form className={styles.form} aria-label="Contact form" onSubmit={handleSubmit}>
                <label htmlFor="name" className="visually-hidden">Your Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                />
                <label htmlFor="email" className="visually-hidden">Your Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                />
                <label htmlFor="message" className="visually-hidden">Your Message</label>
                <textarea
                    id="message"
                    placeholder="Your Message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                />
                <div className={styles.captchaContainer}>
                    <HCaptcha
                        sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
                        onVerify={(token) => setCaptchaToken(token)}
                        onExpire={() => setCaptchaToken(null)}
                        ref={captchaRef}
                    />
                </div>
                <button type="submit" disabled={status === 'loading' || !captchaToken}>
                    {status === 'loading' ? 'Sending...' : 'Send'}
                </button>
                {status === 'success' && (
                    <p className={styles.successMessage}>Message sent successfully! 🎉</p>
                )}
                {status === 'error' && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}
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
        </section>
    );
});

Contact.displayName = 'Contact';

export default Contact;
