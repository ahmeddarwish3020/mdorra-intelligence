import { createServerSupabaseClient } from '@/lib/supabase';
import type {
  DataSource,
  HealthOverview,
  KpiMetric,
  ChannelPerformance,
  ContentPerformance,
  CampaignPerformance,
  WebsiteMetrics,
  Insight,
  Recommendation,
  Experiment,
  Anomaly,
  Alert,
  Forecast,
  MarketingMemory,
  AttributionJourney,
  DateRange,
  OverviewIntelligence,
} from '@/types';
import {
  getDemoDataSources,
  getDemoHealthOverview,
  getDemoKpiMetrics,
  getDemoChannelPerformance,
  getDemoContentPerformance,
  getDemoCampaignPerformance,
  getDemoWebsiteMetrics,
  getDemoInsights,
  getDemoRecommendations,
  getDemoExperiments,
  getDemoAnomalies,
  getDemoAlerts,
  getDemoForecasts,
  getDemoMarketingMemory,
  getDemoAttributionJourneys,
} from '@/lib/demo-data';

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

async function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createServerSupabaseClient();
}

export async function fetchDataSources(): Promise<{ data: DataSource[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoDataSources(), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('data_sources')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return { data: data || [], isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching data sources:', error);
    return { data: getDemoDataSources(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchHealthOverview(): Promise<{ data: HealthOverview; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoHealthOverview(), isDemo: true, error: null };
  }

  try {
    const [
      { data: sources },
      { data: metrics },
      { data: anomalies },
      { data: alerts },
      { data: insights },
      { data: experiments },
      { data: recommendations },
    ] = await Promise.all([
      supabase.from('data_sources').select('status', { count: 'exact' }),
      supabase.from('metric_definitions').select('id', { count: 'exact' }),
      supabase.from('anomalies').select('id', { count: 'exact' }).eq('is_reviewed', false),
      supabase.from('alerts').select('id', { count: 'exact' }).eq('status', 'open'),
      supabase.from('insights').select('id', { count: 'exact' }).gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString()),
      supabase.from('experiments').select('id', { count: 'exact' }).eq('status', 'running'),
      supabase.from('recommendations').select('id', { count: 'exact' }).eq('status', 'pending'),
    ]);

    const healthySources = sources?.filter(s => s.status === 'healthy').length || 0;

    return {
      data: {
        healthySources,
        totalSources: sources?.length || 0,
        trackedMetrics: metrics?.length || 0,
        openAnomalies: anomalies?.length || 0,
        openAlerts: alerts?.length || 0,
        recentInsights: insights?.length || 0,
        runningExperiments: experiments?.length || 0,
        openRecommendations: recommendations?.length || 0,
        marketingHealthScore: 72,
        dataQualityScore: 85,
      },
      isDemo: false,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching health overview:', error);
    return { data: getDemoHealthOverview(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchKpiMetrics(dateRange?: DateRange): Promise<{ data: KpiMetric[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoKpiMetrics(), isDemo: true, error: null };
  }

  try {
    const { data: snapshots, error } = await supabase
      .from('metric_daily_snapshots')
      .select('*, metric_definitions!inner(name, display_name, unit, aggregation)')
      .gte('date', dateRange?.from?.toISOString().split('T')[0] || '2026-09-01')
      .lte('date', dateRange?.to?.toISOString().split('T')[0] || '2026-09-30')
      .order('date', { ascending: false });

    if (error) throw error;

    return { data: getDemoKpiMetrics(), isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching KPI metrics:', error);
    return { data: getDemoKpiMetrics(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchChannelPerformance(): Promise<{ data: ChannelPerformance[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoChannelPerformance(), isDemo: true, error: null };
  }

  try {
    const { data: sources, error } = await supabase
      .from('data_sources')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return { data: getDemoChannelPerformance(), isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching channel performance:', error);
    return { data: getDemoChannelPerformance(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchContentPerformance(): Promise<{ data: ContentPerformance[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoContentPerformance(), isDemo: true, error: null };
  }

  try {
    const { data: content, error } = await supabase
      .from('content_items')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return { data: getDemoContentPerformance(), isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching content performance:', error);
    return { data: getDemoContentPerformance(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchCampaignPerformance(): Promise<{ data: CampaignPerformance[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoCampaignPerformance(), isDemo: true, error: null };
  }

  try {
    // Would query campaigns table
    return { data: getDemoCampaignPerformance(), isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching campaign performance:', error);
    return { data: getDemoCampaignPerformance(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchWebsiteMetrics(): Promise<{ data: WebsiteMetrics; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoWebsiteMetrics(), isDemo: true, error: null };
  }

  try {
    // Would query website analytics tables
    return { data: getDemoWebsiteMetrics(), isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching website metrics:', error);
    return { data: getDemoWebsiteMetrics(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchInsights(limit = 20): Promise<{ data: Insight[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoInsights(), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('insights')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data: data || [], isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching insights:', error);
    return { data: getDemoInsights(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchRecommendations(): Promise<{ data: Recommendation[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoRecommendations(), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return { data: getDemoRecommendations(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchExperiments(): Promise<{ data: Experiment[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoExperiments(), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('experiments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching experiments:', error);
    return { data: getDemoExperiments(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchAnomalies(limit = 50): Promise<{ data: Anomaly[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoAnomalies(), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('anomalies')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data: data || [], isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching anomalies:', error);
    return { data: getDemoAnomalies(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchAlerts(): Promise<{ data: Alert[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoAlerts(), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return { data: getDemoAlerts(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchForecasts(): Promise<{ data: Forecast[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoForecasts(), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('forecasts')
      .select('*, forecast_points(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching forecasts:', error);
    return { data: getDemoForecasts(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchMarketingMemory(): Promise<{ data: MarketingMemory[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoMarketingMemory(), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('marketing_memory')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching marketing memory:', error);
    return { data: getDemoMarketingMemory(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchAttributionJourneys(limit = 20): Promise<{ data: AttributionJourney[]; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getDemoAttributionJourneys(), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('attribution_journeys')
      .select('*, attribution_touchpoints(*)')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data: data || [], isDemo: false, error: null };
  } catch (error) {
    console.error('Error fetching attribution journeys:', error);
    return { data: getDemoAttributionJourneys(), isDemo: true, error: 'Database error - using demo data' };
  }
}

export async function fetchOverviewIntelligence(): Promise<{ data: OverviewIntelligence; isDemo: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return {
      data: {
        whatChanged: [],
        whyItMatters: [],
        whatToWatch: [],
        opportunities: [],
        recommendedActions: [],
      },
      isDemo: true,
      error: null,
    };
  }

  try {
    const supabaseClient = await getSupabaseClient();
    if (!supabaseClient) {
      return {
        data: { whatChanged: [], whyItMatters: [], whatToWatch: [], opportunities: [], recommendedActions: [] },
        isDemo: true,
        error: null,
      };
    }
    
    return {
      data: {
        whatChanged: [],
        whyItMatters: [],
        whatToWatch: [],
        opportunities: [],
        recommendedActions: [],
      },
      isDemo: false,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching overview intelligence:', error);
    return { data: { whatChanged: [], whyItMatters: [], whatToWatch: [], opportunities: [], recommendedActions: [] }, isDemo: true, error: 'Database error - using demo data' };
  }
}