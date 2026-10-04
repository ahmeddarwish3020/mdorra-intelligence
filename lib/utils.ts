import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number | null | undefined, options: {
  precision?: number;
  compact?: boolean;
  currency?: boolean;
  percentage?: boolean;
} = {}): string {
  if (value === null || value === undefined) {
    return '—';
  }
  const { precision = 0, compact = false, currency = false, percentage = false } = options;

  if (percentage) {
    return `${value.toFixed(precision)}%`;
  }

  if (currency) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
      notation: compact ? 'compact' : 'standard',
    }).format(value);
  }

  if (compact) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: precision,
    }).format(value);
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
}

export function formatDate(date: string | Date, options: Intl.DateTimeFormatOptions = {}): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(d);
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
}

export function calculateChange(current: number, previous: number): number | null {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function getTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
  const change = calculateChange(current, previous);
  if (change === null) return 'stable';
  if (change > 1) return 'up';
  if (change < -1) return 'down';
  return 'stable';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'healthy':
      return 'badge-status-healthy';
    case 'warning':
      return 'badge-status-warning';
    case 'error':
      return 'badge-status-error';
    case 'disabled':
      return 'badge-status-disabled';
    default:
      return 'badge-status-disabled';
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'badge-status-error';
    case 'high':
      return 'badge-status-error';
    case 'medium':
      return 'badge-status-warning';
    case 'low':
    case 'normal':
      return 'badge-status-healthy';
    default:
      return 'badge-status-disabled';
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function safeDivide(numerator: number, denominator: number, fallback = 0): number {
  if (denominator === 0) return fallback;
  return numerator / denominator;
}

export function percentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function movingAverage(values: number[], window: number): number[] {
  if (values.length < window) return values;
  const result: number[] = [];
  for (let i = 0; i <= values.length - window; i++) {
    const slice = values.slice(i, i + window);
    result.push(slice.reduce((a, b) => a + b, 0) / window);
  }
  return result;
}

export function detectAnomaly(values: number[], threshold = 2): boolean[] {
  if (values.length < 3) return values.map(() => false);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
  return values.map(v => Math.abs(v - mean) > threshold * std);
}

export function linearRegression(x: number[], y: number[]): { slope: number; intercept: number; r2: number } {
  const n = x.length;
  if (n !== y.length || n < 2) return { slope: 0, intercept: 0, r2: 0 };

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);
  const sumY2 = y.reduce((a, b) => a + b * b, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const yMean = sumY / n;
  const ssTotal = y.reduce((a, b) => a + Math.pow(b - yMean, 2), 0);
  const ssResidual = y.reduce((a, b, i) => a + Math.pow(b - (slope * x[i] + intercept), 2), 0);
  const r2 = ssTotal === 0 ? 0 : 1 - ssResidual / ssTotal;

  return { slope, intercept, r2 };
}

export function forecastLinear(values: number[], periods: number): { predictions: number[]; confidence: 'low' | 'moderate' | 'high' } {
  if (values.length < 3) {
    return { predictions: Array(periods).fill(values[values.length - 1] || 0), confidence: 'low' };
  }

  const x = values.map((_, i) => i);
  const { slope, intercept, r2 } = linearRegression(x, values);

  const predictions = Array.from({ length: periods }, (_, i) =>
    slope * (values.length + i) + intercept
  );

  let confidence: 'low' | 'moderate' | 'high' = 'low';
  if (r2 > 0.8) confidence = 'high';
  else if (r2 > 0.5) confidence = 'moderate';

  return { predictions, confidence };
}

export function getDateRange(preset: string, customFrom?: Date, customTo?: Date): { from: Date; to: Date } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let from: Date;
  let to: Date = new Date(today);

  switch (preset) {
    case 'today':
      from = new Date(today);
      break;
    case 'yesterday':
      from = new Date(today);
      from.setDate(from.getDate() - 1);
      to = new Date(from);
      break;
    case 'last_7_days':
      from = new Date(today);
      from.setDate(from.getDate() - 6);
      break;
    case 'last_30_days':
      from = new Date(today);
      from.setDate(from.getDate() - 29);
      break;
    case 'last_90_days':
      from = new Date(today);
      from.setDate(from.getDate() - 89);
      break;
    case 'custom':
      from = customFrom || new Date(today);
      from.setDate(from.getDate() - 29);
      to = customTo || new Date(today);
      break;
    default:
      from = new Date(today);
      from.setDate(from.getDate() - 29);
  }

  return { from, to };
}

export function getPreviousPeriodRange(current: { from: Date; to: Date }): { from: Date; to: Date } {
  const diffDays = Math.ceil((current.to.getTime() - current.from.getTime()) / 86400000);
  const prevTo = new Date(current.from);
  prevTo.setDate(prevTo.getDate() - 1);
  const prevFrom = new Date(prevTo);
  prevFrom.setDate(prevFrom.getDate() - diffDays);
  return { from: prevFrom, to: prevTo };
}