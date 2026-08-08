import { motion } from 'framer-motion';
import education, { upcomingThesis } from './education';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import styles from './Academics.module.css';

export default function Academics() {
  return (
    <section className={styles.academics} id="academics" aria-labelledby="academics-heading">
      <SectionReveal>
        <h2 id="academics-heading" tabIndex={0}>
          Academics
        </h2>
      </SectionReveal>

      <div className={styles.list}>
        <motion.article
          className={`${styles.card} ${styles.upcoming}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.badge}>Topic open</span>
          <h3>Master&apos;s Thesis</h3>
          <p className={styles.period}>{upcomingThesis.period}</p>
          <p className={styles.thesisDescription}>{upcomingThesis.description}</p>
          <ul className={styles.directions}>
            {upcomingThesis.directions.map((direction) => (
              <li key={direction}>{direction}</li>
            ))}
          </ul>
          <p className={styles.seekingNote}>{upcomingThesis.seekingNote}</p>
        </motion.article>

        {education.map((entry, idx) => (
          <motion.article
            key={entry.institution + entry.period}
            className={`${styles.card} ${entry.badge ? styles.upcoming : ''}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (idx + 1) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {entry.badge && <span className={styles.badge}>{entry.badge}</span>}
            <h3>{entry.institution}</h3>
            <p className={styles.degree}>{entry.degree}</p>
            <p className={styles.period}>{entry.period}</p>
            {entry.details && (
              <ul className={styles.details}>
                {entry.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
            {entry.thesis && (
              <div className={styles.thesis}>
                <p className={styles.thesisTitle}>{entry.thesis.title}</p>
                <p className={styles.thesisTitleEn}>{entry.thesis.titleEn}</p>
                <p className={styles.thesisLanguage}>{entry.thesis.language}</p>
                <p className={styles.thesisDescription}>{entry.thesis.description}</p>
                {entry.thesis.link && (
                  <a
                    href={entry.thesis.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.thesisLink}
                  >
                    Read thesis
                  </a>
                )}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
