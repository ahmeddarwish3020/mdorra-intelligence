'use client';

import { Suspense } from 'react';
import { LoginForm } from './LoginForm';
import { Card, CardContent } from '@/components/ui/Card';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card variant="elevated">
            <CardContent className="p-8 text-center">
              <div className="animate-pulse h-8 w-32 bg-surface-elevated rounded mx-auto mb-4"></div>
              <div className="animate-pulse h-4 w-48 bg-surface-elevated rounded mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}