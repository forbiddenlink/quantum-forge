'use client';

import { useState } from 'react';
import { useThemeStore } from '@/store/theme-store';

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    taskReminders: true,
    projectUpdates: true,
    teamMentions: true,
    weeklyDigest: false,
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    workingHours: '9:00 AM - 5:00 PM',
  });

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="heading-1 mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      {/* Appearance */}
      <section className="glass-panel rounded-[28px] p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Appearance</h2>
          <p className="caption text-muted-foreground">Customize how the app looks and feels</p>
        </div>

        <div className="space-y-3">
          <label className="caption font-medium">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border-2 transition-all animate-smooth ${
                theme === 'light'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              aria-label="Light theme"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border-2 border-neutral-200"></div>
                <div className="text-left">
                  <div className="font-medium">Light</div>
                  <div className="caption text-muted-foreground">Clean & bright</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border-2 transition-all animate-smooth ${
                theme === 'dark'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              aria-label="Dark theme"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border-2 border-neutral-700"></div>
                <div className="text-left">
                  <div className="font-medium">Dark</div>
                  <div className="caption text-muted-foreground">Easy on eyes</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setTheme('system')}
              className={`p-4 rounded-lg border-2 transition-all animate-smooth ${
                theme === 'system'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              aria-label="System theme"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white to-neutral-900 border-2 border-neutral-400"></div>
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
      <section className="glass-panel rounded-[28px] p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Notifications</h2>
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
          <div className="border-t border-border my-4"></div>
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
      <section className="glass-panel rounded-[28px] p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Preferences</h2>
          <p className="caption text-muted-foreground">Regional and display settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="caption font-medium">Language</label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Language selection"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="caption font-medium">Timezone</label>
            <select
              value={preferences.timezone}
              onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Timezone selection"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="caption font-medium">Date Format</label>
            <select
              value={preferences.dateFormat}
              onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Date format selection"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="caption font-medium">Working Hours</label>
            <select
              value={preferences.workingHours}
              onChange={(e) => setPreferences({ ...preferences, workingHours: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Working hours selection"
            >
              <option value="9:00 AM - 5:00 PM">9:00 AM - 5:00 PM</option>
              <option value="8:00 AM - 4:00 PM">8:00 AM - 4:00 PM</option>
              <option value="10:00 AM - 6:00 PM">10:00 AM - 6:00 PM</option>
              <option value="7:00 AM - 3:00 PM">7:00 AM - 3:00 PM</option>
            </select>
          </div>
        </div>
      </section>

      {/* Account */}
      <section className="glass-panel rounded-[28px] p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Account</h2>
          <p className="caption text-muted-foreground">Manage your account security and data</p>
        </div>

        <div className="space-y-3">
          <button className="w-full px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg text-left flex items-center justify-between transition-colors animate-smooth">
            <div>
              <div className="font-medium">Change Password</div>
              <div className="caption text-muted-foreground">Update your account password</div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg text-left flex items-center justify-between transition-colors animate-smooth">
            <div>
              <div className="font-medium">Export Data</div>
              <div className="caption text-muted-foreground">Download a copy of your information</div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          <button className="w-full px-4 py-3 bg-accent-critical/10 hover:bg-accent-critical/20 text-accent-critical rounded-lg text-left flex items-center justify-between transition-colors animate-smooth">
            <div>
              <div className="font-medium">Delete Account</div>
              <div className="caption">Permanently remove your account and data</div>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </button>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-3 bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors animate-smooth">
          Cancel
        </button>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors animate-smooth">
          Save Changes
        </button>
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
        className={`relative w-12 h-6 rounded-full transition-colors animate-smooth ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform animate-smooth ${
            checked ? 'left-7' : 'left-1'
          }`}
        ></div>
      </button>
    </div>
  );
}
