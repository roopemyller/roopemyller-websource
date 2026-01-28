
import styles from './Projects.module.css';
import React from 'react';
import projects, { Project } from '../projects/projects';


/**
 * Projects section listing portfolio projects.
 *
 * @component
 * @returns {JSX.Element}
 */
const Projects: React.FC = React.memo(() => (
    <section className={styles.projects} aria-labelledby="projects-heading">
        <h2 id="projects-heading" tabIndex={0}>Projects</h2>
        <div className={styles.grid}>
            {projects.map((project: Project) => (
                <article key={project.title} className={styles.card} aria-label={project.title}>
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project
                    </a>
                </article>
            ))}
        </div>
    </section>
));

export default Projects;
