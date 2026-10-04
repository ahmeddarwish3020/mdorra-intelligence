'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { KpiMetric } from '@/types';

interface KpiCardProps {
  metric: KpiMetric;
  showTrend?: boolean;
  className?: string;
}

export function KpiCard({ metric, showTrend = true, className }: KpiCardProps) {
  const { value, change, changeLabel, trend, format, precision, label, status, isDemo } = metric;

  const trendIcon = trend === 'up' ? <TrendingUp className="h-4 w-4 text-status-healthy" /> : trend === 'down' ? <TrendingDown className="h-4 w-4 text-status-error" /> : <Minus className="h-4 w-4 text-text-subtle" />;
  const trendColor = trend === 'up' ? 'text-status-healthy' : trend === 'down' ? 'text-status-error' : 'text-text-subtle';

  const formattedValue = typeof value === 'number'
    ? format === 'currency'
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: precision, maximumFractionDigits: precision }).format(value)
      : format === 'percentage'
      ? `${(value * 100).toFixed(precision)}%`
      : format === 'ratio'
      ? value.toFixed(precision)
      : new Intl.NumberFormat('en-US', { minimumFractionDigits: precision, maximumFractionDigits: precision }).format(value)
    : value;

  return (
    <div className={cn('kpi-card', className)}>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-body-xs text-text-muted uppercase tracking-wide mb-1.5">{label}</p>
            <p className="text-metric font-mono text-text">{formattedValue}</p>
            {isDemo && (
              <span className="inline-block mt-2 badge-gold text-caption">DEMO DATA</span>
            )}
          </div>
          {showTrend && change !== null && change !== undefined && (
            <div className={cn('flex items-baseline gap-1.5 shrink-0', trendColor)}>
              {trendIcon}
              <span className="text-body-sm font-medium">{change >= 0 ? '+' : ''}{change.toFixed(1)}%</span>
              <span className="text-body-xs text-text-subtle">{changeLabel}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface KpiGridProps {
  metrics: KpiMetric[];
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}

export function KpiGrid({ metrics, columns = 4, className }: KpiGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  return (
    <div className={cn('grid gap-4', columnClasses[columns], className)}>
      {metrics.map((metric) => (
        <KpiCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}