import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useMode } from '../../app/ModeContext';
import styles from './Hero.module.css';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { meta } = useMode();
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} id="hero" aria-label="Hero section">
      <motion.div
        className={styles.content}
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? false : 'visible'}
        variants={reduceMotion ? undefined : containerVariants}
      >
        <motion.img
          variants={reduceMotion ? undefined : itemVariants}
          src="https://avatars.githubusercontent.com/u/22277901?v=4"
          alt="Portrait of Roope Myller"
          className={styles.avatar}
          width={160}
          height={160}
        />
        <motion.p variants={reduceMotion ? undefined : itemVariants} className={styles.eyebrow}>
          {meta.heroEyebrow}
        </motion.p>
        <motion.h1 variants={reduceMotion ? undefined : itemVariants} tabIndex={0}>
          {meta.heroTitle}
        </motion.h1>
        <motion.h2 variants={reduceMotion ? undefined : itemVariants}>{meta.heroSubtitle}</motion.h2>
        <motion.p variants={reduceMotion ? undefined : itemVariants} className={styles.tagline}>
          {meta.heroTagline}
        </motion.p>
      </motion.div>
    </section>
  );
}
