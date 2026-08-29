import { useMode } from '../../app/ModeContext';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import Reveal from '../../components/Reveal/Reveal';
import styles from './About.module.css';

export default function About() {
  const { meta } = useMode();

  return (
    <section className={styles.about} id="about" aria-labelledby="about-heading">
      <SectionReveal className={styles.card}>
        <h2 id="about-heading" tabIndex={0}>
          {meta.aboutHeading}
        </h2>
        <p>{meta.aboutBio}</p>
        <ul className={styles.chipList} aria-label={meta.aboutChipsLabel}>
          {meta.aboutChips.map((chip, i) => (
            <Reveal
              as="li"
              key={chip}
              className={styles.chip}
              index={i}
              stagger={0.04}
              duration={0.4}
              y={10}
            >
              {chip}
            </Reveal>
          ))}
        </ul>
      </SectionReveal>
    </section>
  );
}
