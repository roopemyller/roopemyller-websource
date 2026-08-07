import { motion, useReducedMotion } from 'framer-motion';
import { useMode } from '../../app/ModeContext';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import styles from './About.module.css';

export default function About() {
  const { meta } = useMode();
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.about} id="about" aria-labelledby="about-heading">
      <SectionReveal className={styles.card}>
        <h2 id="about-heading" tabIndex={0}>
          {meta.aboutHeading}
        </h2>
        <p>{meta.aboutBio}</p>
        <ul className={styles.chipList} aria-label={meta.aboutChipsLabel}>
          {meta.aboutChips.map((chip, i) => (
            <motion.li
              key={chip}
              className={styles.chip}
              initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              {chip}
            </motion.li>
          ))}
        </ul>
      </SectionReveal>
    </section>
  );
}
