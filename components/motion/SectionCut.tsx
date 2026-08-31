'use client';

import { useReducedMotion } from 'motion/react';
import { motion } from 'motion/react';

export function SectionCut({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={`border-border border-t ${className}`} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        aria-hidden="true"
        className="bg-border absolute inset-y-0 left-0 w-full origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="bg-accent absolute top-1/2 right-0 h-2 w-px -translate-y-1/2" />
      </motion.div>
    </div>
  );
}
