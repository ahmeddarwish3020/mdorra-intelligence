'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import { useRouter, useSearchParams } from 'next/navigation';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/overview';

  const supabase = createBrowserSupabaseClient();
  const isSupabaseConfigured = !!supabase;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      return;
    }

    setError('');
    setIsLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-editorial text-display-md text-text mb-2">MDORRA</h1>
            <p className="text-body text-text-muted">{'// INTELLIGENCE'}</p>
            <p className="text-body-sm text-text-subtle mt-4">Marketing Analytics & Intelligence Platform</p>
          </div>

          <Card variant="elevated">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-gold/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-gold" />
              </div>
              <CardTitle className="text-heading-lg">Supabase Not Configured</CardTitle>
              <p className="text-body-sm text-text-muted mt-1">Please configure Supabase credentials to enable authentication</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="p-3 bg-status-warning/10 border border-status-warning/20 rounded-md">
                <div className="flex items-center gap-2 text-body-sm text-status-warning">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>Authentication requires Supabase configuration</span>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <div className="p-3 bg-surface-elevated rounded-md font-mono text-body-xs text-text-muted">
                  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
                </div>
                <div className="p-3 bg-surface-elevated rounded-md font-mono text-body-xs text-text-muted">
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
                </div>
              </div>

              <p className="text-body-xs text-text-subtle">
                Add these to your <code className="font-mono">.env.local</code> file
              </p>
            </CardContent>

            <CardFooter>
              <p className="text-body-xs text-text-muted text-center w-full">
                MDORRA // INTELLIGENCE — DATA → INSIGHT → ACTION
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-editorial text-display-md text-text mb-2">MDORRA</h1>
          <p className="text-body text-text-muted">{'// INTELLIGENCE'}</p>
          <p className="text-body-sm text-text-subtle mt-4">Marketing Analytics & Intelligence Platform</p>
        </div>

        <Card variant="elevated">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-heading-lg">Sign In</CardTitle>
            <p className="text-body-sm text-text-muted mt-1">Access your marketing intelligence dashboard</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-status-error/10 border border-status-error/20 rounded-md flex items-center gap-2 text-body-sm text-status-error">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="pl-10"
                    disabled={isLoading}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    disabled={isLoading}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-text"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border text-gold focus:ring-gold" />
                  <span className="text-body-sm text-text-muted">Remember me</span>
                </label>
                <a href="#" className="text-body-sm text-gold hover:underline">Forgot password?</a>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <p className="text-body-xs text-text-muted text-center w-full">
              By signing in, you agree to our{' '}
              <a href="#" className="text-gold hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-gold hover:underline">Privacy Policy</a>
            </p>
          </CardFooter>
        </Card>

        <div className="text-center mt-6">
          <p className="text-body-xs text-text-subtle">
            MDORRA // INTELLIGENCE — DATA → INSIGHT → ACTION
          </p>
        </div>
      </div>
    </div>
  );
}