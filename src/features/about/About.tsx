
import styles from './About.module.css';
import React from 'react';


/**
 * About section with skills and links.
 *
 * @component
 * @returns {JSX.Element}
 */
const About: React.FC = React.memo(() => (
    <section className={styles.about} aria-labelledby="about-heading">
        <div className={styles.aboutCard}>
            <h2 id="about-heading" tabIndex={0}>About Me</h2>
            <p>
                Hi! I’m a passionate software engineering student and a freelance photographer. I love building modern web apps, tinkering with Arduinos and embedded systems, and exploring the world of Linux. My dream is to work on tech that matters—maybe in the defense industry, maybe somewhere else.
            </p>
            <p>I’m always learning, always creating.</p>
            <ul className={styles.chipList} aria-label="Skills">
                {[
                    'Python',
                    'React',
                    'TypeScript',
                    'Java',
                    'C',
                    'Node.js',
                    'MongoDB',
                    'Postgres',
                    'SQLite',
                    'Linux',
                    'Embedded Systems',
                    'Photography',
                ].map((skill) => (
                    <li className={styles.chip} key={skill}>{skill}</li>
                ))}
            </ul>
        </div>
    </section>
));

export default About;
