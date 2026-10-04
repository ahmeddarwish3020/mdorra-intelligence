'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatNumber, formatRelativeTime } from '@/lib/utils';
import {
  Target,
  DollarSign,
  Users,
  MousePointer,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  PauseCircle,
  Clock,
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
import { getDemoCampaignPerformance } from '@/lib/demo-data';
import type { CampaignPerformance } from '@/types';

const STATUS_BADGES = {
  active: 'healthy',
  paused: 'warning',
  completed: 'disabled',
  draft: 'disabled',
} as const;

const STATUS_ICONS = {
  active: CheckCircle,
  paused: PauseCircle,
  completed: XCircle,
  draft: Clock,
};

function CampaignCard({ campaign }: { campaign: CampaignPerformance }) {
  const StatusIcon = STATUS_ICONS[campaign.status];
  const badgeVariant = STATUS_BADGES[campaign.status];

  return (
    <Card variant="elevated" className="hover:border-gold/30 hover:shadow-elevated transition-all duration-normal">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-heading-sm truncate">{campaign.name}</CardTitle>
            <p className="text-body-xs text-text-muted">{campaign.platform}</p>
          </div>
          <Badge variant={badgeVariant} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-0.5">
            <p className="text-metric-sm font-mono text-text">${formatNumber(campaign.spend)}</p>
            <p className="text-body-xs text-text-muted">Spend</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-metric-sm font-mono text-text">{formatNumber(campaign.reach)}</p>
            <p className="text-body-xs text-text-muted">Reach</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-metric-sm font-mono text-text">{formatNumber(campaign.clicks)}</p>
            <p className="text-body-xs text-text-muted">Clicks</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-metric-sm font-mono text-text">{campaign.ctr.toFixed(2)}%</p>
            <p className="text-body-xs text-text-muted">CTR</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border">
          <div className="space-y-0.5">
            <p className="text-metric-sm font-mono text-text">{formatNumber(campaign.leads)}</p>
            <p className="text-body-xs text-text-muted">Leads</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-metric-sm font-mono text-text">{formatNumber(campaign.qualifiedLeads)}</p>
            <p className="text-body-xs text-text-muted">Qualified</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-metric-sm font-mono text-text">{campaign.conversionRate.toFixed(1)}%</p>
            <p className="text-body-xs text-text-muted">Conv. Rate</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-metric-sm font-mono text-text">${formatNumber(campaign.cpa)}</p>
            <p className="text-body-xs text-text-muted">CPA</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-body-xs text-text-subtle">
            <span className={cn('font-mono', campaign.trend === 'up' ? 'text-status-healthy' : campaign.trend === 'down' ? 'text-status-error' : 'text-text-subtle')}>
              {campaign.trend === 'up' ? '▲' : campaign.trend === 'down' ? '▼' : '●'} Trending
            </span>
            <span>{campaign.attributionSignals} attribution signals</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/campaigns/${campaign.id}`} className="btn btn-ghost btn-sm gap-1.5 w-full sm:w-auto">
            <ExternalLink className="h-3.5 w-3.5" />
            View Details
          </Link>
      </CardFooter>
    </Card>
  );
}

export function CampaignsClient() {
  const [campaigns, setCampaigns] = useState<CampaignPerformance[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<CampaignPerformance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      const data = getDemoCampaignPerformance();
      setCampaigns(data);
      setFilteredCampaigns(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = campaigns;
    if (searchQuery) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.platform.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(c => c.status === statusFilter);
    }
    if (platformFilter !== 'all') {
      result = result.filter(c => c.platform === platformFilter);
    }
    setFilteredCampaigns(result);
  }, [searchQuery, statusFilter, platformFilter, campaigns]);

  const platforms = [...new Set(campaigns.map(c => c.platform))];

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6 animate-pulse">
          <div className="section-header">
            <div className="h-8 w-48 bg-surface-elevated rounded" />
          </div>
          <KpiGrid metrics={Array(4).fill({})} />
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card variant="elevated" key={i} className="h-96" />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const totalQualified = campaigns.reduce((sum, c) => sum + c.qualifiedLeads, 0);
  const avgCtr = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length : 0;
  const avgCpa = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.cpa, 0) / campaigns.length : 0;

  const columns: Column<CampaignPerformance>[] = [
    { key: 'name', header: 'Campaign', accessor: (row) => (
      <div>
        <p className="text-body-sm font-medium text-text">{row.name}</p>
        <p className="text-body-xs text-text-muted">{row.platform}</p>
      </div>
    )},
    { key: 'status', header: 'Status', accessor: (row) => {
      const StatusIcon = STATUS_ICONS[row.status];
      return (
        <Badge variant={STATUS_BADGES[row.status]} className="gap-1">
          <StatusIcon className="h-3 w-3" />
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      );
    }},
    { key: 'spend', header: 'Spend', accessor: (row) => <span className="font-mono">${formatNumber(row.spend)}</span>, align: 'right', sortable: true },
    { key: 'reach', header: 'Reach', accessor: (row) => <span className="font-mono">{formatNumber(row.reach)}</span>, align: 'right', sortable: true },
    { key: 'ctr', header: 'CTR', accessor: (row) => <span className="font-mono">{row.ctr.toFixed(2)}%</span>, align: 'right', sortable: true },
    { key: 'leads', header: 'Leads', accessor: (row) => <span className="font-mono">{formatNumber(row.leads)}</span>, align: 'right', sortable: true },
    { key: 'qualifiedLeads', header: 'Qualified', accessor: (row) => <span className="font-mono">{formatNumber(row.qualifiedLeads)}</span>, align: 'right', sortable: true },
    { key: 'conversionRate', header: 'Conv. Rate', accessor: (row) => <span className="font-mono">{row.conversionRate.toFixed(1)}%</span>, align: 'right', sortable: true },
    { key: 'cpa', header: 'CPA', accessor: (row) => <span className="font-mono">${formatNumber(row.cpa)}</span>, align: 'right', sortable: true },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="section-header">
          <div>
            <h1 className="section-title">Campaigns</h1>
            <p className="section-subtitle">Track campaign performance, attribution signals, and ROI across all platforms</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">DEMO DATA</Badge>
          </div>
        </div>

        <KpiGrid
          metrics={[
            { id: 'camp-total', label: 'Total Campaigns', value: campaigns.length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'camp-spend', label: 'Total Spend', value: totalSpend, change: 15.2, changeLabel: 'vs prev period', trend: 'up', format: 'currency', precision: 0, status: 'healthy', isDemo: true },
            { id: 'camp-reach', label: 'Total Reach', value: totalReach, change: 12.8, changeLabel: 'vs prev period', trend: 'up', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'camp-leads', label: 'Total Leads', value: totalLeads, change: 8.4, changeLabel: 'vs prev period', trend: 'up', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'camp-qualified', label: 'Qualified Leads', value: totalQualified, change: 3.2, changeLabel: 'vs prev period', trend: 'up', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'camp-cpa', label: 'Avg CPA', value: avgCpa, change: -4.1, changeLabel: 'vs prev period', trend: 'down', format: 'currency', precision: 0, status: 'healthy', isDemo: true },
          ]}
          columns={6}
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        <Card variant="elevated">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-heading-md">All Campaigns</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input max-w-xs"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                  <option value="draft">Draft</option>
                </select>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="input max-w-xs"
                >
                  <option value="all">All Platforms</option>
                  {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table
              columns={columns}
              data={filteredCampaigns}
              keyAccessor={(row) => row.id}
              caption="Campaign performance table"
              emptyMessage="No campaigns match your filters"
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
