'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatNumber, formatRelativeTime } from '@/lib/utils';
import {
  FileText,
  Video,
  Image,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Zap,
  Eye,
  Target,
  ExternalLink,
  Filter,
  Search,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { KpiCard, KpiGrid } from '@/components/ui/KpiCard';
import { Table, Column } from '@/components/ui/Table';
import { AppLayout } from '@/components/layout/AppLayout';
import { getDemoContentPerformance } from '@/lib/demo-data';
import type { ContentPerformance } from '@/types';

const CLASSIFICATION_LABELS = {
  high_reach_low_engagement: 'High Reach / Low Engagement',
  low_reach_high_engagement: 'Low Reach / High Engagement',
  high_engagement_low_conversion: 'High Engagement / Low Conversion',
  high_conversion_low_distribution: 'High Conversion / Low Distribution',
  balanced: 'Balanced Performance',
};

const CLASSIFICATION_ICONS = {
  high_reach_low_engagement: Eye,
  low_reach_high_engagement: Zap,
  high_engagement_low_conversion: Target,
  high_conversion_low_distribution: AlertTriangle,
  balanced: TrendingUp,
};

const CLASSIFICATION_BADGES = {
  high_reach_low_engagement: 'warning',
  low_reach_high_engagement: 'gold',
  high_engagement_low_conversion: 'warning',
  high_conversion_low_distribution: 'error',
  balanced: 'healthy',
} as const;

function ContentCard({ content }: { content: ContentPerformance }) {
  const ClassificationIcon = CLASSIFICATION_ICONS[content.classification];
  const badgeVariant = CLASSIFICATION_BADGES[content.classification];

  return (
    <Card variant="elevated" className="hover:border-gold/30 hover:shadow-elevated transition-all duration-normal">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={content.trend === 'up' ? 'healthy' : content.trend === 'down' ? 'error' : 'disabled'} className="text-caption">
                {content.trend === 'up' ? '▲ Trending Up' : content.trend === 'down' ? '▼ Trending Down' : '● Stable'}
              </Badge>
              <Badge variant={badgeVariant} className="text-capton ml-auto">
                {CLASSIFICATION_LABELS[content.classification]}
              </Badge>
            </div>
            <h3 className="text-heading-sm font-medium text-text mb-1 truncate">{content.title}</h3>
            <div className="flex items-center gap-3 text-body-xs text-text-muted mb-3">
              <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {content.contentType}</span>
              <span className="flex items-center gap-1"><Video className="h-3 w-3" /> {content.platform}</span>
              {content.campaign && <span className="flex items-center gap-1"><Target className="h-3 w-3" /> {content.campaign}</span>}
              <span>{formatRelativeTime(content.publishedAt)}</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-0.5">
                <p className="text-metric-sm font-mono text-text">{formatNumber(content.metrics.reach)}</p>
                <p className="text-body-xs text-text-muted">Reach</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-metric-sm font-mono text-text">{formatNumber(content.metrics.engagement)}</p>
                <p className="text-body-xs text-text-muted">Engagement</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-metric-sm font-mono text-text">{content.metrics.engagementRate.toFixed(1)}%</p>
                <p className="text-body-xs text-text-muted">Eng. Rate</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-metric-sm font-mono text-text">{formatNumber(content.metrics.conversions)}</p>
                <p className="text-body-xs text-text-muted">Conversions</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-body-xs text-text-muted">
              <ClassificationIcon className="h-3.5 w-3.5" />
              <span>Classification</span>
            </div>
            <Link href={`/content/${content.id}`} className="btn btn-ghost btn-sm gap-1.5">
              Analyze <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ContentClient() {
  const [content, setContent] = useState<ContentPerformance[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentPerformance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      const data = getDemoContentPerformance();
      setContent(data);
      setFilteredContent(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = content;
    if (searchQuery) {
      result = result.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.campaign?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (platformFilter !== 'all') {
      result = result.filter(c => c.platform === platformFilter);
    }
    if (typeFilter !== 'all') {
      result = result.filter(c => c.contentType === typeFilter);
    }
    setFilteredContent(result);
  }, [searchQuery, platformFilter, typeFilter, content]);

  const platforms = [...new Set(content.map(c => c.platform))];
  const types = [...new Set(content.map(c => c.contentType))];

  const topPerforming = content
    .filter(c => c.metrics.engagementRate > 10)
    .sort((a, b) => b.metrics.engagementRate - a.metrics.engagementRate)
    .slice(0, 3);

  const underperforming = content
    .filter(c => c.metrics.engagementRate < 5)
    .sort((a, b) => a.metrics.engagementRate - b.metrics.engagementRate)
    .slice(0, 3);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6 animate-pulse">
          <div className="section-header">
            <div className="h-8 w-48 bg-surface-elevated rounded" />
          </div>
          <KpiGrid metrics={Array(4).fill({})} />
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card variant="elevated" key={i} className="h-72" />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  const columns: Column<ContentPerformance>[] = [
    { key: 'title', header: 'Content', accessor: (row) => (
      <div>
        <p className="text-body-sm font-medium text-text truncate max-w-xs">{row.title}</p>
        <p className="text-body-xs text-text-muted">{row.contentType} • {row.platform}</p>
      </div>
    )},
    { key: 'reach', header: 'Reach', accessor: (row) => <span className="font-mono">{formatNumber(row.metrics.reach)}</span>, align: 'right', sortable: true },
    { key: 'engagement', header: 'Engagement', accessor: (row) => <span className="font-mono">{formatNumber(row.metrics.engagement)}</span>, align: 'right', sortable: true },
    { key: 'engagementRate', header: 'Eng. Rate', accessor: (row) => <span className="font-mono">{row.metrics.engagementRate.toFixed(1)}%</span>, align: 'right', sortable: true },
    { key: 'conversions', header: 'Conversions', accessor: (row) => <span className="font-mono">{formatNumber(row.metrics.conversions)}</span>, align: 'right', sortable: true },
    { key: 'classification', header: 'Classification', accessor: (row) => (
      <Badge variant={CLASSIFICATION_BADGES[row.classification]} className="text-caption">
        {CLASSIFICATION_LABELS[row.classification]}
      </Badge>
    )},
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="section-header">
          <div>
            <h1 className="section-title">Content Intelligence</h1>
            <p className="section-subtitle">Analyze content performance, identify opportunities, and optimize distribution</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">DEMO DATA</Badge>
          </div>
        </div>

        <KpiGrid
          metrics={[
            { id: 'cont-total', label: 'Total Content', value: content.length, change: 12, changeLabel: 'vs prev period', trend: 'up', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'cont-reach', label: 'Total Reach', value: content.reduce((sum, c) => sum + c.metrics.reach, 0), change: 18.3, changeLabel: 'vs prev period', trend: 'up', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'cont-engagement', label: 'Total Engagement', value: content.reduce((sum, c) => sum + c.metrics.engagement, 0), change: 8.4, changeLabel: 'vs prev period', trend: 'up', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'cont-conversions', label: 'Conversions', value: content.reduce((sum, c) => sum + c.metrics.conversions, 0), change: -5.2, changeLabel: 'vs prev period', trend: 'down', format: 'number', precision: 0, status: 'warning', isDemo: true },
          ]}
          columns={4}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-heading-md">Top Performing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topPerforming.map((item) => (
                <div key={item.id} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-medium text-text truncate">{item.title}</p>
                      <p className="text-body-xs text-text-muted">{item.platform} • {item.contentType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-body-sm font-mono text-gold">{item.metrics.engagementRate.toFixed(1)}%</p>
                      <p className="text-body-xs text-text-muted">Engagement Rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-heading-md">Underperforming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {underperforming.map((item) => (
                <div key={item.id} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-medium text-text truncate">{item.title}</p>
                      <p className="text-body-xs text-text-muted">{item.platform} • {item.contentType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-body-sm font-mono text-status-error">{item.metrics.engagementRate.toFixed(1)}%</p>
                      <p className="text-body-xs text-text-muted">Engagement Rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-heading-md">Content Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-gold" />
                  <span className="text-body-sm font-medium text-text">High Conversion, Low Distribution</span>
                </div>
                <p className="text-body-xs text-text-muted">3 pieces convert well but have low reach. Consider paid amplification.</p>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="h-4 w-4 text-gold" />
                  <span className="text-body-sm font-medium text-text">High Reach, Low Engagement</span>
                </div>
                <p className="text-body-xs text-text-muted">1 piece has high reach but low engagement. Test different hooks/formats.</p>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-gold" />
                  <span className="text-body-sm font-medium text-text">High Engagement, Low Conversion</span>
                </div>
                <p className="text-body-xs text-text-muted">2 pieces engage well but don't convert. Optimize CTAs and landing pages.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card variant="elevated">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-heading-md">All Content</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle" />
                  <Input
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="input max-w-xs"
                >
                  <option value="all">All Platforms</option>
                  {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="input max-w-xs"
                >
                  <option value="all">All Types</option>
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table
              columns={columns}
              data={filteredContent}
              keyAccessor={(row) => row.id}
              caption="Content performance table"
              emptyMessage="No content matches your filters"
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
