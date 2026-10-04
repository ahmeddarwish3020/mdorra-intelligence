export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      data_sources: {
        Row: {
          id: string;
          type: string;
          name: string;
          status: string;
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
        };
        Insert: {
          id?: string;
          type: string;
          name: string;
          status: string;
          health_score?: number;
          last_sync?: string | null;
          last_error?: string | null;
          data_coverage?: number;
          metrics_tracked?: number;
          is_connected?: boolean;
          account_id?: string | null;
          account_name?: string | null;
          scopes?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          name?: string;
          status?: string;
          health_score?: number;
          last_sync?: string | null;
          last_error?: string | null;
          data_coverage?: number;
          metrics_tracked?: number;
          is_connected?: boolean;
          account_id?: string | null;
          account_name?: string | null;
          scopes?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      metric_definitions: {
        Row: {
          id: string;
          source_id: string;
          name: string;
          display_name: string;
          description: string | null;
          unit: string;
          aggregation: string;
          is_primary: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          source_id: string;
          name: string;
          display_name: string;
          description?: string | null;
          unit: string;
          aggregation: string;
          is_primary?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          source_id?: string;
          name?: string;
          display_name?: string;
          description?: string | null;
          unit?: string;
          aggregation?: string;
          is_primary?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      metric_observations: {
        Row: {
          id: string;
          metric_id: string;
          date: string;
          value: number;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          metric_id: string;
          date: string;
          value: number;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          metric_id?: string;
          date?: string;
          value?: number;
          metadata?: Json;
          created_at?: string;
        };
      };
      metric_daily_snapshots: {
        Row: {
          id: string;
          metric_id: string;
          date: string;
          value: number;
          prev_period_value: number | null;
          prev_year_value: number | null;
          change_pct: number | null;
          change_pct_prev_year: number | null;
          trend: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          metric_id: string;
          date: string;
          value: number;
          prev_period_value?: number | null;
          prev_year_value?: number | null;
          change_pct?: number | null;
          change_pct_prev_year?: number | null;
          trend?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          metric_id?: string;
          date?: string;
          value?: number;
          prev_period_value?: number | null;
          prev_year_value?: number | null;
          change_pct?: number | null;
          change_pct_prev_year?: number | null;
          trend?: string;
          created_at?: string;
        };
      };
      content_items: {
        Row: {
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
          metrics: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          source_id: string;
          external_id: string;
          title: string;
          description?: string | null;
          content_type: string;
          platform: string;
          campaign_id?: string | null;
          published_at?: string | null;
          url?: string | null;
          thumbnail_url?: string | null;
          metrics?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          source_id?: string;
          external_id?: string;
          title?: string;
          description?: string | null;
          content_type?: string;
          platform?: string;
          campaign_id?: string | null;
          published_at?: string | null;
          url?: string | null;
          thumbnail_url?: string | null;
          metrics?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      insights: {
        Row: {
          id: string;
          type: string;
          title: string;
          description: string;
          evidence: string;
          confidence: string;
          metric_id: string | null;
          change_pct: number | null;
          context: Json;
          status: string;
          related_recommendation_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          title: string;
          description: string;
          evidence: string;
          confidence: string;
          metric_id?: string | null;
          change_pct?: number | null;
          context?: Json;
          status?: string;
          related_recommendation_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          title?: string;
          description?: string;
          evidence?: string;
          confidence?: string;
          metric_id?: string | null;
          change_pct?: number | null;
          context?: Json;
          status?: string;
          related_recommendation_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      recommendations: {
        Row: {
          id: string;
          title: string;
          description: string;
          why: string;
          evidence: string;
          expected_impact: string;
          priority: string;
          related_insight_id: string | null;
          suggested_experiment_id: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          why: string;
          evidence: string;
          expected_impact: string;
          priority: string;
          related_insight_id?: string | null;
          suggested_experiment_id?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          why?: string;
          evidence?: string;
          expected_impact?: string;
          priority?: string;
          related_insight_id?: string | null;
          suggested_experiment_id?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      experiments: {
        Row: {
          id: string;
          name: string;
          hypothesis: string;
          primary_metric_id: string | null;
          baseline_value: number | null;
          target_value: number | null;
          status: string;
          start_date: string | null;
          end_date: string | null;
          result: string | null;
          learning: string | null;
          recommended_next_action: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          hypothesis: string;
          primary_metric_id?: string | null;
          baseline_value?: number | null;
          target_value?: number | null;
          status?: string;
          start_date?: string | null;
          end_date?: string | null;
          result?: string | null;
          learning?: string | null;
          recommended_next_action?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          hypothesis?: string;
          primary_metric_id?: string | null;
          baseline_value?: number | null;
          target_value?: number | null;
          status?: string;
          start_date?: string | null;
          end_date?: string | null;
          result?: string | null;
          learning?: string | null;
          recommended_next_action?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      experiment_results: {
        Row: {
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
        };
        Insert: {
          id?: string;
          experiment_id: string;
          date: string;
          metric_value: number;
          control_value?: number | null;
          variant_value?: number | null;
          significance?: number | null;
          is_significant?: boolean;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          experiment_id?: string;
          date?: string;
          metric_value?: number;
          control_value?: number | null;
          variant_value?: number | null;
          significance?: number | null;
          is_significant?: boolean;
          notes?: string | null;
          created_at?: string;
        };
      };
      anomalies: {
        Row: {
          id: string;
          metric_id: string;
          date: string;
          expected_value: number;
          actual_value: number;
          pct_difference: number;
          severity: string;
          possible_context: string | null;
          is_reviewed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          metric_id: string;
          date: string;
          expected_value: number;
          actual_value: number;
          pct_difference: number;
          severity: string;
          possible_context?: string | null;
          is_reviewed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          metric_id?: string;
          date?: string;
          expected_value?: number;
          actual_value?: number;
          pct_difference?: number;
          severity?: string;
          possible_context?: string | null;
          is_reviewed?: boolean;
          created_at?: string;
        };
      };
      alerts: {
        Row: {
          id: string;
          severity: string;
          metric_id: string | null;
          title: string;
          message: string;
          related_anomaly_id: string | null;
          possible_action: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          severity: string;
          metric_id?: string | null;
          title: string;
          message: string;
          related_anomaly_id?: string | null;
          possible_action?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          severity?: string;
          metric_id?: string | null;
          title?: string;
          message?: string;
          related_anomaly_id?: string | null;
          possible_action?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      forecasts: {
        Row: {
          id: string;
          metric_id: string;
          horizon_days: number;
          current_value: number;
          forecast_min: number;
          forecast_max: number;
          confidence: string;
          assumptions: string;
          method: string;
          trend: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          metric_id: string;
          horizon_days: number;
          current_value: number;
          forecast_min: number;
          forecast_max: number;
          confidence: string;
          assumptions: string;
          method: string;
          trend: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          metric_id?: string;
          horizon_days?: number;
          current_value?: number;
          forecast_min?: number;
          forecast_max?: number;
          confidence?: string;
          assumptions?: string;
          method?: string;
          trend?: string;
          created_at?: string;
        };
      };
      forecast_points: {
        Row: {
          id: string;
          forecast_id: string;
          date: string;
          predicted_value: number;
          lower_bound: number;
          upper_bound: number;
        };
        Insert: {
          id?: string;
          forecast_id: string;
          date: string;
          predicted_value: number;
          lower_bound: number;
          upper_bound: number;
        };
        Update: {
          id?: string;
          forecast_id?: string;
          date?: string;
          predicted_value?: number;
          lower_bound?: number;
          upper_bound?: number;
        };
      };
      sync_runs: {
        Row: {
          id: string;
          source_id: string;
          status: string;
          records_processed: number;
          records_failed: number;
          started_at: string;
          completed_at: string | null;
          error_message: string | null;
        };
        Insert: {
          id?: string;
          source_id: string;
          status: string;
          records_processed: number;
          records_failed: number;
          started_at: string;
          completed_at?: string | null;
          error_message?: string | null;
        };
        Update: {
          id?: string;
          source_id?: string;
          status?: string;
          records_processed?: number;
          records_failed?: number;
          started_at?: string;
          completed_at?: string | null;
          error_message?: string | null;
        };
      };
      data_quality_checks: {
        Row: {
          id: string;
          source_id: string;
          check_type: string;
          status: string;
          score: number;
          details: Json;
          checked_at: string;
        };
        Insert: {
          id?: string;
          source_id: string;
          check_type: string;
          status: string;
          score: number;
          details?: Json;
          checked_at?: string;
        };
        Update: {
          id?: string;
          source_id?: string;
          check_type?: string;
          status?: string;
          score?: number;
          details?: Json;
          checked_at?: string;
        };
      };
      integration_connections: {
        Row: {
          id: string;
          provider: string;
          is_connected: boolean;
          auth_method: string | null;
          account_id: string | null;
          account_name: string | null;
          account_email: string | null;
          scopes: string[];
          token_expires_at: string | null;
          last_sync: string | null;
          last_error: string | null;
          health: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider: string;
          is_connected?: boolean;
          auth_method?: string | null;
          account_id?: string | null;
          account_name?: string | null;
          account_email?: string | null;
          scopes?: string[];
          token_expires_at?: string | null;
          last_sync?: string | null;
          last_error?: string | null;
          health?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          provider?: string;
          is_connected?: boolean;
          auth_method?: string | null;
          account_id?: string | null;
          account_name?: string | null;
          account_email?: string | null;
          scopes?: string[];
          token_expires_at?: string | null;
          last_sync?: string | null;
          last_error?: string | null;
          health?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      attribution_touchpoints: {
        Row: {
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
        };
        Insert: {
          id?: string;
          journey_id: string;
          source: string;
          medium: string;
          campaign?: string | null;
          content?: string | null;
          term?: string | null;
          timestamp: string;
          position: number;
          is_conversion?: boolean;
          conversion_value?: number | null;
        };
        Update: {
          id?: string;
          journey_id?: string;
          source?: string;
          medium?: string;
          campaign?: string | null;
          content?: string | null;
          term?: string | null;
          timestamp?: string;
          position?: number;
          is_conversion?: boolean;
          conversion_value?: number | null;
        };
      };
      attribution_journeys: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string;
          conversion_id: string | null;
          conversion_value: number | null;
          attribution_model: string;
          confidence: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id: string;
          conversion_id?: string | null;
          conversion_value?: number | null;
          attribution_model: string;
          confidence: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_id?: string;
          conversion_id?: string | null;
          conversion_value?: number | null;
          attribution_model?: string;
          confidence?: number;
          created_at?: string;
        };
      };
      marketing_memory: {
        Row: {
          id: string;
          category: string;
          title: string;
          description: string;
          key_learning: string;
          tags: string[];
          related_experiment_id: string | null;
          related_campaign_id: string | null;
          confidence: string;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          title: string;
          description: string;
          key_learning: string;
          tags?: string[];
          related_experiment_id?: string | null;
          related_campaign_id?: string | null;
          confidence?: string;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          title?: string;
          description?: string;
          key_learning?: string;
          tags?: string[];
          related_experiment_id?: string | null;
          related_campaign_id?: string | null;
          confidence?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: string;
          is_active: boolean;
          invited_at: string;
          joined_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role: string;
          is_active?: boolean;
          invited_at?: string;
          joined_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          is_active?: boolean;
          invited_at?: string;
          joined_at?: string | null;
          created_at?: string;
        };
      };
      ingestion_batches: {
        Row: {
          id: string;
          source_id: string;
          status: string;
          records_total: number;
          records_processed: number;
          records_failed: number;
          started_at: string;
          completed_at: string | null;
          error_message: string | null;
        };
        Insert: {
          id?: string;
          source_id: string;
          status: string;
          records_total: number;
          records_processed: number;
          records_failed: number;
          started_at: string;
          completed_at?: string | null;
          error_message?: string | null;
        };
        Update: {
          id?: string;
          source_id?: string;
          status?: string;
          records_total?: number;
          records_processed?: number;
          records_failed?: number;
          started_at?: string;
          completed_at?: string | null;
          error_message?: string | null;
        };
      };
      raw_events: {
        Row: {
          id: string;
          batch_id: string;
          source_id: string;
          raw_data: Json;
          received_at: string;
        };
        Insert: {
          id?: string;
          batch_id: string;
          source_id: string;
          raw_data: Json;
          received_at?: string;
        };
        Update: {
          id?: string;
          batch_id?: string;
          source_id?: string;
          raw_data?: Json;
          received_at?: string;
        };
      };
      normalized_events: {
        Row: {
          id: string;
          batch_id: string;
          source_id: string;
          event_type: string;
          event_data: Json;
          normalized_at: string;
        };
        Insert: {
          id?: string;
          batch_id: string;
          source_id: string;
          event_type: string;
          event_data: Json;
          normalized_at?: string;
        };
        Update: {
          id?: string;
          batch_id?: string;
          source_id?: string;
          event_type?: string;
          event_data?: Json;
          normalized_at?: string;
        };
      };
      forecast_runs: {
        Row: {
          id: string;
          forecast_id: string;
          status: string;
          model_version: string;
          parameters: Json;
          started_at: string;
          completed_at: string | null;
          error_message: string | null;
        };
        Insert: {
          id?: string;
          forecast_id: string;
          status: string;
          model_version: string;
          parameters?: Json;
          started_at: string;
          completed_at?: string | null;
          error_message?: string | null;
        };
        Update: {
          id?: string;
          forecast_id?: string;
          status?: string;
          model_version?: string;
          parameters?: Json;
          started_at?: string;
          completed_at?: string | null;
          error_message?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      data_source_type: 'website' | 'google_analytics' | 'google_search_console' | 'meta' | 'instagram' | 'tiktok' | 'youtube';
      data_source_status: 'healthy' | 'warning' | 'error' | 'disabled';
      sync_status: 'success' | 'failed' | 'running' | 'pending';
      insight_type: 'attention' | 'opportunity' | 'watch' | 'positive';
      insight_confidence: 'low' | 'moderate' | 'high';
      insight_status: 'new' | 'acknowledged' | 'dismissed' | 'acted_upon';
      experiment_status: 'draft' | 'running' | 'completed' | 'paused';
      recommendation_status: 'pending' | 'in_progress' | 'completed' | 'dismissed';
      alert_severity: 'info' | 'warning' | 'critical';
      alert_status: 'open' | 'acknowledged' | 'resolved';
      anomaly_severity: 'normal' | 'medium' | 'high' | 'critical';
      forecast_confidence: 'low' | 'moderate' | 'high';
      user_role: 'owner' | 'admin' | 'analyst' | 'content' | 'media_buyer' | 'viewer';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}