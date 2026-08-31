import type { ReactNode } from 'react';

type EyebrowProps = {
  index?: string;
  className?: string;
  children: ReactNode;
};

export function Eyebrow({ index, className = '', children }: EyebrowProps) {
  return (
    <p className={`eyebrow flex items-baseline gap-3 ${className}`}>
      {index && <span className="eyebrow-index">{index}</span>}
      <span>{children}</span>
    </p>
  );
}
