
import styles from './Contact.module.css';
import React from 'react';
import { FaEnvelope, FaInstagram, FaGithub, FaTelegram, FaLinkedin } from 'react-icons/fa';


/**
 * Contact section with form and social links.
 *
 * @component
 * @returns {JSX.Element}
 */
const Contact: React.FC = React.memo(() => (
    <section className={styles.contact} aria-labelledby="contact-heading">
        <h2 id="contact-heading" tabIndex={0}>Contact</h2>
        <form className={styles.form} aria-label="Contact form">
            <label htmlFor="name" className="visually-hidden">Your Name</label>
            <input id="name" type="text" placeholder="Your Name" required autoComplete="name" />
            <label htmlFor="email" className="visually-hidden">Your Email</label>
            <input id="email" type="email" placeholder="Your Email" required autoComplete="email" />
            <label htmlFor="message" className="visually-hidden">Your Message</label>
            <textarea id="message" placeholder="Your Message" required />
            <button type="submit">Send</button>
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
));

export default Contact;
