'use client';

import { useState, useEffect, useCallback } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Settings {
  language: string;
  timezone: string;
}

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  // Notification settings (client-side only, no database fields)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    taskReminders: true,
    projectUpdates: true,
    teamMentions: true,
    weeklyDigest: false,
  });

  // Persisted preferences (fetched from and saved to database)
  const [preferences, setPreferences] = useState<Settings>({
    language: 'en',
    timezone: 'America/Los_Angeles',
  });

  // Track initial values to detect changes
  const [initialPreferences, setInitialPreferences] = useState<Settings>({
    language: 'en',
    timezone: 'America/Los_Angeles',
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Check if there are unsaved changes
  const hasChanges =
    preferences.language !== initialPreferences.language ||
    preferences.timezone !== initialPreferences.timezone;

  // Fetch settings on mount
  const fetchSettings = useCallback(async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        const settingsData = {
          language: data.language || 'en',
          timezone: data.timezone || 'America/Los_Angeles',
        };
        setPreferences(settingsData);
        setInitialPreferences(settingsData);
        // Theme is already handled by Zustand, but sync if needed
        if (data.theme && data.theme !== theme) {
          setTheme(data.theme);
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  }, [theme, setTheme]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme,
          language: preferences.language,
          timezone: preferences.timezone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save settings');
      }

      const data = await response.json();
      const savedSettings = {
        language: data.language,
        timezone: data.timezone,
      };
      setInitialPreferences(savedSettings);
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel changes
  const handleCancel = () => {
    setPreferences(initialPreferences);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl space-y-8 p-8">
        <div>
          <h1 className="heading-1 mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="heading-1 mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      {/* Appearance */}
      <section className="glass-panel space-y-4 rounded-[28px] p-6">
        <div>
          <h2 className="mb-1 text-lg font-semibold">Appearance</h2>
          <p className="caption text-muted-foreground">Customize how the app looks and feels</p>
        </div>

        <div className="space-y-3">
          <label className="caption font-medium">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`animate-smooth rounded-lg border-2 p-4 transition-all ${
                theme === 'light'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              aria-label="Light theme"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg border-2 border-neutral-200 bg-white"></div>
                <div className="text-left">
                  <div className="font-medium">Light</div>
                  <div className="caption text-muted-foreground">Clean & bright</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`animate-smooth rounded-lg border-2 p-4 transition-all ${
                theme === 'dark'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              aria-label="Dark theme"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg border-2 border-neutral-700 bg-neutral-900"></div>
                <div className="text-left">
                  <div className="font-medium">Dark</div>
                  <div className="caption text-muted-foreground">Easy on eyes</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setTheme('system')}
              className={`animate-smooth rounded-lg border-2 p-4 transition-all ${
                theme === 'system'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              aria-label="System theme"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg border-2 border-neutral-400 bg-gradient-to-br from-white to-neutral-900"></div>
                <div className="text-left">
                  <div className="font-medium">System</div>
                  <div className="caption text-muted-foreground">Auto adjust</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="glass-panel space-y-4 rounded-[28px] p-6">
        <div>
          <h2 className="mb-1 text-lg font-semibold">Notifications</h2>
          <p className="caption text-muted-foreground">Choose what updates you want to receive</p>
        </div>

        <div className="space-y-4">
          <ToggleRow
            label="Email Notifications"
            description="Receive updates via email"
            checked={notifications.email}
            onChange={(checked) => setNotifications({ ...notifications, email: checked })}
          />
          <ToggleRow
            label="Push Notifications"
            description="Get instant alerts in your browser"
            checked={notifications.push}
            onChange={(checked) => setNotifications({ ...notifications, push: checked })}
          />
          <div className="my-4 border-t border-border"></div>
          <ToggleRow
            label="Task Reminders"
            description="Notify me about upcoming deadlines"
            checked={notifications.taskReminders}
            onChange={(checked) => setNotifications({ ...notifications, taskReminders: checked })}
          />
          <ToggleRow
            label="Project Updates"
            description="Get notified when projects change status"
            checked={notifications.projectUpdates}
            onChange={(checked) => setNotifications({ ...notifications, projectUpdates: checked })}
          />
          <ToggleRow
            label="Team Mentions"
            description="Alert me when someone @mentions me"
            checked={notifications.teamMentions}
            onChange={(checked) => setNotifications({ ...notifications, teamMentions: checked })}
          />
          <ToggleRow
            label="Weekly Digest"
            description="Summary of your week every Monday"
            checked={notifications.weeklyDigest}
            onChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
          />
        </div>
      </section>

      {/* Preferences */}
      <section className="glass-panel space-y-4 rounded-[28px] p-6">
        <div>
          <h2 className="mb-1 text-lg font-semibold">Preferences</h2>
          <p className="caption text-muted-foreground">Regional and display settings</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="caption font-medium">Language</label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="w-full rounded-lg border border-border bg-muted px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Language selection"
            >
              <option value="en">English (US)</option>
              <option value="es">Espanol</option>
              <option value="fr">Francais</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="caption font-medium">Timezone</label>
            <select
              value={preferences.timezone}
              onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
              className="w-full rounded-lg border border-border bg-muted px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Timezone selection"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </section>

      {/* Account */}
      <section className="glass-panel space-y-4 rounded-[28px] p-6">
        <div>
          <h2 className="mb-1 text-lg font-semibold">Account</h2>
          <p className="caption text-muted-foreground">Manage your account security and data</p>
        </div>

        <div className="space-y-3">
          <button className="animate-smooth flex w-full items-center justify-between rounded-lg bg-muted px-4 py-3 text-left transition-colors hover:bg-muted/80">
            <div>
              <div className="font-medium">Change Password</div>
              <div className="caption text-muted-foreground">Update your account password</div>
            </div>
            <svg className="size-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="animate-smooth flex w-full items-center justify-between rounded-lg bg-muted px-4 py-3 text-left transition-colors hover:bg-muted/80">
            <div>
              <div className="font-medium">Export Data</div>
              <div className="caption text-muted-foreground">Download a copy of your information</div>
            </div>
            <svg className="size-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          <button className="bg-accent-critical/10 hover:bg-accent-critical/20 animate-smooth flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-accent-critical transition-colors">
            <div>
              <div className="font-medium">Delete Account</div>
              <div className="caption">Permanently remove your account and data</div>
            </div>
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </button>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button
          variant="ghost"
          onClick={handleCancel}
          disabled={!hasChanges || isSaving}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          loading={isSaving}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="font-medium">{label}</div>
        <div className="caption text-muted-foreground">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`animate-smooth relative h-6 w-12 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <div
          className={`animate-smooth absolute top-1 size-4 rounded-full bg-white transition-transform ${
            checked ? 'left-7' : 'left-1'
          }`}
        ></div>
      </button>
    </div>
  );
}
