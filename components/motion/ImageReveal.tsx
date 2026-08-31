'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type ImageRevealProps = {
  className?: string;
  delay?: number;
  children: ReactNode;
};

export function ImageReveal({ className = '', delay = 0, children }: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-5% 0px -5% 0px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
