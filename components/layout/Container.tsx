import type { ReactNode } from 'react';

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

export function Container({ className = '', children }: ContainerProps) {
  return <div className={`container-page ${className}`}>{children}</div>;
}
