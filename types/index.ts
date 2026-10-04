export type DataSourceType =
  | 'website'
  | 'google_analytics'
  | 'google_search_console'
  | 'meta'
  | 'instagram'
  | 'tiktok'
  | 'youtube';

export type DataSourceStatus = 'healthy' | 'warning' | 'error' | 'disabled';

export type SyncStatus = 'success' | 'failed' | 'running' | 'pending';

export type InsightType = 'attention' | 'opportunity' | 'watch' | 'positive';

export type InsightConfidence = 'low' | 'moderate' | 'high';

export type InsightStatus = 'new' | 'acknowledged' | 'dismissed' | 'acted_upon';

export type ExperimentStatus = 'draft' | 'running' | 'completed' | 'paused';

export type RecommendationStatus = 'pending' | 'in_progress' | 'completed' | 'dismissed';

export type AlertSeverity = 'info' | 'warning' | 'critical';

export type AlertStatus = 'open' | 'acknowledged' | 'resolved';

export type AnomalySeverity = 'normal' | 'medium' | 'high' | 'critical';

export type ForecastConfidence = 'low' | 'moderate' | 'high';

export type UserRole = 'owner' | 'admin' | 'analyst' | 'content' | 'media_buyer' | 'viewer';

export type DateRangePreset = 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_90_days' | 'custom';

export type ComparisonType = 'previous_period' | 'previous_year' | 'none';

export interface DataSource {
  id: string;
  type: DataSourceType;
  name: string;
  status: DataSourceStatus;
  health_score: number;
  last_sync: string | null;
  last_error: string | null;
  data_coverage: number;
  metrics_tracked: number;
  is_connected: boolean;
  account_id: string | null;
  account_name: string | null;
  scopes: string[];
  created_at: string;
  updated_at: string;
}

export interface MetricDefinition {
  id: string;
  source_id: string;
  name: string;
  display_name: string;
  description: string | null;
  unit: string;
  aggregation: 'sum' | 'avg' | 'count' | 'rate' | 'last';
  is_primary: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface MetricObservation {
  id: string;
  metric_id: string;
  date: string;
  value: number;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface MetricDailySnapshot {
  id: string;
  metric_id: string;
  date: string;
  value: number;
  prev_period_value: number | null;
  prev_year_value: number | null;
  change_pct: number | null;
  change_pct_prev_year: number | null;
  trend: 'up' | 'down' | 'stable';
  created_at: string;
}

export interface ContentItem {
  id: string;
  source_id: string;
  external_id: string;
  title: string;
  description: string | null;
  content_type: string;
  platform: string;
  campaign_id: string | null;
  published_at: string | null;
  url: string | null;
  thumbnail_url: string | null;
  metrics: Record<string, number>;
  created_at: string;
  updated_at: string;
}

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  evidence: string;
  confidence: InsightConfidence;
  metric_id: string | null;
  change_pct: number | null;
  context: Record<string, unknown>;
  status: InsightStatus;
  related_recommendation_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  why: string;
  evidence: string;
  expected_impact: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  related_insight_id: string | null;
  suggested_experiment_id: string | null;
  status: RecommendationStatus;
  created_at: string;
  updated_at: string;
}

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  primary_metric_id: string | null;
  baseline_value: number | null;
  target_value: number | null;
  status: ExperimentStatus;
  start_date: string | null;
  end_date: string | null;
  result: string | null;
  learning: string | null;
  recommended_next_action: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExperimentResult {
  id: string;
  experiment_id: string;
  date: string;
  metric_value: number;
  control_value: number | null;
  variant_value: number | null;
  significance: number | null;
  is_significant: boolean;
  notes: string | null;
  created_at: string;
}

export interface Anomaly {
  id: string;
  metric_id: string;
  date: string;
  expected_value: number;
  actual_value: number;
  pct_difference: number;
  severity: AnomalySeverity;
  possible_context: string | null;
  is_reviewed: boolean;
  created_at: string;
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  metric_id: string | null;
  title: string;
  message: string;
  related_anomaly_id: string | null;
  possible_action: string | null;
  status: AlertStatus;
  created_at: string;
  updated_at: string;
}

export interface Forecast {
  id: string;
  metric_id: string;
  horizon_days: number;
  current_value: number;
  forecast_min: number;
  forecast_max: number;
  confidence: ForecastConfidence;
  assumptions: string;
  method: string;
  trend: 'up' | 'down' | 'stable';
  created_at: string;
}

export interface ForecastPoint {
  id: string;
  forecast_id: string;
  date: string;
  predicted_value: number;
  lower_bound: number;
  upper_bound: number;
}

export interface SyncRun {
  id: string;
  source_id: string;
  status: SyncStatus;
  records_processed: number;
  records_failed: number;
  started_at: string;
  completed_at: string | null;
  error_message: string | null;
}

export interface DataQualityCheck {
  id: string;
  source_id: string;
  check_type: 'freshness' | 'completeness' | 'schema' | 'consistency' | 'accuracy';
  status: 'pass' | 'warn' | 'fail';
  score: number;
  details: Record<string, unknown>;
  checked_at: string;
}

export interface IntegrationConnection {
  id: string;
  provider: DataSourceType;
  is_connected: boolean;
  auth_method: 'oauth' | 'api_key' | 'service_account' | null;
  account_id: string | null;
  account_name: string | null;
  account_email: string | null;
  scopes: string[];
  token_expires_at: string | null;
  last_sync: string | null;
  last_error: string | null;
  health: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface AttributionTouchpoint {
  id: string;
  journey_id: string;
  source: string;
  medium: string;
  campaign: string | null;
  content: string | null;
  term: string | null;
  timestamp: string;
  position: number;
  is_conversion: boolean;
  conversion_value: number | null;
}

export interface AttributionJourney {
  id: string;
  user_id: string | null;
  session_id: string;
  touchpoints: AttributionTouchpoint[];
  conversion_id: string | null;
  conversion_value: number | null;
  attribution_model: 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'position_based' | 'data_driven';
  confidence: number;
  created_at: string;
}

export interface MarketingMemory {
  id: string;
  category: 'campaign' | 'audience' | 'content' | 'channel' | 'experiment' | 'decision' | 'pattern';
  title: string;
  description: string;
  key_learning: string;
  tags: string[];
  related_experiment_id: string | null;
  related_campaign_id: string | null;
  confidence: InsightConfidence;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_active: boolean;
  invited_at: string;
  joined_at: string | null;
  created_at: string;
}

export interface DateRange {
  from: Date;
  to: Date;
  preset: DateRangePreset;
  comparison: ComparisonType;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: number | string;
  change: number | null;
  changeLabel: string;
  trend: 'up' | 'down' | 'stable' | null;
  format: 'number' | 'currency' | 'percentage' | 'ratio' | 'duration';
  precision: number;
  status: DataSourceStatus;
  isDemo: boolean;
}

export interface ChannelPerformance {
  sourceId: string;
  sourceName: string;
  sourceType: DataSourceType;
  status: DataSourceStatus;
  metrics: KpiMetric[];
  trend: 'up' | 'down' | 'stable';
  alerts: number;
  lastSync: string | null;
  coverage: number;
}

export interface ContentPerformance {
  id: string;
  title: string;
  platform: string;
  contentType: string;
  campaign: string | null;
  publishedAt: string;
  metrics: {
    reach: number;
    engagement: number;
    engagementRate: number;
    saves: number;
    shares: number;
    comments: number;
    clicks: number;
    conversions: number;
  };
  trend: 'up' | 'down' | 'stable';
  classification: 'high_reach_low_engagement' | 'low_reach_high_engagement' | 'high_engagement_low_conversion' | 'high_conversion_low_distribution' | 'balanced';
  isDemo: boolean;
}

export interface CampaignPerformance {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  spend: number;
  reach: number;
  clicks: number;
  ctr: number;
  leads: number;
  qualifiedLeads: number;
  conversionRate: number;
  cpa: number;
  trend: 'up' | 'down' | 'stable';
  attributionSignals: number;
  isDemo: boolean;
}

export interface WebsiteMetrics {
  sessions: number;
  users: number;
  pageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  leads: number;
  qualifiedLeads: number;
  trafficSources: TrafficSource[];
  topPages: PageMetric[];
  exitPages: PageMetric[];
}

export interface TrafficSource {
  source: string;
  medium: string;
  sessions: number;
  users: number;
  conversions: number;
  conversionRate: number;
  change: number;
}

export interface PageMetric {
  path: string;
  title: string;
  views: number;
  uniqueViews: number;
  avgTimeOnPage: number;
  exitRate: number;
  conversions: number;
}

export interface HealthOverview {
  healthySources: number;
  totalSources: number;
  trackedMetrics: number;
  openAnomalies: number;
  openAlerts: number;
  recentInsights: number;
  runningExperiments: number;
  openRecommendations: number;
  marketingHealthScore: number;
  dataQualityScore: number;
}

export interface OverviewIntelligence {
  whatChanged: IntelligenceItem[];
  whyItMatters: IntelligenceItem[];
  whatToWatch: IntelligenceItem[];
  opportunities: IntelligenceItem[];
  recommendedActions: IntelligenceItem[];
}

export interface IntelligenceItem {
  id: string;
  type: 'fact' | 'correlation' | 'hypothesis' | 'recommendation' | 'watch' | 'opportunity';
  title: string;
  description: string;
  evidence: string;
  confidence: InsightConfidence;
  metricId: string | null;
  relatedInsightId: string | null;
}

export interface DemoDataFlags {
  isDemoMode: boolean;
  demoDataVersion: string;
  lastUpdated: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isDemo: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}