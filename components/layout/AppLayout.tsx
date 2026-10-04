'use client';

import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Header } from './Header';
import { AuthProvider } from '@/components/auth/AuthProvider';

interface AppLayoutProps {
  children: ReactNode;
  dateRange?: string;
  dataStatus?: 'healthy' | 'warning' | 'error' | 'partial';
  onDateRangeChange?: () => void;
}

export function AppLayout({ children, dateRange = 'Last 30 days', dataStatus = 'healthy', onDateRangeChange }: AppLayoutProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background font-ui">
        <Navigation />
        <div className="lg:pl-64">
          <Header
            dateRange={dateRange}
            dataStatus={dataStatus}
            onDateRangeChange={onDateRangeChange || (() => {})}
            isDemoMode={false}
          />
          <main className="container-app py-6" id="main-content" role="main">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}