'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Target,
  Globe,
  FlaskConical,
  Database,
  Plug2,
  Settings,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { name: 'Overview', href: '/overview', icon: LayoutDashboard },
  { name: 'Channels', href: '/channels', icon: BarChart2 },
  { name: 'Content', href: '/content', icon: FileText },
  { name: 'Campaigns', href: '/campaigns', icon: Target },
  { name: 'Website', href: '/website', icon: Globe },
  { name: 'Experiments', href: '/experiments', icon: FlaskConical },
  { name: 'Data Quality', href: '/data-quality', icon: Database },
  { name: 'Integrations', href: '/integrations', icon: Plug2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden btn-ghost btn-sm"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        aria-controls="mobile-navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-sticky w-64 bg-background border-r border-border transition-transform duration-normal lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        id="mobile-navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-border lg:hidden">
            <span className="font-editorial text-heading-sm text-text">Navigation</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="btn-ghost btn-sm"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1" role="navigation" aria-label="Main">
            <ul className="space-y-0.5" role="list">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'nav-link',
                        isActive && 'nav-link-active'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <span>{item.name}</span>
                      {isActive && <ChevronRight className="h-4 w-4 ml-auto text-gold" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-border lg:hidden">
            <p className="text-caption text-text-subtle">
              MDORRA // INTELLIGENCE
            </p>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-overlay bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}