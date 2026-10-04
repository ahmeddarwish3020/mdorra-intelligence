'use client';

import { type FC } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface ChartDataPoint {
  date: string;
  value?: number;
  [key: string]: string | number | undefined;
}

interface BaseChartProps {
  data: ChartDataPoint[];
  xKey: string;
  yKeys: string[];
  colors?: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  tooltipFormatter?: (value: number, name: string) => [string, string];
  className?: string;
  'aria-label'?: string;
}

function CustomTooltipContent({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="panel-elevated p-3 rounded-md shadow-modal border border-border min-w-[160px]">
      <p className="text-caption text-text-muted mb-2">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="flex items-center gap-2 text-body-sm" style={{ color: entry.color }}>
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span>{entry.name}: {entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

export const LineChartComponent: FC<BaseChartProps> = ({
  data,
  xKey,
  yKeys,
  colors = ['var(--gold)', 'var(--gold-deep)', 'var(--text-muted)', 'var(--text-subtle)'],
  height = 280,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  tooltipFormatter,
  className,
  'aria-label': ariaLabel,
}) => {
  return (
    <div className={cn('w-full', className)} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />}
          <XAxis
            dataKey={xKey}
            tick={{ fill: 'var(--text-subtle)', fontSize: 11, fontFamily: 'var(--font-inter)' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: 'var(--text-subtle)', fontSize: 11, fontFamily: 'var(--font-inter)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
          />
          {showTooltip && <Tooltip content={<CustomTooltipContent />} wrapperStyle={{ outline: 'none' }} />}
          {showLegend && <Legend wrapperStyle={{ paddingTop: 20 }} />}
          {yKeys.map((yKey, index) => (
            <Line
              key={yKey}
              type="monotone"
              dataKey={yKey}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2 }}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AreaChartComponent: FC<BaseChartProps & { gradient?: boolean }> = ({
  data,
  xKey,
  yKeys,
  colors = ['var(--gold)', 'var(--gold-deep)'],
  height = 280,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  tooltipFormatter,
  gradient = true,
  className,
  'aria-label': ariaLabel,
}) => {
  const gradientDefs = gradient ? (
    <defs>
      {yKeys.map((yKey, index) => (
        <linearGradient key={yKey} id={`gradient-${yKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.3} />
          <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0} />
        </linearGradient>
      ))}
    </defs>
  ) : null;

  return (
    <div className={cn('w-full', className)} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />}
          <XAxis
            dataKey={xKey}
            tick={{ fill: 'var(--text-subtle)', fontSize: 11, fontFamily: 'var(--font-inter)' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: 'var(--text-subtle)', fontSize: 11, fontFamily: 'var(--font-inter)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
          />
          {showTooltip && <Tooltip content={<CustomTooltipContent />} wrapperStyle={{ outline: 'none' }} />}
          {showLegend && <Legend wrapperStyle={{ paddingTop: 20 }} />}
          {yKeys.map((yKey, index) => (
            <Area
              key={yKey}
              type="monotone"
              dataKey={yKey}
              stroke={colors[index % colors.length]}
              fill={gradient ? `url(#gradient-${yKey})` : colors[index % colors.length]}
              fillOpacity={gradient ? 0.15 : 0.1}
              strokeWidth={2}
              isAnimationActive={false}
            />
          ))}
          {gradientDefs}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BarChartComponent: FC<BaseChartProps & { horizontal?: boolean }> = ({
  data,
  xKey,
  yKeys,
  colors = ['var(--gold)', 'var(--gold-deep)', 'var(--text-muted)'],
  height = 280,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  tooltipFormatter,
  horizontal = false,
  className,
  'aria-label': ariaLabel,
}) => {
  if (horizontal) {
    return (
      <div className={cn('w-full', className)} role="img" aria-label={ariaLabel}>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />}
            <YAxis
              type="category"
              dataKey={xKey}
              tick={{ fill: 'var(--text-subtle)', fontSize: 11, fontFamily: 'var(--font-inter)' }}
              axisLine={false}
              tickLine={false}
              width={120}
            />
            <XAxis
              tick={{ fill: 'var(--text-subtle)', fontSize: 11, fontFamily: 'var(--font-inter)' }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
            />
            {showTooltip && <Tooltip content={<CustomTooltipContent />} wrapperStyle={{ outline: 'none' }} />}
            {showLegend && <Legend wrapperStyle={{ paddingTop: 20 }} />}
            {yKeys.map((yKey, index) => (
              <Bar
                key={yKey}
                dataKey={yKey}
                fill={colors[index % colors.length]}
                radius={[0, 4, 4, 0]}
                maxBarSize={32}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />}
          <XAxis
            dataKey={xKey}
            tick={{ fill: 'var(--text-subtle)', fontSize: 11, fontFamily: 'var(--font-inter)' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: 'var(--text-subtle)', fontSize: 11, fontFamily: 'var(--font-inter)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
          />
          {showTooltip && <Tooltip content={<CustomTooltipContent />} wrapperStyle={{ outline: 'none' }} />}
          {showLegend && <Legend wrapperStyle={{ paddingTop: 20 }} />}
          {yKeys.map((yKey, index) => (
            <Bar
              key={yKey}
              dataKey={yKey}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SparklineChart: FC<{
  data: number[];
  color?: string;
  height?: number;
  showArea?: boolean;
  className?: string;
}> = ({ data, color = 'var(--gold)', height = 40, showArea = true, className }) => {
  const points = data.map((value, index) => ({ index, value }));
  const maxValue = Math.max(...data) || 1;

  return (
    <div className={cn('w-full', className)} aria-hidden="true">
      <svg viewBox={`0 0 ${points.length} ${height}`} className="w-full h-full" preserveAspectRatio="none">
        {showArea && (
          <path
            d={[
              `M0,${height}`,
              ...points.map((p, i) => `${i},${height - (p.value / maxValue) * height * 0.9}`),
              `${points.length - 1},${height}`,
              'Z',
            ].join(' ')}
            fill={color}
            fillOpacity="0.15"
          />
        )}
        <path
          d={points.map((p, i) => `${i},${height - (p.value / maxValue) * height * 0.9}`).join(' ')}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};