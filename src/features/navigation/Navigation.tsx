import styles from './Navigation.module.css';
import React, { useState } from 'react';

/**
 * Navigation component for section links.
 * Provides a responsive menu for navigating between sections.
 *
 * @component
 * @returns {JSX.Element}
 */
const Navigation: React.FC = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        if (sectionId === 'hero') {
            // Scroll to absolute top for consistent positioning with manual scroll
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsOpen(false);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setIsOpen(false);
            }
        }
    };

    return (
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
            <div className={styles.navContainer}>
                <button
                    className={styles.menuButton}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation menu"
                >
                    <span className={styles.menuIcon}>
                        {isOpen ? '✕' : '☰'}
                    </span>
                </button>
                <ul className={`${styles.navList} ${isOpen ? styles.navListOpen : ''}`}>
                    <li>
                        <button onClick={() => scrollToSection('hero')} className={styles.navLink}>
                            Home
                        </button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('about')} className={styles.navLink}>
                            About
                        </button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('projects')} className={styles.navLink}>
                            Projects
                        </button>
                    </li>
                    {/*
                    <li>
                        <button onClick={() => scrollToSection('photography')} className={styles.navLink}>
                            Photography
                        </button>
                    </li>
                    */}
                    <li>
                        <button onClick={() => scrollToSection('contact')} className={styles.navLink}>
                            Contact
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
});

Navigation.displayName = 'Navigation';

export default Navigation;
