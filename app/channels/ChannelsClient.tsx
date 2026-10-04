'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatNumber, formatRelativeTime } from '@/lib/utils';
import {
  Globe,
  BarChart2,
  Search,
  Facebook,
  Instagram,
  Youtube,
  Music,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  RefreshCw,
  Settings,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KpiCard, KpiGrid } from '@/components/ui/KpiCard';
import { SparklineChart } from '@/components/ui/Charts';
import { AppLayout } from '@/components/layout/AppLayout';
import { getDemoChannelPerformance, getDemoDataSources } from '@/lib/demo-data';
import type { ChannelPerformance, DataSource } from '@/types';

const CHANNEL_ICONS = {
  website: Globe,
  google_analytics: BarChart2,
  google_search_console: Search,
  meta: Facebook,
  instagram: Instagram,
  tiktok: Music,
  youtube: Youtube,
};

const STATUS_ICONS = {
  healthy: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  disabled: WifiOff,
};

function ChannelCard({ channel }: { channel: ChannelPerformance }) {
  const Icon = CHANNEL_ICONS[channel.sourceType] || Globe;
  const StatusIcon = STATUS_ICONS[channel.status];

  return (
    <Card variant="elevated" className="hover:border-gold/30 hover:shadow-elevated transition-all duration-normal">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-surface-elevated border border-border flex items-center justify-center">
              <Icon className="h-6 w-6 text-gold" />
            </div>
            <div>
              <CardTitle className="text-heading-sm">{channel.sourceName}</CardTitle>
              <p className="text-body-xs text-text-muted capitalize">{channel.sourceType.replace('_', ' ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={channel.status === 'healthy' ? 'healthy' : channel.status === 'warning' ? 'warning' : channel.status === 'error' ? 'error' : 'disabled'}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {channel.status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {channel.metrics.length > 0 ? (
          <KpiGrid metrics={channel.metrics} columns={4} />
        ) : (
          <div className="text-center py-8">
            <StatusIcon className="h-12 w-12 text-text-subtle mx-auto mb-3" />
            <p className="text-body text-text-muted mb-2">Not Connected</p>
            <p className="text-body-sm text-text-subtle mb-4">
              Connect {channel.sourceName} to start tracking metrics
            </p>
            <Button variant="primary" size="sm" className="w-full sm:w-auto">
              <Settings className="h-3.5 w-3.5 mr-1.5" />
              Configure
            </Button>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-metric font-mono text-text">{channel.coverage}%</p>
              <p className="text-body-xs text-text-muted">Coverage</p>
            </div>
            <div>
              <p className="text-metric font-mono text-text">{channel.metrics.length}</p>
              <p className="text-body-xs text-text-muted">Metrics</p>
            </div>
            <div>
              <p className="text-metric font-mono text-text">{channel.alerts}</p>
              <p className="text-body-xs text-text-muted">Alerts</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 text-body-xs text-text-subtle">
            {channel.lastSync ? (
              <>
                <Wifi className="h-3.5 w-3.5" />
                <span>Last sync {formatRelativeTime(channel.lastSync)}</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3.5 w-3.5 text-status-warning" />
                <span>Never synced</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Sync
            </Button>
            <Link href={`/channels/${channel.sourceId}`} className="btn btn-ghost btn-sm gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" />
              Details
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function ChannelsClient() {
  const [channels, setChannels] = useState<ChannelPerformance[]>([]);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      setChannels(getDemoChannelPerformance());
      setDataSources(getDemoDataSources());
      setIsLoading(false);
    };
    loadData();
  }, []);

  const connectedChannels = channels.filter(c => c.status !== 'disabled');
  const disconnectedChannels = channels.filter(c => c.status === 'disabled');

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6 animate-pulse">
          <div className="section-header">
            <div className="h-8 w-48 bg-surface-elevated rounded" />
          </div>
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
            <h1 className="section-title">Channels</h1>
            <p className="section-subtitle">Monitor health, performance, and sync status across all marketing channels</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">DEMO DATA</Badge>
          </div>
        </div>

        <KpiGrid
          metrics={[
            { id: 'ch-total', label: 'Total Channels', value: channels.length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'ch-connected', label: 'Connected', value: connectedChannels.length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'ch-healthy', label: 'Healthy', value: channels.filter(c => c.status === 'healthy').length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'ch-alerts', label: 'Total Alerts', value: channels.reduce((sum, c) => sum + c.alerts, 0), change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: channels.some(c => c.alerts > 0) ? 'warning' : 'healthy', isDemo: true },
          ]}
          columns={4}
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {channels.map((channel) => (
            <ChannelCard key={channel.sourceId} channel={channel} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Channel Health Overview</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {dataSources.map((source) => (
                <div key={source.id} className="flex items-center justify-between p-3 bg-surface-elevated/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center">
                      {(() => {
                        const Icon = CHANNEL_ICONS[source.type as keyof typeof CHANNEL_ICONS];
                        return <Icon className="h-4 w-4 text-gold" />;
                      })()}
                    </div>
                    <div>
                      <p className="text-body-sm font-medium text-text">{source.name}</p>
                      <p className="text-body-xs text-text-muted">Health Score: {source.health_score}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={cn('h-2 w-2 rounded-full', source.status === 'healthy' ? 'bg-status-healthy' : source.status === 'warning' ? 'bg-status-warning' : source.status === 'error' ? 'bg-status-error' : 'bg-status-disabled')} />
                    <span className="text-body-xs text-text-muted capitalize">{source.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-gold" />
                  <CardTitle className="text-heading-md">Quick Actions</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm font-medium text-text">Connect Google Analytics 4</p>
                    <p className="text-body-xs text-text-muted">Enable web analytics tracking</p>
                  </div>
                  <Button variant="primary" size="sm">Connect</Button>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm font-medium text-text">Connect Search Console</p>
                    <p className="text-body-xs text-text-muted">Monitor search performance</p>
                  </div>
                  <Button variant="primary" size="sm">Connect</Button>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm font-medium text-text">Connect Meta Ads</p>
                    <p className="text-body-xs text-text-muted">Track paid social performance</p>
                  </div>
                  <Button variant="primary" size="sm">Connect</Button>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm font-medium text-text">Connect Instagram</p>
                    <p className="text-body-xs text-text-muted">Monitor organic social</p>
                  </div>
                  <Button variant="primary" size="sm">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
