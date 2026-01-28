
import styles from './Hero.module.css';
import React from 'react';


/**
 * Hero section for landing page.
 * Displays avatar, name, and tagline.
 *
 * @component
 * @returns {JSX.Element}
 */
const Hero: React.FC = React.memo(() => (
    <section className={styles.hero} aria-label="Hero section">
        <div className={styles.content}>
            <img
                src="https://avatars.githubusercontent.com/u/22277901?v=4"
                alt="Portrait of Roope Myller"
                className={styles.avatar}
                width={160}
                height={160}
            />
            <h1 tabIndex={0}>Roope Myller</h1>
            <h2>Software Engineering Student</h2>
            <h2>Freelance Photographer</h2>
            <p>
                Studying software engineering, building modern web apps, and capturing the world through my lens. Keyboard goes clickity-clackity...
            </p>
        </div>
    </section>
));

export default Hero;
