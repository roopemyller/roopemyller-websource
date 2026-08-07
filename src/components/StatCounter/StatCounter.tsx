import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import styles from './StatCounter.module.css';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
}

export default function StatCounter({ value, label, suffix = '' }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <div className={styles.stat} ref={ref}>
      <span className={styles.value}>
        {display}
        {suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
