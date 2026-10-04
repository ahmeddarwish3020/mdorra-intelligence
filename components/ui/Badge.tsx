'use client';

import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'healthy' | 'warning' | 'error' | 'disabled';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variantClasses = {
    default: 'badge',
    gold: 'badge-gold',
    healthy: 'badge-status-healthy',
    warning: 'badge-status-warning',
    error: 'badge-status-error',
    disabled: 'badge-status-disabled',
  };

  return (
    <span className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </span>
  );
}