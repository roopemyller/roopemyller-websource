import projects, { type Project } from './projects';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import Reveal from '../../components/Reveal/Reveal';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section className={styles.projects} id="projects" aria-labelledby="projects-heading">
      <SectionReveal>
        <h2 id="projects-heading" tabIndex={0}>
          Projects
        </h2>
      </SectionReveal>
      <div className={styles.grid}>
        {projects.map((project: Project, idx) => (
          <Reveal
            as="a"
            key={project.title}
            className={styles.card}
            aria-label={`View project: ${project.title}`}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            index={idx % 2}
            stagger={0.08}
            amount={0.3}
            whileHover={{ y: -8 }}
          >
            <img src={project.image} alt={project.title} loading="lazy" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span className={styles.link}>View Project</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
