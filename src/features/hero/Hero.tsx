import { m, useReducedMotion, type Variants } from 'framer-motion';
import { useMode } from '../../app/ModeContext';
import { EASE_OUT } from '../../app/motion';
import styles from './Hero.module.css';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export default function Hero() {
  const { meta } = useMode();
  const reduceMotion = useReducedMotion();
  // One place to branch on reduced motion instead of a ternary per element.
  const item = reduceMotion ? undefined : itemVariants;

  return (
    <section className={styles.hero} id="hero" aria-label="Hero section">
      <m.div
        className={styles.content}
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? false : 'visible'}
        variants={reduceMotion ? undefined : containerVariants}
      >
        <m.img
          variants={item}
          src="/avatar.jpg"
          alt="Portrait of Roope Myller"
          className={styles.avatar}
          width={160}
          height={160}
          fetchPriority="high"
        />
        <m.p variants={item} className={styles.eyebrow}>
          {meta.heroEyebrow}
        </m.p>
        <m.h1 variants={item} tabIndex={0}>
          {meta.heroTitle}
        </m.h1>
        <m.h2 variants={item}>{meta.heroSubtitle}</m.h2>
        <m.p variants={item} className={styles.tagline}>
          {meta.heroTagline}
        </m.p>
      </m.div>
    </section>
  );
}
