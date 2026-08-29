import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import career from './career';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import styles from './Career.module.css';

export default function Career() {
  return (
    <section className={styles.career} id="career" aria-labelledby="career-heading">
      <SectionReveal>
        <h2 id="career-heading" tabIndex={0}>
          Career
        </h2>
      </SectionReveal>

      <ol className={styles.timeline}>
        {career.map((entry, idx) => (
          <motion.li
            key={`${entry.organization}-${entry.period}`}
            className={styles.entry}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.dot} aria-hidden="true" />
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{entry.role ?? entry.organization}</h3>
                {entry.role && (
                  <p className={styles.org}>
                    {entry.organization}
                    {entry.type && <span className={styles.type}> · {entry.type}</span>}
                  </p>
                )}
                <p className={styles.period}>
                  {entry.period}
                  {entry.location && <span className={styles.location}> · {entry.location}</span>}
                </p>
              </div>
              {entry.description && <p className={styles.description}>{entry.description}</p>}
              {entry.skills && (
                <ul className={styles.skills} aria-label="Skills">
                  {entry.skills.map((skill) => (
                    <li key={skill} className={styles.skill}>
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
              {entry.positions && (
                <ul className={styles.positions}>
                  {entry.positions.map((position) => (
                    <li key={`${position.title}-${position.period}`}>
                      <p className={styles.positionTitle}>{position.title}</p>
                      <p className={styles.positionPeriod}>{position.period}</p>
                      {position.description && (
                        <p className={styles.positionDescription}>{position.description}</p>
                      )}
                      {position.skills && (
                        <ul className={styles.skills} aria-label="Skills">
                          {position.skills.map((skill) => (
                            <li key={skill} className={styles.skill}>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.li>
        ))}
      </ol>

      <SectionReveal className={styles.linkedinWrap}>
        <a
          className={styles.linkedinLink}
          href="https://www.linkedin.com/in/roopemyller/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin aria-hidden="true" />
          Full experience on LinkedIn
        </a>
      </SectionReveal>
    </section>
  );
}
