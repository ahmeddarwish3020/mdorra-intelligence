'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  User,
  Shield,
  Bell,
  Database,
  Palette,
  Globe,
  Key,
  Save,
  Loader2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { AppLayout } from '@/components/layout/AppLayout';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'data', label: 'Data & Privacy', icon: Database },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'integrations', label: 'Integrations', icon: Globe },
  { id: 'api', label: 'API Keys', icon: Key },
];

export function SettingsClient() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert('Settings saved successfully');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="section-header">
          <div>
            <h1 className="section-title">Settings</h1>
            <p className="section-subtitle">Manage your account, preferences, and application configuration</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">DEMO DATA</Badge>
          </div>
        </div>

        <div className="flex gap-6">
          <nav className="w-64 flex-shrink-0" aria-label="Settings navigation">
            <div className="panel-elevated p-4 rounded-md">
              <ul className="space-y-1" role="list">
                {TABS.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-body-sm transition-all duration-fast',
                        activeTab === tab.id
                          ? 'bg-gold/10 text-gold border-l-2 border-gold'
                          : 'text-text-muted hover:text-text hover:bg-surface-elevated'
                      )}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                    >
                      <tab.icon className="h-5 w-5 flex-shrink-0" />
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="flex-1 min-w-0">
            {activeTab === 'profile' && (
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-heading-md">Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full bg-surface-elevated border border-border flex items-center justify-center text-3xl font-editorial text-gold">
                        JD
                      </div>
                    </div>
                    <div>
                      <Button variant="secondary" size="sm">Change Avatar</Button>
                      <p className="text-body-xs text-text-muted mt-1">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label">Full Name</label>
                      <Input defaultValue="John Doe" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="label">Email</label>
                      <Input type="email" defaultValue="john@mdorra.com" placeholder="john@mdorra.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="label">Role</label>
                      <Input defaultValue="Owner" disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="label">Timezone</label>
                      <select className="input" defaultValue="UTC">
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Dubai">Dubai</option>
                        <option value="Asia/Singapore">Singapore</option>
                      </select>
                    </div>
                  </div>
                  <CardFooter>
                    <Button variant="primary" onClick={handleSave} disabled={saving} className="gap-1.5">
                      {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                      Save Changes
                    </Button>
                  </CardFooter>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-heading-md">Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Two-Factor Authentication</p>
                          <p className="text-body-xs text-text-muted">Add an extra layer of security to your account</p>
                        </div>
                        <Badge variant="healthy">Enabled</Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Password</p>
                          <p className="text-body-xs text-text-muted">Last changed 30 days ago</p>
                        </div>
                        <Button variant="secondary" size="sm">Change Password</Button>
                      </div>
                    </div>
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Active Sessions</p>
                          <p className="text-body-xs text-text-muted">Manage your active login sessions</p>
                        </div>
                        <Button variant="secondary" size="sm">View Sessions</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-heading-md">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      { title: 'Anomaly Alerts', description: 'Get notified when unusual patterns are detected in your metrics', enabled: true },
                      { title: 'Insight Notifications', description: 'Receive new insights and opportunities via email', enabled: true },
                      { title: 'Experiment Updates', description: 'Notifications when experiments start, complete, or need attention', enabled: false },
                      { title: 'Weekly Digest', description: 'Weekly summary of marketing performance and key changes', enabled: true },
                      { title: 'Data Quality Alerts', description: 'Alerts for sync failures, schema issues, or data gaps', enabled: true },
                      { title: 'Forecast Updates', description: 'Notifications when forecasts are updated or confidence changes', enabled: false },
                    ].map((item) => (
                      <div key={item.title} className="flex items-center justify-between p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                        <div>
                          <p className="text-body-sm font-medium text-text">{item.title}</p>
                          <p className="text-body-xs text-text-muted">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                          <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'data' && (
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-heading-md">Data & Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Data Retention</p>
                          <p className="text-body-xs text-text-muted">How long to keep raw events and normalized data</p>
                        </div>
                        <select className="input max-w-xs" defaultValue="90">
                          <option value="30">30 days</option>
                          <option value="90">90 days</option>
                          <option value="180">180 days</option>
                          <option value="365">1 year</option>
                          <option value="730">2 years</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Metric Snapshots Retention</p>
                          <p className="text-body-xs text-text-muted">How long to keep daily metric snapshots</p>
                        </div>
                        <select className="input max-w-xs" defaultValue="730">
                          <option value="365">1 year</option>
                          <option value="730">2 years</option>
                          <option value="1095">3 years</option>
                          <option value="1825">5 years</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Anonymize IP Addresses</p>
                          <p className="text-body-xs text-text-muted">Mask last octet of IP addresses in raw events</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>
                    </div>
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Export Personal Data</p>
                          <p className="text-body-xs text-text-muted">Download all data associated with your account</p>
                        </div>
                        <Button variant="secondary" size="sm">Request Export</Button>
                      </div>
                    </div>
                    <div className="p-4 bg-status-error/10 border border-status-error/20 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Delete Account</p>
                          <p className="text-body-xs text-text-muted">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="danger" size="sm">Delete Account</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-heading-md">Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Theme</p>
                          <p className="text-body-xs text-text-muted">Choose your preferred color scheme</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 p-3 rounded-md border-2 border-gold bg-gold/10 text-gold">
                            <span className="text-body-sm font-medium">Dark</span>
                            <p className="text-body-xs text-gold/70">Current</p>
                          </button>
                          <button className="flex-1 p-3 rounded-md border border-border bg-surface-elevated text-text-muted">
                            <span className="text-body-sm font-medium">Light</span>
                            <p className="text-body-xs">Not available</p>
                          </button>
                          <button className="flex-1 p-3 rounded-md border border-border bg-surface-elevated text-text-muted">
                            <span className="text-body-sm font-medium">System</span>
                            <p className="text-body-xs">Not available</p>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Compact Mode</p>
                          <p className="text-body-xs text-text-muted">Reduce spacing for denser information display</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>
                    </div>
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Reduce Motion</p>
                          <p className="text-body-xs text-text-muted">Minimize animations and transitions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'integrations' && (
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-heading-md">Integration Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Auto-sync Enabled</p>
                          <p className="text-body-xs text-text-muted">Automatically sync data from connected sources on schedule</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>
                    </div>
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Sync Frequency</p>
                          <p className="text-body-xs text-text-muted">How often to run scheduled syncs</p>
                        </div>
                        <select className="input max-w-xs" defaultValue="hourly">
                          <option value="15min">Every 15 minutes</option>
                          <option value="hourly">Hourly</option>
                          <option value="6hour">Every 6 hours</option>
                          <option value="daily">Daily</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Sync on App Open</p>
                          <p className="text-body-xs text-text-muted">Trigger manual sync when opening the application</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>
                    </div>
                    <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body-sm font-medium text-text">Failure Notifications</p>
                          <p className="text-body-xs text-text-muted">Notify when sync fails after all retries</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'api' && (
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-heading-md">API Keys</CardTitle>
                    <Button variant="primary" size="sm" className="gap-1.5">
                      <Save className="h-3.5 w-3.5" />
                      Generate Key
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-status-warning/10 border border-status-warning/20 rounded-md">
                    <p className="text-body-sm text-text-muted">
                      API keys provide programmatic access to your MDORRA Intelligence data. Keep them secure and never share them publicly.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Production API Key', prefix: 'mk_live_', created: '2026-01-15', lastUsed: '2 hours ago', scopes: ['read:metrics', 'read:insights', 'read:experiments'] },
                      { name: 'Development Key', prefix: 'mk_test_', created: '2026-03-22', lastUsed: '3 days ago', scopes: ['read:metrics'] },
                    ].map((key) => (
                      <div key={key.name} className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-body-sm font-medium text-text">{key.name}</p>
                            <p className="text-body-xs text-text-muted font-mono">{key.prefix}••••••••••••••••</p>
                          </div>
                          <div className="flex items-center gap-3 text-body-xs text-text-muted">
                            <span>Created {key.created}</span>
                            <span>Last used {key.lastUsed}</span>
                            <div className="flex gap-1">
                              {key.scopes.map((scope) => (
                                <Badge key={scope} variant="gold" className="text-caption bg-gold/5 border-gold/20 text-gold">{scope}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-surface-elevated/50 rounded-md border border-border/50">
                    <p className="text-body-sm font-medium text-text mb-2">Create New API Key</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="label">Key Name</label>
                        <Input placeholder="e.g., CI/CD Pipeline" />
                      </div>
                      <div className="space-y-2">
                        <label className="label">Scopes</label>
                        <div className="flex flex-wrap gap-2">
                          {['read:metrics', 'read:insights', 'read:experiments', 'write:experiments', 'admin:sources'].map((scope) => (
                            <label key={scope} className="inline-flex items-center gap-1.5 cursor-pointer">
                              <input type="checkbox" className="rounded border-border text-gold focus:ring-gold" />
                              <span className="text-body-xs text-text-muted">{scope}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="label">Expires In</label>
                        <select className="input">
                          <option value="90">90 days</option>
                          <option value="180">180 days</option>
                          <option value="365">1 year</option>
                          <option value="never">Never</option>
                        </select>
                      </div>
                    </div>
                    <Button variant="primary" className="gap-1.5">
                      <Key className="h-3.5 w-3.5" />
                      Generate Key
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
