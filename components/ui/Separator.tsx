'use client';

import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <hr
      ref={ref}
      className={cn(
        'bg-border',
        orientation === 'horizontal' ? 'w-full h-[1px]' : 'h-full w-[1px]',
        className
      )}
      aria-orientation={orientation}
      role={decorative ? 'none' : 'separator'}
      {...props}
    />
  )
);

Separator.displayName = 'Separator';