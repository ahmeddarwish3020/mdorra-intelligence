'use client';

import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'metric';
  lines?: number;
}

export function Skeleton({ className, variant = 'text', lines, ...props }: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
    metric: 'rounded-md',
  };

  const widthClasses = {
    text: lines ? 'w-full' : 'w-3/4',
    circular: '',
    rectangular: 'w-full',
    metric: 'w-24',
  };

  const heightClasses = {
    text: '',
    circular: '',
    rectangular: 'h-20',
    metric: 'h-12',
  };

  if (variant === 'text' && lines && lines > 1) {
    return (
      <div className={cn('space-y-2', className)} {...props} aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'skeleton animate-pulse',
              variantClasses[variant],
              i === lines - 1 ? 'w-1/2' : 'w-full'
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn('skeleton animate-pulse', variantClasses[variant], widthClasses[variant], heightClasses[variant], className)}
      {...props}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ variant = 'default' }: { variant?: 'default' | 'kpi' | 'content' | 'campaign' }) {
  if (variant === 'kpi') {
    return (
      <div className="card-elevated relative overflow-hidden animate-in">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="p-5 sm:p-6 space-y-3">
          <Skeleton variant="text" className="w-1/3" />
          <Skeleton variant="metric" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
    );
  }

  if (variant === 'content') {
    return (
      <div className="card-elevated animate-in">
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex gap-4">
            <Skeleton variant="circular" className="h-16 w-16" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-1/2" />
              <div className="flex gap-2">
                <Skeleton variant="circular" className="h-6 w-6" />
                <Skeleton variant="circular" className="h-6 w-6" />
                <Skeleton variant="circular" className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="space-y-1">
              <Skeleton variant="text" className="w-1/2" />
              <Skeleton variant="metric" className="w-20" />
            </div>
            <div className="space-y-1">
              <Skeleton variant="text" className="w-1/2" />
              <Skeleton variant="metric" className="w-20" />
            </div>
            <div className="space-y-1">
              <Skeleton variant="text" className="w-1/2" />
              <Skeleton variant="metric" className="w-20" />
            </div>
            <div className="space-y-1">
              <Skeleton variant="text" className="w-1/2" />
              <Skeleton variant="metric" className="w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'campaign') {
    return (
      <div className="card-elevated animate-in">
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Skeleton variant="text" className="w-1/2" />
              <Skeleton variant="text" className="w-1/3" />
            </div>
            <Skeleton variant="circular" className="h-8 w-8" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton variant="text" className="w-1/2" />
                <Skeleton variant="metric" className="w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated animate-in">
      <div className="p-5 sm:p-6 space-y-4">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="rectangular" />
        <Skeleton variant="text" lines={3} />
      </div>
    </div>
  );
}