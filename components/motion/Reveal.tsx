'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type RevealProps = {
  className?: string;
  delay?: number;
  y?: number;
  children: ReactNode;
};

export function Reveal({ className = '', delay = 0, y = 24, children }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
