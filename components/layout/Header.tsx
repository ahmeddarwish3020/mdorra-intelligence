'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronDown, Bell, User, LogOut, HelpCircle, Shield, Database, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DropdownMenu, DropdownItem, DropdownDivider, DropdownLabel } from '@/components/ui/Dropdown';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/components/auth/AuthProvider';

interface HeaderProps {
  dateRange: string;
  dataStatus: 'healthy' | 'warning' | 'error' | 'partial';
  onDateRangeChange: () => void;
  isDemoMode: boolean;
}

export function Header({ dateRange, dataStatus, onDateRangeChange, isDemoMode }: HeaderProps) {
  const { user, role, signOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const userMenuRef = useRef<HTMLButtonElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  const statusColors = {
    healthy: 'text-status-healthy',
    warning: 'text-status-warning',
    error: 'text-status-error',
    partial: 'text-status-warning',
  };

  const statusLabels = {
    healthy: 'All Systems Operational',
    warning: 'Degraded Performance',
    error: 'System Issues Detected',
    partial: 'Partial Data',
  };

  return (
    <header className="sticky top-0 z-sticky h-16 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-app h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <Link href="/overview" className="flex items-center gap-2" aria-label="MDORRA Intelligence Home">
            <span className="font-editorial text-heading-md text-text">MDORRA</span>
            <span className="hidden sm:inline-block w-[1px] h-6 bg-border mx-1" />
            <span className="font-ui text-body-sm text-text-muted tracking-wide uppercase">INTELLIGENCE</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface-elevated rounded-md border border-border">
            <span className="text-body-sm text-text-muted">Last 30 days</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated rounded-md border border-border">
            <span className="h-2 w-2 rounded-full bg-status-healthy" />
            <span className="text-body-xs text-text-muted">Live Data</span>
          </div>

          <DropdownMenu
            trigger={<Button variant="ghost" size="sm" className="relative"><span className="relative"><Bell className="h-5 w-5" /><span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-status-error text-[10px] font-medium text-background flex items-center justify-center">3</span></span></Button>}
            align="right"
          >
            <DropdownLabel>Notifications</DropdownLabel>
            <DropdownItem onClick={() => window.location.href = '/data-quality'}>
              <div className="flex flex-col gap-1">
                <span className="text-body-sm font-medium text-text">Form validation error</span>
                <span className="text-body-xs text-text-muted">Mobile Safari issue on /demo page</span>
                <span className="text-caption text-text-subtle">2 hours ago</span>
              </div>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem>
              <div className="flex flex-col gap-1">
                <span className="text-body-sm font-medium text-text">Tracking gap detected</span>
                <span className="text-body-xs text-text-muted">Engagement events missing for 4h</span>
                <span className="text-caption text-text-subtle">4 hours ago</span>
              </div>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem>
              <div className="flex flex-col gap-1">
                <span className="text-body-sm font-medium text-text">Traffic spike</span>
                <span className="text-body-xs text-text-muted">+63% sessions from LinkedIn referral</span>
                <span className="text-caption text-text-subtle">1 day ago</span>
              </div>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => window.location.href = '/data-quality'}>
              View all alerts
            </DropdownItem>
          </DropdownMenu>

          <DropdownMenu
            trigger={
              <Button variant="ghost" size="sm" ref={userMenuRef} className="gap-2">
                <Avatar size="sm" fallback={user?.email?.[0]?.toUpperCase() ?? 'U'} />
                <span className="hidden sm:block text-body-sm text-text">{user?.email ?? 'User'}</span>
                <span className="hidden sm:block text-body-xs text-text-muted">{role}</span>
              </Button>
            }
            align="right"
          >
            <DropdownLabel>Account</DropdownLabel>
            <DropdownItem onClick={() => window.location.href = '/settings'}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownItem>
            <DropdownDivider />
            <DropdownLabel>Help</DropdownLabel>
            <DropdownItem onClick={() => window.location.href = '/docs'}>
              <HelpCircle className="h-4 w-4 mr-2" />
              Documentation
            </DropdownItem>
            <DropdownItem onClick={() => window.location.href = '/api/health'}>
              <Database className="h-4 w-4 mr-2" />
              System Status
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem destructive onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}