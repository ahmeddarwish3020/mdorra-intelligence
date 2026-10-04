import { NextResponse } from 'next/server';
import {
  fetchHealthOverview,
  fetchKpiMetrics,
  fetchInsights,
  fetchRecommendations,
  fetchExperiments,
  fetchForecasts,
  fetchChannelPerformance,
  fetchOverviewIntelligence,
} from '@/services/data';

export async function GET() {
  try {
    const [
      healthOverview,
      kpiMetrics,
      insights,
      recommendations,
      experiments,
      forecasts,
      channels,
      intelligence,
    ] = await Promise.all([
      fetchHealthOverview(),
      fetchKpiMetrics(),
      fetchInsights(10),
      fetchRecommendations(),
      fetchExperiments(),
      fetchForecasts(),
      fetchChannelPerformance(),
      fetchOverviewIntelligence(),
    ]);

    return NextResponse.json({
      healthOverview: healthOverview.data,
      healthOverviewIsDemo: healthOverview.isDemo,
      healthOverviewError: healthOverview.error,
      kpiMetrics: kpiMetrics.data,
      kpiMetricsIsDemo: kpiMetrics.isDemo,
      kpiMetricsError: kpiMetrics.error,
      insights: insights.data,
      insightsIsDemo: insights.isDemo,
      insightsError: insights.error,
      recommendations: recommendations.data,
      recommendationsIsDemo: recommendations.isDemo,
      recommendationsError: recommendations.error,
      experiments: experiments.data,
      experimentsIsDemo: experiments.isDemo,
      experimentsError: experiments.error,
      forecasts: forecasts.data,
      forecastsIsDemo: forecasts.isDemo,
      forecastsError: forecasts.error,
      channels: channels.data,
      channelsIsDemo: channels.isDemo,
      channelsError: channels.error,
      intelligence: intelligence.data,
      intelligenceIsDemo: intelligence.isDemo,
      intelligenceError: intelligence.error,
    });
  } catch (error) {
    console.error('Error fetching overview data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch overview data' },
      { status: 500 }
    );
  }
}