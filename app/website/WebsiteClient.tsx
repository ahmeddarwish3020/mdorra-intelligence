'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatNumber, formatRelativeTime } from '@/lib/utils';
import {
  Globe,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { KpiCard, KpiGrid } from '@/components/ui/KpiCard';
import { AreaChartComponent, SparklineChart } from '@/components/ui/Charts';
import { Table, Column } from '@/components/ui/Table';
import { AppLayout } from '@/components/layout/AppLayout';
import { getDemoWebsiteMetrics } from '@/lib/demo-data';
import type { WebsiteMetrics, TrafficSource, PageMetric } from '@/types';

export function WebsiteClient() {
  const [metrics, setMetrics] = useState<WebsiteMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      setMetrics(getDemoWebsiteMetrics());
      setIsLoading(false);
    };
    loadData();
  }, []);

  const trafficData = [
    { date: 'Sep 1', sessions: 380, users: 260, conversions: 2 },
    { date: 'Sep 2', sessions: 420, users: 290, conversions: 1 },
    { date: 'Sep 3', sessions: 687, users: 480, conversions: 3 },
    { date: 'Sep 4', sessions: 520, users: 360, conversions: 2 },
    { date: 'Sep 5', sessions: 450, users: 310, conversions: 2 },
    { date: 'Sep 6', sessions: 390, users: 270, conversions: 1 },
    { date: 'Sep 7', sessions: 360, users: 250, conversions: 1 },
    { date: 'Sep 8', sessions: 410, users: 280, conversions: 2 },
    { date: 'Sep 9', sessions: 440, users: 300, conversions: 2 },
    { date: 'Sep 10', sessions: 480, users: 330, conversions: 3 },
    { date: 'Sep 11', sessions: 420, users: 290, conversions: 1 },
    { date: 'Sep 12', sessions: 390, users: 270, conversions: 2 },
    { date: 'Sep 13', sessions: 370, users: 260, conversions: 1 },
    { date: 'Sep 14', sessions: 430, users: 290, conversions: 2 },
    { date: 'Sep 15', sessions: 470, users: 320, conversions: 2 },
  ];

  if (isLoading || !metrics) {
    return (
      <AppLayout>
        <div className="space-y-6 animate-pulse">
          <div className="section-header">
            <div className="h-8 w-48 bg-surface-elevated rounded" />
          </div>
          <KpiGrid metrics={Array(6).fill({})} />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card variant="elevated" className="h-96" />
            <Card variant="elevated" className="h-96" />
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
            <h1 className="section-title">Website Intelligence</h1>
            <p className="section-subtitle">Traffic, engagement, and conversion analytics for MDORRA web properties</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">DEMO DATA</Badge>
          </div>
        </div>

        <KpiGrid
          metrics={[
            { id: 'web-sessions', label: 'Sessions', value: metrics.sessions, change: 18.3, changeLabel: 'vs prev period', trend: 'up', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'web-users', label: 'Users', value: metrics.users, change: 14.7, changeLabel: 'vs prev period', trend: 'up', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'web-pageviews', label: 'Page Views', value: metrics.pageViews, change: 22.1, changeLabel: 'vs prev period', trend: 'up', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'web-duration', label: 'Avg Session Duration', value: metrics.avgSessionDuration, change: 5.2, changeLabel: 'vs prev period', trend: 'up', format: 'duration', precision: 0, status: 'healthy', isDemo: true },
            { id: 'web-bounce', label: 'Bounce Rate', value: metrics.bounceRate, change: -3.1, changeLabel: 'vs prev period', trend: 'down', format: 'percentage', precision: 1, status: 'healthy', isDemo: true },
            { id: 'web-conv-rate', label: 'Conversion Rate', value: metrics.conversionRate, change: -12.1, changeLabel: 'vs prev period', trend: 'down', format: 'percentage', precision: 2, status: 'warning', isDemo: true },
          ]}
          columns={6}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="elevated" className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Traffic & Conversions Trend</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AreaChartComponent
                data={trafficData}
                xKey="date"
                yKeys={['sessions', 'users', 'conversions']}
                colors={['var(--gold)', 'var(--text-muted)', 'var(--gold-deep)']}
                height={300}
                showTooltip
                tooltipFormatter={(value) => [formatNumber(value), '']}
                aria-label="Sessions, users, and conversions over the last 15 days"
              />
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Traffic Sources</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {metrics.trafficSources.map((source) => (
                <div key={source.source} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center">
                        <Globe className="h-4 w-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-text">{source.source}</p>
                        <p className="text-body-xs text-text-muted">{source.medium}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-body-sm font-mono text-text">{formatNumber(source.sessions)}</p>
                      <p className="text-body-xs text-text-muted">{source.conversionRate.toFixed(2)}% conv • {source.change >= 0 ? '+' : ''}{source.change.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Top Pages</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {metrics.topPages.map((page) => (
                <div key={page.path} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-medium text-text truncate">{page.title}</p>
                      <p className="text-body-xs text-text-muted font-mono">{page.path}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-body-sm font-mono text-text">{formatNumber(page.views)}</p>
                      <p className="text-body-xs text-text-muted">{page.conversions} conv • {page.exitRate.toFixed(1)}% exit</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Engagement Metrics</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-surface-elevated/50 rounded-md">
                  <p className="text-metric font-mono text-text">{metrics.avgSessionDuration}s</p>
                  <p className="text-body-xs text-text-muted">Avg Session Duration</p>
                </div>
                <div className="p-3 bg-surface-elevated/50 rounded-md">
                  <p className="text-metric font-mono text-text">{metrics.bounceRate.toFixed(1)}%</p>
                  <p className="text-body-xs text-text-muted">Bounce Rate</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-surface-elevated/50 rounded-md">
                  <p className="text-metric font-mono text-text">{formatNumber(metrics.leads)}</p>
                  <p className="text-body-xs text-text-muted">Total Leads</p>
                </div>
                <div className="p-3 bg-surface-elevated/50 rounded-md">
                  <p className="text-metric font-mono text-text">{formatNumber(metrics.qualifiedLeads)}</p>
                  <p className="text-body-xs text-text-muted">Qualified Leads</p>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md">
                <p className="text-metric font-mono text-text">{metrics.conversionRate.toFixed(2)}%</p>
                <p className="text-body-xs text-text-muted">Overall Conversion Rate</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Exit Pages</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {metrics.exitPages.map((page) => (
                <div key={page.path} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-medium text-text truncate">{page.title}</p>
                      <p className="text-body-xs text-text-muted font-mono">{page.path}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-body-sm font-mono text-status-warning">{page.exitRate.toFixed(1)}%</p>
                      <p className="text-body-xs text-text-muted">Exit Rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-heading-md">Quick Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-status-healthy" />
                  <span className="text-body-sm font-medium text-text">Direct traffic leading conversions</span>
                </div>
                <p className="text-body-xs text-text-muted">Direct traffic converts at 0.58% vs 0.53% average. Brand awareness driving direct navigation.</p>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-status-healthy" />
                  <span className="text-body-sm font-medium text-text">Referral channel growing</span>
                </div>
                <p className="text-body-xs text-text-muted">Referral traffic up 22% with 0.60% conversion rate. Partner referrals performing well.</p>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="h-4 w-4 text-status-error" />
                  <span className="text-body-sm font-medium text-text">Social traffic declining</span>
                </div>
                <p className="text-body-xs text-text-muted">Social traffic down 5% with only 0.36% conversion. Consider paid social amplification.</p>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-status-healthy" />
                  <span className="text-body-sm font-medium text-text">Email channel opportunity</span>
                </div>
                <p className="text-body-xs text-text-muted">Email traffic up 34% but only 8% of sessions. High-intent audience underserved.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card variant="elevated">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-heading-md">All Pages</CardTitle>
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle" />
                <Input placeholder="Search pages..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table
              columns={[
                { key: 'path', header: 'Page', accessor: (row: PageMetric) => (
                  <div>
                    <p className="text-body-sm font-medium text-text truncate max-w-xs">{row.title}</p>
                    <p className="text-body-xs text-text-muted font-mono">{row.path}</p>
                  </div>
                )},
                { key: 'views', header: 'Views', accessor: (row: PageMetric) => <span className="font-mono">{formatNumber(row.views)}</span>, align: 'right', sortable: true },
                { key: 'uniqueViews', header: 'Unique Views', accessor: (row: PageMetric) => <span className="font-mono">{formatNumber(row.uniqueViews)}</span>, align: 'right', sortable: true },
                { key: 'avgTimeOnPage', header: 'Avg Time', accessor: (row: PageMetric) => <span className="font-mono">{row.avgTimeOnPage}s</span>, align: 'right', sortable: true },
                { key: 'exitRate', header: 'Exit Rate', accessor: (row: PageMetric) => <span className="font-mono">{row.exitRate.toFixed(1)}%</span>, align: 'right', sortable: true },
                { key: 'conversions', header: 'Conversions', accessor: (row: PageMetric) => <span className="font-mono">{formatNumber(row.conversions)}</span>, align: 'right', sortable: true },
              ]}
              data={metrics.topPages}
              keyAccessor={(row) => row.path}
              caption="Top pages by views"
              emptyMessage="No page data available"
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
