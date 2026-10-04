'use client';

import { useState } from 'react';
import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { User } from 'lucide-react';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
}

const sizeDimensions = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
} as const;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', shape = 'circle', ...props }, ref) => {
    const sizeClasses = {
      xs: 'h-6 w-6 text-caption',
      sm: 'h-8 w-8 text-body-xs',
      md: 'h-10 w-10 text-body-sm',
      lg: 'h-12 w-12 text-body',
      xl: 'h-16 w-16 text-body-lg',
    };

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-md',
    };

    const [imageError, setImageError] = useState(false);
    const dimension = sizeDimensions[size];

    if (src && !imageError) {
      return (
        <div
          ref={ref}
          className={cn('relative inline-flex shrink-0 overflow-hidden bg-surface-elevated', sizeClasses[size], shapeClasses[shape], className)}
          {...props}
        >
          <Image
            src={src}
            alt={alt || ''}
            onError={() => setImageError(true)}
            fill
            className="object-cover"
            sizes={`${dimension}px`}
            aria-hidden={true}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex shrink-0 items-center justify-center bg-surface-elevated border border-border', sizeClasses[size], shapeClasses[shape], className)}
        {...props}
      >
        {fallback || (
          <User className="h-1/2 w-1/2 text-text-subtle" aria-hidden="true" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';