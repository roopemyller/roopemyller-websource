import { m, useReducedMotion, type MotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE_OUT } from '../../app/motion';

type RevealTag = 'div' | 'article' | 'a' | 'li' | 'button';

const TAGS = {
  div: m.div,
  article: m.article,
  a: m.a,
  li: m.li,
  button: m.button,
} as const;

interface RevealProps {
  /** Element to render. Defaults to `div`. */
  as?: RevealTag;
  /** Stagger index — delay becomes `index * stagger`. Ignored if `delay` is set. */
  index?: number;
  stagger?: number;
  delay?: number;
  duration?: number;
  /** Travel distance of the fade-up, in px. */
  y?: number;
  /** IntersectionObserver visibility ratio that triggers the reveal. */
  amount?: number;
  className?: string;
  children?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  whileHover?: MotionProps['whileHover'];
  whileTap?: MotionProps['whileTap'];
}

/**
 * Scroll-triggered fade-up for list items / cards. Respects
 * `prefers-reduced-motion` (renders the element with no animation).
 */
export default function Reveal({
  as = 'div',
  index = 0,
  stagger = 0.06,
  delay,
  duration = 0.5,
  y = 24,
  amount = 0.2,
  whileHover,
  whileTap,
  children,
  ...domProps
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = TAGS[as];

  if (reduceMotion) {
    return <Tag {...domProps}>{children}</Tag>;
  }

  return (
    <Tag
      {...domProps}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay: delay ?? index * stagger, ease: EASE_OUT }}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </Tag>
  );
}
