'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatNumber, formatRelativeTime } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Eye,
  Target,
  Zap,
  BarChart2,
  FileText,
  Globe,
  FlaskConical,
  Database,
  Plug2,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';
import { KpiCard, KpiGrid } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AreaChartComponent, SparklineChart } from '@/components/ui/Charts';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { AppLayout } from '@/components/layout/AppLayout';
import type { HealthOverview, KpiMetric, Insight, Recommendation, Experiment, Forecast, ChannelPerformance } from '@/types';

interface OverviewData {
  healthOverview: HealthOverview | null;
  healthOverviewIsDemo: boolean;
  healthOverviewError: string | null;
  kpiMetrics: KpiMetric[];
  kpiMetricsIsDemo: boolean;
  kpiMetricsError: string | null;
  insights: Insight[];
  insightsIsDemo: boolean;
  insightsError: string | null;
  recommendations: Recommendation[];
  recommendationsIsDemo: boolean;
  recommendationsError: string | null;
  experiments: Experiment[];
  experimentsIsDemo: boolean;
  experimentsError: string | null;
  forecasts: Forecast[];
  forecastsIsDemo: boolean;
  forecastsError: string | null;
  channels: ChannelPerformance[];
  channelsIsDemo: boolean;
  channelsError: string | null;
  intelligence: {
    whatChanged: Array<{ id: string; type: string; title: string; description: string; evidence: string; confidence: string; metricId: string | null; relatedInsightId: string | null }>;
    whyItMatters: Array<{ id: string; type: string; title: string; description: string; evidence: string; confidence: string; metricId: string | null; relatedInsightId: string | null }>;
    whatToWatch: Array<{ id: string; type: string; title: string; description: string; evidence: string; confidence: string; metricId: string | null; relatedInsightId: string | null }>;
    opportunities: Array<{ id: string; type: string; title: string; description: string; evidence: string; confidence: string; metricId: string | null; relatedInsightId: string | null }>;
    recommendedActions: Array<{ id: string; type: string; title: string; description: string; evidence: string; confidence: string; metricId: string | null; relatedInsightId: string | null }>;
  };
  intelligenceIsDemo: boolean;
  intelligenceError: string | null;
}

const trafficData = [
  { date: 'Sep 1', sessions: 380, users: 260 },
  { date: 'Sep 2', sessions: 420, users: 290 },
  { date: 'Sep 3', sessions: 687, users: 480 },
  { date: 'Sep 4', sessions: 520, users: 360 },
  { date: 'Sep 5', sessions: 450, users: 310 },
  { date: 'Sep 6', sessions: 390, users: 270 },
  { date: 'Sep 7', sessions: 360, users: 250 },
  { date: 'Sep 8', sessions: 410, users: 280 },
  { date: 'Sep 9', sessions: 440, users: 300 },
  { date: 'Sep 10', sessions: 480, users: 330 },
  { date: 'Sep 11', sessions: 420, users: 290 },
  { date: 'Sep 12', sessions: 390, users: 270 },
  { date: 'Sep 13', sessions: 370, users: 260 },
  { date: 'Sep 14', sessions: 430, users: 290 },
  { date: 'Sep 15', sessions: 470, users: 320 },
];

const conversionData = [
  { date: 'Sep 1', leads: 2, qualified: 1 },
  { date: 'Sep 2', leads: 3, qualified: 1 },
  { date: 'Sep 3', leads: 1, qualified: 0 },
  { date: 'Sep 4', leads: 2, qualified: 1 },
  { date: 'Sep 5', leads: 2, qualified: 1 },
  { date: 'Sep 6', leads: 1, qualified: 0 },
  { date: 'Sep 7', leads: 2, qualified: 1 },
  { date: 'Sep 8', leads: 3, qualified: 2 },
  { date: 'Sep 9', leads: 2, qualified: 1 },
  { date: 'Sep 10', leads: 2, qualified: 1 },
  { date: 'Sep 11', leads: 1, qualified: 0 },
  { date: 'Sep 12', leads: 2, qualified: 1 },
  { date: 'Sep 13', leads: 2, qualified: 1 },
  { date: 'Sep 14', leads: 3, qualified: 1 },
  { date: 'Sep 15', leads: 2, qualified: 1 },
];

function IntelligenceSection({ title, icon: Icon, items, accentColor }: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: Array<{ id: string; type: string; title: string; description: string; evidence: string; confidence: string }>;
  accentColor: string;
}) {
  const typeIcons = {
    fact: <TrendingUp className="h-3.5 w-3.5 text-status-healthy" />,
    correlation: <BarChart2 className="h-3.5 w-3.5 text-gold" />,
    hypothesis: <Lightbulb className="h-3.5 w-3.5 text-status-warning" />,
    recommendation: <Target className="h-3.5 w-3.5 text-gold" />,
    watch: <Eye className="h-3.5 w-3.5 text-status-warning" />,
    opportunity: <Zap className="h-3.5 w-3.5 text-gold" />,
    positive: <TrendingUp className="h-3.5 w-3.5 text-status-healthy" />,
    attention: <AlertTriangle className="h-3.5 w-3.5 text-status-error" />,
  };

  const typeLabels = {
    fact: 'FACT',
    correlation: 'CORRELATION',
    hypothesis: 'HYPOTHESIS',
    recommendation: 'RECOMMENDATION',
    watch: 'WATCH',
    opportunity: 'OPPORTUNITY',
    positive: 'POSITIVE',
    attention: 'ATTENTION',
  };

  return (
    <Card variant="elevated" className="animate-in">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-gold" />
          <CardTitle className="text-heading-md">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">{typeIcons[item.type as keyof typeof typeIcons] || null}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-caption font-medium uppercase tracking-wider text-gold">
                    {typeLabels[item.type as keyof typeof typeLabels] || item.type.toUpperCase()}
                  </span>
                  <Badge variant="gold" className="text-caption">{item.confidence.toUpperCase()}</Badge>
                </div>
                <p className="text-body font-medium text-text mb-1">{item.title}</p>
                <p className="text-body-sm text-text-muted mb-2">{item.description}</p>
                <p className="text-body-xs text-text-subtle font-mono">Evidence: {item.evidence}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const typeIcons = {
  fact: <TrendingUp className="h-3.5 w-3.5 text-status-healthy" />,
  correlation: <BarChart2 className="h-3.5 w-3.5 text-gold" />,
  hypothesis: <Lightbulb className="h-3.5 w-3.5 text-status-warning" />,
  recommendation: <Target className="h-3.5 w-3.5 text-gold" />,
  watch: <Eye className="h-3.5 w-3.5 text-status-warning" />,
  opportunity: <Zap className="h-3.5 w-3.5 text-gold" />,
  positive: <TrendingUp className="h-3.5 w-3.5 text-status-healthy" />,
  attention: <AlertTriangle className="h-3.5 w-3.5 text-status-error" />,
};

const typeLabels = {
  fact: 'FACT',
  correlation: 'CORRELATION',
  hypothesis: 'HYPOTHESIS',
  recommendation: 'RECOMMENDATION',
  watch: 'WATCH',
  opportunity: 'OPPORTUNITY',
  positive: 'POSITIVE',
  attention: 'ATTENTION',
};

function KpiSkeleton() {
  return (
    <div className="kpi-card animate-pulse">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Skeleton variant="text" className="w-1/3 h-3 mb-1.5" />
            <Skeleton variant="metric" />
            <Skeleton variant="text" className="w-1/2 h-3 mt-2" />
          </div>
          <div className="flex items-baseline gap-1.5 shrink-0 text-text-subtle">
            <span className="text-body-sm font-medium">+0.0%</span>
            <span className="text-body-xs">vs prev</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardSkeleton({ className }: { className?: string }) {
  return (
    <Card variant="elevated" className={cn('animate-pulse', className)}>
      <CardContent className="p-6 space-y-4">
        <Skeleton variant="rectangular" className="h-8 w-48" />
        <Skeleton variant="rectangular" className="h-64" />
      </CardContent>
    </Card>
  );
}

export function OverviewClient() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/overview');
        if (!response.ok) {
          throw new Error('Failed to fetch overview data');
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const isDemo = data?.healthOverviewIsDemo || data?.kpiMetricsIsDemo || data?.intelligenceIsDemo;

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6 animate-pulse">
          <KpiGrid metrics={Array(6).fill({})} columns={6} />
          <div className="grid gap-6 lg:grid-cols-2">
            <CardSkeleton className="lg:col-span-2 h-96" />
            <CardSkeleton className="h-96" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <CardSkeleton className="h-80" />
            <CardSkeleton className="h-80" />
            <CardSkeleton className="h-80" />
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="section-header">
            <div>
              <h1 className="section-title">Overview</h1>
              <p className="section-subtitle">Executive command center — Marketing health, intelligence, and active signals</p>
            </div>
          </div>
          <Card variant="elevated" className="p-6 text-center">
            <p className="text-status-error mb-4">Failed to load overview data</p>
            <p className="text-body-sm text-text-muted mb-4">{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()}>Retry</Button>
          </Card>
        </div>
      </AppLayout>
    );
  }

  if (!data) {
    return <AppLayout><div>Loading...</div></AppLayout>;
  }

  const { healthOverview, kpiMetrics, insights, recommendations, experiments, forecasts, channels, intelligence } = data;

  const runningExperiments = experiments?.filter(e => e.status === 'running') || [];
  const openRecommendations = recommendations?.filter(r => r.status === 'pending' || r.status === 'in_progress') || [];
  const recentInsights = insights?.slice(0, 5) || [];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="section-header">
          <div>
            <h1 className="section-title">Overview</h1>
            <p className="section-subtitle">Executive command center — Marketing health, intelligence, and active signals</p>
          </div>
          <div className="flex items-center gap-2">
            {isDemo && <Badge variant="gold">DEMO DATA</Badge>}
            {data.healthOverviewError && <Badge variant="warning">DATA ERROR</Badge>}
          </div>
        </div>

        <KpiGrid metrics={kpiMetrics || []} columns={6} />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="elevated" className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Traffic & Conversions Trend</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AreaChartComponent
                data={trafficData}
                xKey="date"
                yKeys={['sessions', 'users']}
                colors={['var(--gold)', 'var(--text-muted)']}
                height={300}
                showTooltip
                tooltipFormatter={(value) => [formatNumber(value), '']}
                aria-label="Sessions and users over the last 15 days"
              />
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Conversion Funnel</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AreaChartComponent
                data={conversionData}
                xKey="date"
                yKeys={['leads', 'qualified']}
                colors={['var(--gold)', 'var(--gold-deep)']}
                height={300}
                showTooltip
                tooltipFormatter={(value) => [formatNumber(value), '']}
                aria-label="Leads and qualified leads over the last 15 days"
              />
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Marketing Health</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-surface-elevated rounded-md">
                  <p className="text-metric font-mono text-text">{data.healthOverview?.marketingHealthScore || 72}</p>
                  <p className="text-body-sm text-text-muted">Health Score</p>
                </div>
                <div className="text-center p-4 bg-surface-elevated rounded-md">
                  <p className="text-metric font-mono text-text">{data.healthOverview?.dataQualityScore || 85}</p>
                  <p className="text-body-sm text-text-muted">Data Quality</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-text-muted">Healthy Sources</span>
                  <span className="text-body font-mono text-text">{data.healthOverview?.healthySources || 1} / {data.healthOverview?.totalSources || 7}</span>
                </div>
                <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: `${((data.healthOverview?.healthySources || 1) / (data.healthOverview?.totalSources || 7)) * 100}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-text-muted">Tracked Metrics</span>
                  <span className="text-body font-mono text-text">{data.healthOverview?.trackedMetrics || 24}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-text-muted">Open Anomalies</span>
                  <span className="text-body font-mono text-status-warning">{data.healthOverview?.openAnomalies || 3}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-text-muted">Open Alerts</span>
                  <span className="text-body font-mono text-status-error">{data.healthOverview?.openAlerts || 2}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <IntelligenceSection
            title="What Changed"
            icon={BarChart2}
            items={intelligence?.whatChanged || []}
            accentColor="gold"
          />

          <IntelligenceSection
            title="Why It Matters"
            icon={Lightbulb}
            items={intelligence?.whyItMatters || []}
            accentColor="gold"
          />

          <IntelligenceSection
            title="What to Watch"
            icon={Eye}
            items={intelligence?.whatToWatch || []}
            accentColor="gold"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Opportunities</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {(intelligence?.opportunities || []).map((opp) => (
                <div key={opp.id} className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="gold" className="text-caption">OPPORTUNITY</Badge>
                        <Badge variant="gold" className="text-caption">{opp.confidence.toUpperCase()}</Badge>
                      </div>
                      <p className="text-body font-medium text-text mb-1">{opp.title}</p>
                      <p className="text-body-sm text-text-muted mb-2">{opp.description}</p>
                      <p className="text-body-xs text-text-subtle font-mono">Evidence: {opp.evidence}</p>
                    </div>
                    <Button variant="ghost" size="sm">Explore</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Recommended Actions</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {(intelligence?.recommendedActions || []).map((action) => (
                <div key={action.id} className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="gold" className="text-caption">RECOMMENDATION</Badge>
                        <Badge variant="gold" className="text-caption">{action.confidence.toUpperCase()}</Badge>
                      </div>
                      <p className="text-body font-medium text-text mb-1">{action.title}</p>
                      <p className="text-body-sm text-text-muted mb-2">{action.description}</p>
                      <p className="text-body-xs text-text-subtle font-mono">Evidence: {action.evidence}</p>
                    </div>
                    <Button variant="primary" size="sm">Act</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Recent Insights</CardTitle>
                </div>
                <Link href="/insights" className="btn btn-ghost btn-sm gap-1.5">
                  View all <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {(insights || []).slice(0, 5).map((insight) => (
                <div key={insight.id} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-start gap-2 mb-1">
                    <Badge variant={insight.type === 'attention' ? 'error' : insight.type === 'opportunity' ? 'gold' : insight.type === 'watch' ? 'warning' : 'healthy'}>
                      {insight.type.toUpperCase()}
                    </Badge>
                    <Badge variant="gold" className="text-caption">{insight.confidence.toUpperCase()}</Badge>
                    <span className="ml-auto text-caption text-text-subtle">{formatRelativeTime(insight.created_at)}</span>
                  </div>
                  <p className="text-body-sm font-medium text-text mb-1">{insight.title}</p>
                  <p className="text-body-xs text-text-muted">{insight.description.substring(0, 100)}...</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Active Recommendations</CardTitle>
                </div>
                <Link href="/recommendations" className="btn btn-ghost btn-sm gap-1.5">
                  View all <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {(recommendations || []).filter(r => r.status === 'pending' || r.status === 'in_progress').slice(0, 5).map((rec) => (
                <div key={rec.id} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="gold" className="text-capton">{rec.priority.toUpperCase()}</Badge>
                    <span className="ml-auto text-caption text-text-subtle">{rec.status}</span>
                  </div>
                  <p className="text-body-sm font-medium text-text mb-1">{rec.title}</p>
                  <p className="text-body-xs text-text-muted">{rec.description.substring(0, 80)}...</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Running Experiments</CardTitle>
                </div>
                <Link href="/experiments" className="btn btn-ghost btn-sm gap-1.5">
                  View all <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {(experiments || []).filter(e => e.status === 'running').map((exp) => (
                <div key={exp.id} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="healthy" className="text-capton">RUNNING</Badge>
                    <span className="text-caption text-text-subtle">{exp.start_date ? formatRelativeTime(exp.start_date) : 'Not started'}</span>
                  </div>
                  <p className="text-body-sm font-medium text-text mb-1">{exp.name}</p>
                  <p className="text-body-xs text-text-muted">{exp.hypothesis.substring(0, 80)}...</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="text-body-xs text-text-subtle">Baseline: <span className="text-text font-mono">{exp.baseline_value}</span></div>
                    <div className="text-body-xs text-text-subtle">Target: <span className="text-text font-mono">{exp.target_value}</span></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Channel Performance</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(channels || []).map((channel) => (
                  <div key={channel.sourceId} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={channel.status === 'healthy' ? 'healthy' : channel.status === 'warning' ? 'warning' : channel.status === 'error' ? 'error' : 'disabled'}>
                          {channel.status.toUpperCase()}
                        </Badge>
                        <div>
                          <p className="text-body-sm font-medium text-text">{channel.sourceName}</p>
                          <p className="text-body-xs text-text-muted">{channel.metrics.length} metrics • {channel.coverage}% coverage</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-body-sm">
                        <span className={cn('font-mono', channel.trend === 'up' ? 'text-status-healthy' : channel.trend === 'down' ? 'text-status-error' : 'text-text-subtle')}>
                          {channel.trend === 'up' ? '▲' : channel.trend === 'down' ? '▼' : '●'}
                        </span>
                        {channel.lastSync && (
                          <span className="text-text-subtle">Synced {formatRelativeTime(channel.lastSync)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Forecast Snapshot</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(forecasts || []).map((forecast) => (
                <div key={forecast.id} className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-body-sm font-medium text-text">Projected Metric</p>
                      <p className="text-body-xs text-text-muted">Next {forecast.horizon_days} days</p>
                    </div>
                    <Badge variant={forecast.confidence === 'high' ? 'healthy' : forecast.confidence === 'moderate' ? 'warning' : 'disabled'} className="text-capton">
                      {forecast.confidence.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <span className="text-metric font-mono text-text">{formatNumber(forecast.forecast_min)}–{formatNumber(forecast.forecast_max)}</span>
                    <span className="text-body-sm text-text-muted">Current: {formatNumber(forecast.current_value)}</span>
                  </div>
                  <p className="text-body-xs text-text-subtle mt-2 font-mono">Assumption: {forecast.assumptions}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}