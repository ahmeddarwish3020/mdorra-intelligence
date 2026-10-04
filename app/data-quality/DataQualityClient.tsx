'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatNumber, formatRelativeTime } from '@/lib/utils';
import {
  Database,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  RefreshCw,
  Shield,
  Search,
  Filter,
  ExternalLink,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KpiCard, KpiGrid } from '@/components/ui/KpiCard';
import { Table, Column } from '@/components/ui/Table';
import { SparklineChart } from '@/components/ui/Charts';
import { AppLayout } from '@/components/layout/AppLayout';
import { getDemoDataSources, getDemoHealthOverview } from '@/lib/demo-data';
import type { DataSource, DataSourceStatus, HealthOverview } from '@/types';

const CHECK_TYPES = [
  { key: 'freshness', label: 'Data Freshness', icon: Clock, description: 'How recent is the latest data' },
  { key: 'completeness', label: 'Completeness', icon: Database, description: 'Percentage of expected data received' },
  { key: 'schema', label: 'Schema Validity', icon: Shield, description: 'Data matches expected structure' },
  { key: 'consistency', label: 'Consistency', icon: TrendingUp, description: 'Values are consistent over time' },
  { key: 'accuracy', label: 'Accuracy', icon: CheckCircle, description: 'Data matches source of truth' },
];

const SOURCE_CHECKS = {
  website: [
    { type: 'freshness', status: 'pass', score: 98, details: { lastUpdate: '2 min ago', expected: '< 5 min' } },
    { type: 'completeness', status: 'pass', score: 99, details: { received: '24/24 metrics', expected: '24 metrics' } },
    { type: 'schema', status: 'pass', score: 100, details: { issues: 0 } },
    { type: 'consistency', status: 'warn', score: 87, details: { anomalies: 2, period: '7d' } },
    { type: 'accuracy', status: 'pass', score: 95, details: { validationSample: '100/100' } },
  ],
  google_analytics: [
    { type: 'freshness', status: 'fail', score: 0, details: { lastUpdate: 'Never', expected: '< 1 hour' } },
    { type: 'completeness', status: 'fail', score: 0, details: { received: '0/15 metrics', expected: '15 metrics' } },
    { type: 'schema', status: 'fail', score: 0, details: { issues: 'Not connected' } },
    { type: 'consistency', status: 'fail', score: 0, details: { anomalies: 'N/A' } },
    { type: 'accuracy', status: 'fail', score: 0, details: { validationSample: 'N/A' } },
  ],
};

function DataSourceQualityCard({ source }: { source: DataSource }) {
  const checks = SOURCE_CHECKS[source.type as keyof typeof SOURCE_CHECKS] || [];
  const passedChecks = checks.filter(c => c.status === 'pass').length;
  const totalChecks = checks.length;
  const overallScore = totalChecks > 0 ? Math.round(checks.reduce((sum, c) => sum + c.score, 0) / totalChecks) : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-status-healthy';
      case 'warn': return 'text-status-warning';
      case 'fail': return 'text-status-error';
      default: return 'text-text-subtle';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-status-healthy" />;
      case 'warn': return <AlertTriangle className="h-4 w-4 text-status-warning" />;
      case 'fail': return <XCircle className="h-4 w-4 text-status-error" />;
      default: return <Clock className="h-4 w-4 text-text-subtle" />;
    }
  };

  return (
    <Card variant="elevated" className="hover:border-gold/30 hover:shadow-elevated transition-all duration-normal">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-surface-elevated border border-border flex items-center justify-center">
              <Database className="h-6 w-6 text-gold" />
            </div>
            <div>
              <CardTitle className="text-heading-sm">{source.name}</CardTitle>
              <p className="text-body-xs text-text-muted capitalize">{source.type.replace('_', ' ')}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-metric font-mono text-text">{overallScore}%</p>
            <p className="text-body-xs text-text-muted">Quality Score</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {CHECK_TYPES.map((check) => {
            const sourceCheck = checks.find(c => c.type === check.key);
            const status = sourceCheck?.status || 'fail';
            return (
              <div key={check.key} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <check.icon className={cn('h-3.5 w-3.5', getStatusColor(status))} />
                  <span className="text-body-xs font-medium text-text">{check.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn('text-metric-sm font-mono', getStatusColor(status))}>
                    {sourceCheck ? `${sourceCheck.score}%` : 'N/A'}
                  </span>
                  {getStatusIcon(status)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-body-xs text-text-muted">{passedChecks}/{totalChecks} checks passing</span>
            </div>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Re-run Checks
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 text-body-xs text-text-subtle">
            {source.last_sync ? (
              <>
                <Clock className="h-3.5 w-3.5" />
                <span>Last checked {formatRelativeTime(source.last_sync)}</span>
              </>
            ) : (
              <>
                <XCircle className="h-3.5 w-3.5 text-status-error" />
                <span>Never checked</span>
              </>
            )}
          </div>
          <Link href={`/data-quality/${source.id}`} className="btn btn-ghost btn-sm gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" />
            Details
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export function DataQualityClient() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [healthOverview, setHealthOverview] = useState<HealthOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      setDataSources(getDemoDataSources());
      setHealthOverview(getDemoHealthOverview());
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6 animate-pulse">
          <div className="section-header">
            <div className="h-8 w-48 bg-surface-elevated rounded" />
          </div>
          <KpiGrid metrics={Array(4).fill({})} />
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <Card variant="elevated" key={i} className="h-96" />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="section-header">
          <div>
            <h1 className="section-title">Data Quality Center</h1>
            <p className="section-subtitle">Monitor data health, freshness, completeness, and schema validity across all sources</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">DEMO DATA</Badge>
          </div>
        </div>

        <KpiGrid
          metrics={[
            { id: 'dq-score', label: 'Overall Quality', value: healthOverview?.dataQualityScore || 85, change: 2.3, changeLabel: 'vs prev week', trend: 'up', format: 'percentage', precision: 0, status: 'healthy', isDemo: true },
            { id: 'dq-sources', label: 'Healthy Sources', value: healthOverview?.healthySources || 1, change: null, changeLabel: `of ${healthOverview?.totalSources || 7}`, trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'dq-freshness', label: 'Avg Freshness', value: 2.1, change: -0.5, changeLabel: 'minutes vs target', trend: 'down', format: 'duration', precision: 1, status: 'healthy', isDemo: true },
            { id: 'dq-completeness', label: 'Completeness', value: 98.5, change: 1.2, changeLabel: '% vs prev week', trend: 'up', format: 'percentage', precision: 1, status: 'healthy', isDemo: true },
          ]}
          columns={4}
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {dataSources.map((source) => (
            <DataSourceQualityCard key={source.id} source={source} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Quality Trends (7 Days)</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {CHECK_TYPES.map((check) => (
                <div key={check.key} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <check.icon className="h-4 w-4 text-gold" />
                      <span className="text-body-sm font-medium text-text">{check.label}</span>
                    </div>
                    <Badge variant="healthy" className="text-caption">Trending Up</Badge>
                  </div>
                  <SparklineChart
                    data={[85, 87, 86, 88, 89, 90, 91, 92, 91, 93, 92, 94, 95, 96]}
                    color="var(--gold)"
                    height={40}
                  />
                  <p className="text-body-xs text-text-muted mt-1">{check.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Recent Quality Issues</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-status-warning/10 border border-status-warning/20 rounded-md">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-status-warning flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="warning" className="text-caption">CONSISTENCY</Badge>
                      <span className="text-body-xs text-text-muted">2 hours ago</span>
                    </div>
                    <p className="text-body-sm font-medium text-text mb-1">Engagement metric anomaly detected</p>
                    <p className="text-body-xs text-text-muted">Website engagement dropped 56% on 2026-09-20. Tracking script error on new blog post for 4 hours.</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-status-error/10 border border-status-error/20 rounded-md">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-status-error flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="error" className="text-capton">FRESHNESS</Badge>
                      <span className="text-body-xs text-text-muted">1 day ago</span>
                    </div>
                    <p className="text-body-sm font-medium text-text mb-1">Form validation error caused data loss</p>
                    <p className="text-body-xs text-text-muted">Mobile Safari form validation error on 2026-09-18 caused 62% drop in qualified leads. Issue resolved.</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-status-healthy flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="healthy" className="text-caption">SCHEMA</Badge>
                      <span className="text-body-xs text-text-muted">3 days ago</span>
                    </div>
                    <p className="text-body-sm font-medium text-text mb-1">Schema validation passed</p>
                    <p className="text-body-xs text-text-muted">All 24 website metrics match expected schema. No structural issues detected.</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-status-healthy flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="healthy" className="text-capton">COMPLETENESS</Badge>
                      <span className="text-body-xs text-text-muted">5 days ago</span>
                    </div>
                    <p className="text-body-sm font-medium text-text mb-1">Data completeness at 99%</p>
                    <p className="text-body-xs text-text-muted">All expected data points received for website source. 1 minor gap in scroll depth metric.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-gold" />
                <CardTitle className="text-heading-md">Sync History</CardTitle>
              </div>
              <Link href="/sync-history" className="btn btn-ghost btn-sm gap-1.5">
                View All <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Table
              columns={[
                { key: 'source', header: 'Source', accessor: (row) => row.source },
                { key: 'status', header: 'Status', accessor: (row) => (
                  <Badge variant={row.status === 'success' ? 'healthy' : row.status === 'failed' ? 'error' : row.status === 'running' ? 'warning' : 'disabled'}>
                    {row.status.toUpperCase()}
                  </Badge>
                )},
                { key: 'records', header: 'Records', accessor: (row) => formatNumber(row.records), align: 'right' },
                { key: 'failed', header: 'Failed', accessor: (row) => formatNumber(row.failed), align: 'right' },
                { key: 'started', header: 'Started', accessor: (row) => formatRelativeTime(row.started) },
                { key: 'completed', header: 'Completed', accessor: (row) => row.completed ? formatRelativeTime(row.completed) : '—' },
                { key: 'error', header: 'Error', accessor: (row) => row.error || '—' },
              ]}
              data={[
                { source: 'MDORRA Website', status: 'success', records: 1247, failed: 0, started: '2026-09-22T06:00:00Z', completed: '2026-09-22T06:02:15Z', error: null },
                { source: 'MDORRA Website', status: 'success', records: 1198, failed: 0, started: '2026-09-21T06:00:00Z', completed: '2026-09-21T06:01:58Z', error: null },
                { source: 'MDORRA Website', status: 'success', records: 1234, failed: 0, started: '2026-09-20T06:00:00Z', completed: '2026-09-20T06:02:03Z', error: null },
                { source: 'MDORRA Website', status: 'failed', records: 0, failed: 1, started: '2026-09-19T06:00:00Z', completed: '2026-09-19T06:00:45Z', error: 'Connection timeout' },
                { source: 'MDORRA Website', status: 'success', records: 1189, failed: 0, started: '2026-09-18T06:00:00Z', completed: '2026-09-18T06:01:52Z', error: null },
              ]}
              keyAccessor={(row) => `${row.source}-${row.started}`}
              caption="Recent sync runs"
              emptyMessage="No sync history available"
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
