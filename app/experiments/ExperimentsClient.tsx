'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatNumber, formatRelativeTime, formatDate } from '@/lib/utils';
import {
  FlaskConical,
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  ExternalLink,
  Edit,
  BarChart2,
  Lightbulb,
  FileText,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { KpiCard, KpiGrid } from '@/components/ui/KpiCard';
import { AppLayout } from '@/components/layout/AppLayout';
import { getDemoExperiments } from '@/lib/demo-data';
import type { Experiment, ExperimentStatus } from '@/types';

const STATUS_CONFIG = {
  draft: { label: 'Draft', variant: 'disabled' as const, icon: Clock },
  running: { label: 'Running', variant: 'healthy' as const, icon: Play },
  completed: { label: 'Completed', variant: 'healthy' as const, icon: CheckCircle },
  paused: { label: 'Paused', variant: 'warning' as const, icon: Pause },
};

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const statusConfig = STATUS_CONFIG[experiment.status];

  return (
    <Card variant="elevated" className="hover:border-gold/30 hover:shadow-elevated transition-all duration-normal">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={statusConfig.variant} className="gap-1">
                <statusConfig.icon className="h-3 w-3" />
                {statusConfig.label}
              </Badge>
            </div>
            <CardTitle className="text-heading-sm truncate">{experiment.name}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="p-3 bg-surface-elevated/50 rounded-md">
          <p className="text-body-sm text-text-muted mb-1">Hypothesis</p>
          <p className="text-body text-text">{experiment.hypothesis}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-0.5">
            <p className="text-body-xs text-text-muted">Start Date</p>
            <p className="text-body-sm font-mono text-text">{experiment.start_date ? formatDate(experiment.start_date) : 'Not started'}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-body-xs text-text-muted">End Date</p>
            <p className="text-body-sm font-mono text-text">{experiment.end_date ? formatDate(experiment.end_date) : 'Not set'}</p>
          </div>
        </div>

        {experiment.baseline_value !== null && experiment.target_value !== null && (
          <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <p className="text-body-xs text-text-muted">Progress to Target</p>
              <p className="text-body-xs font-mono text-text">
                {experiment.baseline_value} → {experiment.target_value}
              </p>
            </div>
            <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-gold"
                style={{
                  width: `${Math.min(100, Math.max(0, ((experiment.baseline_value || 0) / (experiment.target_value || 1)) * 100))}%`,
                }}
              />
            </div>
          </div>
        )}

        {experiment.result && (
          <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
            <p className="text-body-xs text-text-muted mb-1">Result</p>
            <p className="text-body text-text">{experiment.result}</p>
          </div>
        )}

        {experiment.learning && (
          <div className="p-3 bg-gold/5 border border-gold/20 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="h-4 w-4 text-gold" />
              <p className="text-body-xs font-medium text-gold">Learning</p>
            </div>
            <p className="text-body-sm text-text">{experiment.learning}</p>
          </div>
        )}

        {experiment.recommended_next_action && (
          <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-gold" />
              <p className="text-body-xs font-medium text-text-muted">Recommended Next Action</p>
            </div>
            <p className="text-body-sm text-text">{experiment.recommended_next_action}</p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-2 w-full">
          <Link href={`/experiments/${experiment.id}`} className="btn btn-ghost btn-sm gap-1.5 justify-center flex-1">
            <ExternalLink className="h-3.5 w-3.5" />
            View Details
          </Link>
          {experiment.status === 'draft' && (
            <Button variant="primary" size="sm" className="flex-1 gap-1.5">
              <Play className="h-3.5 w-3.5" />
              Start
            </Button>
          )}
          {experiment.status === 'running' && (
            <Button variant="secondary" size="sm" className="flex-1 gap-1.5">
              <Pause className="h-3.5 w-3.5" />
              Pause
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export function ExperimentsClient() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      setExperiments(getDemoExperiments());
      setIsLoading(false);
    };
    loadData();
  }, []);

  const runningExperiments = experiments.filter(e => e.status === 'running');
  const completedExperiments = experiments.filter(e => e.status === 'completed');
  const draftExperiments = experiments.filter(e => e.status === 'draft');

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6 animate-pulse">
          <div className="section-header">
            <div className="h-8 w-48 bg-surface-elevated rounded" />
          </div>
          <KpiGrid metrics={Array(4).fill({})} />
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
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
            <h1 className="section-title">Experiments</h1>
            <p className="section-subtitle">Design, run, and learn from marketing experiments — build institutional knowledge</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">DEMO DATA</Badge>
            <Button variant="primary" size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New Experiment
            </Button>
          </div>
        </div>

        <KpiGrid
          metrics={[
            { id: 'exp-total', label: 'Total Experiments', value: experiments.length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'exp-running', label: 'Running', value: runningExperiments.length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'exp-completed', label: 'Completed', value: completedExperiments.length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
            { id: 'exp-draft', label: 'Draft', value: draftExperiments.length, change: null, changeLabel: '', trend: 'stable', format: 'number', precision: 0, status: 'healthy', isDemo: true },
          ]}
          columns={4}
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {experiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-gold" />
                <CardTitle className="text-heading-md">Experiment Framework</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-text">Hypothesis-Driven</p>
                    <p className="text-body-xs text-text-muted">Every experiment starts with a clear, falsifiable hypothesis</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <BarChart2 className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-text">Primary Metric Focus</p>
                    <p className="text-body-xs text-text-muted">One primary metric per experiment to avoid p-hacking</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-text">Documented Learnings</p>
                    <p className="text-body-xs text-text-muted">Results, insights, and next actions stored in Marketing Memory</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-text">Statistical Rigor</p>
                    <p className="text-body-xs text-text-muted">Pre-defined sample sizes, significance thresholds, and duration</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gold" />
                <CardTitle className="text-heading-md">Recent Learnings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="gold" className="text-caption">VIDEO FORMAT</Badge>
                </div>
                <p className="text-body-sm font-medium text-text mb-1">Short-form Video Outperforms Long-form</p>
                <p className="text-body-xs text-text-muted">60-90 second customer story videos achieved 3.1% conversion vs 1.8% for 3-5 minute deep-dive videos.</p>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="gold" className="text-caption">COMPARISON PAGES</Badge>
                </div>
                <p className="text-body-sm font-medium text-text mb-1">Competitive Displacement Campaign Learnings</p>
                <p className="text-body-xs text-text-muted">Direct comparison pages ("MDORRA vs Competitor") converted at 2.3% vs 0.8% for generic product pages.</p>
              </div>
              <div className="p-3 bg-surface-elevated/50 rounded-md border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="warning" className="text-caption">TIKTOK</Badge>
                </div>
                <p className="text-body-sm font-medium text-text mb-1">Paused TikTok Investment</p>
                <p className="text-body-xs text-text-muted">After 90-day test: $12K spend, 2 leads, 0 qualified. CPL $6,000 vs $735 website. Audience mismatch for B2B intelligence.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-heading-md">Experiment Template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label">Experiment Name</label>
                <Input placeholder="e.g., Homepage Hero A/B Test" />
              </div>
              <div className="space-y-2">
                <label className="label">Primary Metric</label>
                <select className="input">
                  <option>Conversion Rate</option>
                  <option>Click-Through Rate</option>
                  <option>Form Completion Rate</option>
                  <option>Qualified Lead Rate</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="label">Hypothesis</label>
              <textarea className="input min-h-[100px] resize-y" placeholder="We believe that [change] will cause [effect] because [reasoning]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="label">Baseline Value</label>
                <Input type="number" placeholder="0.53" />
              </div>
              <div className="space-y-2">
                <label className="label">Target Value</label>
                <Input type="number" placeholder="0.65" />
              </div>
              <div className="space-y-2">
                <label className="label">Minimum Detectable Effect</label>
                <Input type="number" placeholder="15%" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label">Start Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="label">End Date</label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="secondary">Save as Draft</Button>
              <Button variant="primary" className="gap-1.5">
                <Play className="h-3.5 w-3.5" />
                Launch Experiment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
