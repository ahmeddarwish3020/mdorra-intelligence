'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils';
import {
  Globe,
  BarChart2,
  Search,
  Facebook,
  Instagram,
  Youtube,
  Music,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Wifi,
  WifiOff,
  Settings,
  Plus,
  ExternalLink,
  RefreshCw,
  Trash2,
  Key,
  Shield,
  AlertCircle,
  Database,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KpiCard, KpiGrid } from '@/components/ui/KpiCard';
import { AppLayout } from '@/components/layout/AppLayout';
import { getDemoDataSources, getDemoHealthOverview } from '@/lib/demo-data';
import type { DataSource, DataSourceType, HealthOverview } from '@/types';

const PROVIDER_CONFIG: Record<DataSourceType, { icon: React.ComponentType<{ className?: string }>; name: string; description: string; authMethod: string; scopes: string[]; color: string }> = {
  website: { icon: Globe, name: 'MDORRA Website', description: 'First-party website analytics and events', authMethod: 'API Key', scopes: ['read:analytics', 'read:content', 'read:events'], color: 'text-gold' },
  google_analytics: { icon: BarChart2, name: 'Google Analytics 4', description: 'Web and app analytics from Google', authMethod: 'OAuth 2.0', scopes: ['analytics.readonly', 'analytics.edit'], color: 'text-orange-400' },
  google_search_console: { icon: Search, name: 'Google Search Console', description: 'Search performance and indexing data', authMethod: 'OAuth 2.0', scopes: ['webmasters.readonly', 'webmasters'], color: 'text-green-400' },
  meta: { icon: Facebook, name: 'Meta (Facebook)', description: 'Facebook Ads and Business Manager data', authMethod: 'OAuth 2.0', scopes: ['ads_read', 'business_management', 'pages_read_engagement'], color: 'text-blue-400' },
  instagram: { icon: Instagram, name: 'Instagram', description: 'Instagram Business account insights', authMethod: 'OAuth 2.0', scopes: ['instagram_basic', 'instagram_manage_insights', 'pages_read_engagement'], color: 'text-pink-400' },
  tiktok: { icon: Music, name: 'TikTok', description: 'TikTok for Business advertising data', authMethod: 'OAuth 2.0', scopes: ['ads.read', 'video.list', 'user.info.basic'], color: 'text-gray-400' },
  youtube: { icon: Youtube, name: 'YouTube', description: 'YouTube Analytics and channel data', authMethod: 'OAuth 2.0', scopes: ['youtube.readonly', 'youtube.force-ssl', 'yt-analytics.readonly'], color: 'text-red-400' },
};

const STATUS_CONFIG = {
  healthy: { icon: CheckCircle, label: 'Connected', variant: 'healthy' as const, color: 'text-status-healthy' },
  warning: { icon: AlertTriangle, label: 'Degraded', variant: 'warning' as const, color: 'text-status-warning' },
  error: { icon: XCircle, label: 'Error', variant: 'error' as const, color: 'text-status-error' },
  disabled: { icon: WifiOff, label: 'Not Connected', variant: 'disabled' as const, color: 'text-status-disabled' },
};

function IntegrationCard({ source }: { source: DataSource }) {
  const config = PROVIDER_CONFIG[source.type];
  const statusConfig = STATUS_CONFIG[source.status];
  const Icon = config.icon;

  const [actionState, setActionState] = useState<{ type: 'connect' | 'disconnect' | 'sync'; message: string } | null>(null);

  const handleConnect = () => {
    setActionState({ type: 'connect', message: `OAuth configuration required for ${config.name}. Set up OAuth credentials in Supabase dashboard.` });
  };

  const handleDisconnect = () => {
    setActionState({ type: 'disconnect', message: `Disconnect ${config.name}? This will stop data sync and remove the connection.` });
  };

  const handleSync = () => {
    setActionState({ type: 'sync', message: `Sync triggered for ${config.name}. This would initiate a manual sync run.` });
  };

  const confirmAction = () => {
    setActionState(null);
  };

  const cancelAction = () => {
    setActionState(null);
  };

return (
    <>
      <Card variant="elevated" className="hover:border-gold/30 hover:shadow-elevated transition-all duration-normal">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={cn('h-14 w-14 rounded-xl flex items-center justify-center', `bg-${config.color.replace('text-', 'bg-')}/10`)}>
                <Icon className={cn('h-7 w-7', config.color)} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-heading-sm">{config.name}</CardTitle>
                  <Badge variant={statusConfig.variant} className="gap-1">
                    <statusConfig.icon className="h-3 w-3" />
                    {statusConfig.label}
                  </Badge>
                </div>
                <p className="text-body-sm text-text-muted">{config.description}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-3 bg-surface-elevated/50 rounded-md">
            <div>
              <p className="text-body-xs text-text-muted mb-1">Auth Method</p>
              <p className="text-body-sm font-medium text-text flex items-center gap-1">
                <Key className="h-3.5 w-3.5" />
                {config.authMethod}
              </p>
            </div>
            <div>
              <p className="text-body-xs text-text-muted mb-1">Account</p>
              <p className="text-body-sm font-medium text-text flex items-center gap-1">
                {source.is_connected ? (
                  <>
                    <CheckCircle className="h-3.5 w-3.5 text-status-healthy" />
                    {source.account_name || source.account_id || 'Connected'}
                  </>
                ) : (
                  <>
                    <XCircle className="h-3.5 w-3.5 text-status-disabled" />
                    Not connected
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="p-3 bg-surface-elevated/50 rounded-md">
            <p className="text-body-xs text-text-muted mb-2">Granted Scopes</p>
            <div className="flex flex-wrap gap-1.5">
              {config.scopes.map((scope) => (
                <Badge key={scope} variant="gold" className="text-caption bg-gold/5 border-gold/20 text-gold">
                  {scope}
                </Badge>
              ))}
            </div>
          </div>

          {source.last_sync && (
            <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-body-sm">
                  <Wifi className="h-4 w-4 text-status-healthy" />
                  <span className="text-text-muted">Last successful sync</span>
                  <span className="font-mono text-text">{formatRelativeTime(source.last_sync)}</span>
                </div>
                <span className="text-body-xs text-text-muted">{source.data_coverage}% coverage</span>
              </div>
            </div>
          )}

          {source.last_error && (
            <div className="p-3 bg-status-error/10 border border-status-error/20 rounded-md">
              <div className="flex items-center gap-2 text-body-sm">
                <AlertCircle className="h-4 w-4 text-status-error" />
                <span className="text-status-error">Last error: {source.last_error}</span>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-body-xs text-text-subtle">
                <Shield className="h-3.5 w-3.5" />
                <span>{source.metrics_tracked} metrics tracked</span>
              </div>
              <div className="flex items-center gap-2">
                {source.is_connected ? (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleSync} className="gap-1.5">
                      <RefreshCw className="h-3.5 w-3.5" />
                      Sync Now
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleDisconnect} className="gap-1.5 text-status-error hover:text-status-error">
                      <Trash2 className="h-3.5 w-3.5" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" size="sm" onClick={handleConnect} className="gap-1.5">
                    <Plus className="h-3.5 w-3.5" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {actionState && (
        <div className="fixed inset-0 z-modal flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="panel-elevated rounded-md p-6 max-w-md w-full mx-4 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              {actionState.type === 'connect' && <Plus className="h-6 w-6 text-gold" />}
              {actionState.type === 'disconnect' && <Trash2 className="h-6 w-6 text-status-error" />}
              {actionState.type === 'sync' && <RefreshCw className="h-6 w-6 text-gold" />}
              <h3 className="text-heading-sm">
                {actionState.type === 'connect' && 'Connect Integration'}
                {actionState.type === 'disconnect' && 'Disconnect Integration'}
                {actionState.type === 'sync' && 'Sync Integration'}
              </h3>
            </div>
            <p className="text-body-sm text-text-muted mb-6">{actionState.message}</p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={cancelAction}>Cancel</Button>
              <Button variant={actionState.type === 'disconnect' ? 'danger' : 'primary'} size="sm" onClick={confirmAction}>
                {actionState.type === 'connect' && 'Configure OAuth'}
                {actionState.type === 'disconnect' && 'Disconnect'}
                {actionState.type === 'sync' && 'Sync Now'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function IntegrationsClient() {
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

  const connectedCount = dataSources.filter(s => s.is_connected).length;

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
            <h1 className="section-title">Integrations Center</h1>
            <p className="section-subtitle">Manage connections, authentication, and data sync for all marketing platforms</p>
          </div>
        </div>

        <KpiGrid
          metrics={[
            { id: 'int-total', label: 'Total Providers', value: dataSources.length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'int-connected', label: 'Connected', value: connectedCount, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'int-healthy', label: 'Healthy', value: dataSources.filter(s => s.status === 'healthy').length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'int-pending', label: 'Pending Setup', value: dataSources.filter(s => !s.is_connected).length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'warning', isDemo: true },
          ]}
          columns={4}
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {dataSources.map((source) => (
            <IntegrationCard key={source.id} source={source} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gold" />
                <CardTitle className="text-heading-md">Connection Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Key className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-text">OAuth 2.0 Flow</p>
                    <p className="text-body-xs text-text-muted">Google Analytics, Search Console, Meta, Instagram, TikTok, YouTube use OAuth 2.0 with PKCE</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-text">Service Account</p>
                    <p className="text-body-xs text-text-muted">Google Analytics 4 and Search Console support service account authentication for server-to-server</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-text">Token Management</p>
                    <p className="text-body-xs text-text-muted">Automatic token refresh, expiry monitoring, and secure encrypted storage</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-text">Granular Scopes</p>
                    <p className="text-body-xs text-text-muted">Request only necessary permissions. Scopes displayed transparently before consent.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-gold" />
                <CardTitle className="text-heading-md">Pending Connections</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {dataSources.filter(s => !s.is_connected).map((source) => {
                const config = PROVIDER_CONFIG[source.type];
                return (
                  <div key={source.id} className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', `bg-${config.color.replace('text-', 'bg-')}/10`)}>
                          <config.icon className={cn('h-5 w-5', config.color)} />
                        </div>
                        <div>
                          <p className="text-body-sm font-medium text-text">{config.name}</p>
                          <p className="text-body-xs text-text-muted">{config.authMethod} • {config.scopes.length} scopes</p>
                        </div>
                      </div>
                      <Button variant="primary" size="sm" onClick={() => alert(`Connect ${config.name}`)} className="gap-1.5">
                        <Plus className="h-3.5 w-3.5" />
                        Connect
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-heading-md">Integration Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-gold" />
                  </div>
                  <h4 className="text-body-sm font-medium text-text">Scheduled Sync</h4>
                </div>
                <p className="text-body-xs text-text-muted">Automated hourly/daily sync runs with configurable schedules per provider. Retry logic with exponential backoff.</p>
              </div>
              <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-gold" />
                  </div>
                  <h4 className="text-body-sm font-medium text-text">Health Monitoring</h4>
                </div>
                <p className="text-body-xs text-text-muted">Real-time health checks, latency tracking, error rate alerting, and data freshness SLA monitoring.</p>
              </div>
              <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Database className="h-5 w-5 text-gold" />
                  </div>
                  <h4 className="text-body-sm font-medium text-text">Data Normalization</h4>
                </div>
                <p className="text-body-xs text-text-muted">Unified schema across providers. Raw events → normalized events → metric observations pipeline.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}