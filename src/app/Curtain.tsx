import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMode } from './ModeContext';
import styles from './Curtain.module.css';

export default function Curtain() {
  const { isTransitioning } = useMode();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className={styles.curtain}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeInOut' }}
        />
      )}
    </AnimatePresence>
  );
}
