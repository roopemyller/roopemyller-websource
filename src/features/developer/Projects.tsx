import { motion } from 'framer-motion';
import projects, { type Project } from './projects';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
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
          <motion.a
            key={project.title}
            className={styles.card}
            aria-label={`View project: ${project.title}`}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (idx % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            <img src={project.image} alt={project.title} loading="lazy" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span className={styles.link}>View Project</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
