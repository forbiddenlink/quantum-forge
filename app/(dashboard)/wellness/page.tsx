'use client';

import { useState, useEffect, useCallback } from 'react';

// Mock data for the wellness page
const WEEKLY_FOCUS_DATA = [
  { day: 'Mon', minutes: 145, label: '2h 25m' },
  { day: 'Tue', minutes: 180, label: '3h 0m' },
  { day: 'Wed', minutes: 165, label: '2h 45m' },
  { day: 'Thu', minutes: 210, label: '3h 30m' },
  { day: 'Fri', minutes: 195, label: '3h 15m' },
  { day: 'Sat', minutes: 90, label: '1h 30m' },
  { day: 'Sun', minutes: 120, label: '2h 0m' },
];

interface WellnessTip {
  title: string;
  description: string;
  icon: 'pause' | 'water' | 'eye' | 'stretch' | 'breath';
}

const WELLNESS_TIPS: WellnessTip[] = [
  {
    title: 'Take micro-breaks',
    description: 'Short 2-minute breaks every 25 minutes can boost focus by 30%.',
    icon: 'pause',
  },
  {
    title: 'Stay hydrated',
    description: 'Drinking water regularly improves concentration and reduces fatigue.',
    icon: 'water',
  },
  {
    title: 'Practice the 20-20-20 rule',
    description: 'Every 20 minutes, look at something 20 feet away for 20 seconds.',
    icon: 'eye',
  },
  {
    title: 'Stretch regularly',
    description: 'Simple stretches reduce tension and improve blood circulation.',
    icon: 'stretch',
  },
  {
    title: 'Deep breathing',
    description: 'A few deep breaths can reset your nervous system and reduce stress.',
    icon: 'breath',
  },
];

// Progress Ring Component
function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = 'var(--accent-success)'
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-muted/30"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="animate-smooth"
        style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
      />
    </svg>
  );
}

// Format time from seconds to display string
function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Format minutes to hours and minutes
function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  return `${minutes}m`;
}

export default function WellnessPage() {
  // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [sessionCount, setSessionCount] = useState(3); // Sessions completed today

  // Wellness metrics (mock data)
  const [focusScore] = useState(84);
  const [weeklyStreak] = useState(5);
  const [breaksTaken] = useState(7);
  const [todayFocusMinutes] = useState(165); // 2h 45m

  // Break reminder state
  const [lastBreakTime, setLastBreakTime] = useState<Date>(new Date(Date.now() - 1800000)); // 30 mins ago
  const [nextBreakMinutes, setNextBreakMinutes] = useState(25);

  // Current tip index
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Update next break time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const minutesSinceBreak = Math.floor((now.getTime() - lastBreakTime.getTime()) / 60000);
      const remaining = Math.max(0, 25 - minutesSinceBreak);
      setNextBreakMinutes(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastBreakTime]);

  // Rotate tips every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % WELLNESS_TIPS.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleStartStop = useCallback(() => {
    if (isTimerRunning) {
      // Stopping - count as a session if over 5 minutes
      if (timerSeconds > 300) {
        setSessionCount((prev) => prev + 1);
      }
      setTimerSeconds(0);
    }
    setIsTimerRunning(!isTimerRunning);
  }, [isTimerRunning, timerSeconds]);

  const handleTakeBreak = useCallback(() => {
    setLastBreakTime(new Date());
    if (isTimerRunning) {
      setIsTimerRunning(false);
      if (timerSeconds > 300) {
        setSessionCount((prev) => prev + 1);
      }
      setTimerSeconds(0);
    }
  }, [isTimerRunning, timerSeconds]);

  const maxMinutes = Math.max(...WEEKLY_FOCUS_DATA.map(d => d.minutes));
  const currentTip = WELLNESS_TIPS[currentTipIndex] ?? WELLNESS_TIPS[0];

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="heading-1 mb-2">Wellness</h1>
        <p className="text-muted-foreground">Track your focus time and maintain healthy work habits</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Today's Focus Time */}
        <div className="glass-panel animate-smooth rounded-xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="caption text-muted-foreground">Today&apos;s Focus</span>
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent-primary/20">
              <svg className="size-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="heading-1 mb-1 text-accent-primary">{formatMinutes(todayFocusMinutes)}</div>
          <p className="caption text-muted-foreground">{sessionCount} focus sessions</p>
        </div>

        {/* Focus Score with Progress Ring */}
        <div className="glass-panel animate-smooth rounded-xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="caption text-muted-foreground">Focus Score</span>
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent-success/20">
              <svg className="size-5 text-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <ProgressRing progress={focusScore} size={80} strokeWidth={6} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="heading-2 text-accent-success">{focusScore}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Excellent</p>
              <p className="caption text-muted-foreground">Above average</p>
            </div>
          </div>
        </div>

        {/* Weekly Streak */}
        <div className="glass-panel animate-smooth rounded-xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="caption text-muted-foreground">Weekly Streak</span>
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent-warning/20">
              <svg className="size-5 text-accent-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
          </div>
          <div className="heading-1 mb-1">{weeklyStreak} days</div>
          <div className="mt-2 flex gap-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < weeklyStreak
                    ? 'bg-accent-warning'
                    : 'bg-muted/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Breaks Taken */}
        <div className="glass-panel animate-smooth rounded-xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="caption text-muted-foreground">Breaks Taken</span>
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent-secondary/20">
              <svg className="size-5 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
          </div>
          <div className="heading-1 mb-1">{breaksTaken}</div>
          <p className="caption text-muted-foreground">Today&apos;s healthy breaks</p>
        </div>
      </div>

      {/* Focus Timer & Break Reminder */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Focus Timer */}
        <div className="glass-panel rounded-2xl p-8">
          <h2 className="heading-2 mb-6">Focus Session Timer</h2>
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <ProgressRing
                progress={isTimerRunning ? Math.min((timerSeconds / 1500) * 100, 100) : 0}
                size={200}
                strokeWidth={12}
                color="var(--accent-primary)"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="display-2 font-mono">{formatTime(timerSeconds)}</span>
                <span className="caption text-muted-foreground">
                  {isTimerRunning ? 'Focus Mode' : 'Ready to focus'}
                </span>
              </div>
            </div>

            <button
              onClick={handleStartStop}
              className={`animate-smooth flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:scale-105 ${
                isTimerRunning
                  ? 'bg-accent-critical hover:bg-accent-critical/90'
                  : 'gradient-accent hover:opacity-90'
              }`}
            >
              {isTimerRunning ? (
                <>
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                  Stop Session
                </>
              ) : (
                <>
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Focus
                </>
              )}
            </button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Recommended: 25 minute focus blocks with 5 minute breaks
            </p>
          </div>
        </div>

        {/* Break Reminder */}
        <div className="glass-panel rounded-2xl p-8">
          <h2 className="heading-2 mb-6">Break Reminder</h2>

          <div className={`mb-6 rounded-xl p-6 ${
            nextBreakMinutes === 0
              ? 'border-2 border-accent-warning bg-accent-warning/10'
              : 'bg-muted/20'
          }`}>
            <div className="mb-4 flex items-center gap-4">
              <div className={`flex size-14 items-center justify-center rounded-full ${
                nextBreakMinutes === 0
                  ? 'bg-accent-warning'
                  : 'bg-muted/30'
              }`}>
                {nextBreakMinutes === 0 ? (
                  <svg className="size-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                ) : (
                  <svg className="size-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                {nextBreakMinutes === 0 ? (
                  <>
                    <h3 className="text-lg font-semibold text-accent-warning">Time for a break!</h3>
                    <p className="text-sm text-muted-foreground">You&apos;ve been focused for 25+ minutes</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">Next break in</h3>
                    <p className="display-2">{nextBreakMinutes} min</p>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={handleTakeBreak}
              className={`w-full rounded-xl py-3 font-medium transition-all ${
                nextBreakMinutes === 0
                  ? 'bg-accent-warning text-white hover:bg-accent-warning/90'
                  : 'border border-border bg-transparent hover:bg-muted/20'
              }`}
            >
              {nextBreakMinutes === 0 ? 'Take Break Now' : 'Log a Break'}
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Quick break activities</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="animate-smooth flex items-center gap-2 rounded-lg border border-border p-3 text-left text-sm transition-all hover:bg-muted/20">
                <span className="text-lg">🚶</span>
                <span>Quick walk</span>
              </button>
              <button className="animate-smooth flex items-center gap-2 rounded-lg border border-border p-3 text-left text-sm transition-all hover:bg-muted/20">
                <span className="text-lg">💧</span>
                <span>Get water</span>
              </button>
              <button className="animate-smooth flex items-center gap-2 rounded-lg border border-border p-3 text-left text-sm transition-all hover:bg-muted/20">
                <span className="text-lg">🧘</span>
                <span>Stretch</span>
              </button>
              <button className="animate-smooth flex items-center gap-2 rounded-lg border border-border p-3 text-left text-sm transition-all hover:bg-muted/20">
                <span className="text-lg">👀</span>
                <span>Rest eyes</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Focus Trend */}
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="heading-2 mb-6">Weekly Focus Trend</h2>
        <div className="flex h-64 items-end justify-between gap-2">
          {WEEKLY_FOCUS_DATA.map((day, index) => {
            const height = (day.minutes / maxMinutes) * 100;
            const isToday = index === new Date().getDay() - 1 || (new Date().getDay() === 0 && index === 6);

            return (
              <div key={day.day} className="group flex flex-1 flex-col items-center gap-2">
                <div className="relative w-full">
                  <div
                    className={`animate-smooth mx-auto w-full max-w-12 rounded-t-lg transition-all hover:opacity-80 ${
                      isToday
                        ? 'gradient-accent'
                        : 'bg-accent-primary/60'
                    }`}
                    style={{ height: `${Math.max(height, 10)}%`, minHeight: '20px' }}
                  />
                  <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background group-hover:block">
                    {day.label}
                  </div>
                </div>
                <span className={`text-sm ${isToday ? 'font-semibold text-accent-primary' : 'text-muted-foreground'}`}>
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Total this week</p>
            <p className="heading-2">{formatMinutes(WEEKLY_FOCUS_DATA.reduce((sum, d) => sum + d.minutes, 0))}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Daily average</p>
            <p className="heading-2">{formatMinutes(Math.round(WEEKLY_FOCUS_DATA.reduce((sum, d) => sum + d.minutes, 0) / 7))}</p>
          </div>
        </div>
      </div>

      {/* Wellness Tips */}
      <div className="glass-panel rounded-2xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="heading-2">Wellness Tips</h2>
          <div className="flex gap-1">
            {WELLNESS_TIPS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTipIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentTipIndex
                    ? 'w-6 bg-accent-primary'
                    : 'w-2 bg-muted/30 hover:bg-muted/50'
                }`}
                aria-label={`View tip ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {currentTip && (
          <div className="animate-smooth flex items-start gap-6">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-success to-accent-primary">
              {currentTip.icon === 'pause' && (
                <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {currentTip.icon === 'water' && (
                <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              )}
              {currentTip.icon === 'eye' && (
                <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
              {currentTip.icon === 'stretch' && (
                <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
              {currentTip.icon === 'breath' && (
                <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-semibold">{currentTip.title}</h3>
              <p className="text-muted-foreground">{currentTip.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
