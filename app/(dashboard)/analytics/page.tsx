'use client';

import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface AnalyticsData {
  overview: {
    activeUsers: number;
    totalProjects: number;
    totalTasks: number;
    completedTasks: number;
  };
  weeklyTrend: Array<{
    week: string;
    tasksCompleted: number;
    activities: number;
    date: string;
  }>;
  taskDistribution: Array<{
    status: string;
    count: number;
  }>;
  projects: Array<{
    name: string;
    progress: number;
    taskCount: number;
  }>;
  teamEngagement: Array<{
    name: string;
    department: string;
    members: number;
    posts: number;
    engagement: number;
  }>;
}

const CHART_COLORS = {
  primary: '#0EA5E9',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  critical: '#EF4444',
  accent: '#06B6D4',
  neutral: '#64748B',
};

const STATUS_COLORS: Record<string, string> = {
  TODO: CHART_COLORS.neutral,
  IN_PROGRESS: CHART_COLORS.primary,
  IN_REVIEW: CHART_COLORS.warning,
  DONE: CHART_COLORS.success,
  CANCELLED: CHART_COLORS.critical,
};

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['analytics'],
    queryFn: async () => {
      const res = await fetch('/api/analytics');
      if (!res.ok) throw new Error('Failed to fetch analytics');
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-panel rounded-[28px] p-6 h-32"></div>
            ))}
          </div>
          <div className="glass-panel rounded-[28px] p-6 h-96"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Failed to load analytics data</p>
      </div>
    );
  }

  const completionRate = data.overview.totalTasks > 0
    ? Math.round((data.overview.completedTasks / data.overview.totalTasks) * 100)
    : 0;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-1 mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track team performance and productivity metrics</p>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel rounded-[28px] p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="caption text-muted-foreground">Active Users</span>
            <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="display-2 mb-1">{data.overview.activeUsers}</div>
          <p className="caption text-muted-foreground">This month</p>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="caption text-muted-foreground">Active Projects</span>
            <div className="w-10 h-10 rounded-lg bg-accent-secondary/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="display-2 mb-1">{data.overview.totalProjects}</div>
          <p className="caption text-muted-foreground">In progress</p>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="caption text-muted-foreground">Total Tasks</span>
            <div className="w-10 h-10 rounded-lg bg-accent-success/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div className="display-2 mb-1">{data.overview.totalTasks}</div>
          <p className="caption text-muted-foreground">{data.overview.completedTasks} completed</p>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="caption text-muted-foreground">Completion Rate</span>
            <div className="w-10 h-10 rounded-lg bg-accent-warning/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="display-2 mb-1">{completionRate}%</div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent-success to-accent-primary rounded-full transition-all" style={{ width: `${completionRate}%` }}></div>
          </div>
        </div>
      </div>

      {/* Weekly Trend Chart */}
      <div className="glass-panel rounded-[28px] p-6">
        <h2 className="heading-2 mb-6">Weekly Activity Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="week" stroke="#64748B" />
            <YAxis stroke="#64748B" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="tasksCompleted"
              stroke={CHART_COLORS.success}
              strokeWidth={3}
              name="Tasks Completed"
              dot={{ fill: CHART_COLORS.success, r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="activities"
              stroke={CHART_COLORS.primary}
              strokeWidth={3}
              name="User Activities"
              dot={{ fill: CHART_COLORS.primary, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Task Distribution & Team Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Distribution Pie Chart */}
        <div className="glass-panel rounded-[28px] p-6">
          <h2 className="heading-2 mb-6">Task Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.taskDistribution}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.status}: ${entry.count}`}
              >
                {data.taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || CHART_COLORS.neutral} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Team Engagement Radar */}
        <div className="glass-panel rounded-[28px] p-6">
          <h2 className="heading-2 mb-6">Team Engagement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data.teamEngagement}>
              <PolarGrid stroke="#ffffff20" />
              <PolarAngleAxis dataKey="name" stroke="#64748B" />
              <PolarRadiusAxis stroke="#64748B" />
              <Radar
                name="Engagement %"
                dataKey="engagement"
                stroke={CHART_COLORS.secondary}
                fill={CHART_COLORS.secondary}
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project Progress Bars */}
      <div className="glass-panel rounded-[28px] p-6">
        <h2 className="heading-2 mb-6">Active Projects Progress</h2>
        <ResponsiveContainer width="100%" height={data.projects.length * 60 + 40}>
          <BarChart data={data.projects} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis type="number" domain={[0, 100]} stroke="#64748B" />
            <YAxis dataKey="name" type="category" width={150} stroke="#64748B" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
              }}
            />
            <Bar dataKey="progress" fill={CHART_COLORS.primary} radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Team Insights Table */}
      <div className="glass-panel rounded-[28px] p-6">
        <h2 className="heading-2 mb-6">Team Insights</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 caption text-muted-foreground font-medium">Team</th>
                <th className="text-left py-3 px-4 caption text-muted-foreground font-medium">Department</th>
                <th className="text-right py-3 px-4 caption text-muted-foreground font-medium">Members</th>
                <th className="text-right py-3 px-4 caption text-muted-foreground font-medium">Posts</th>
                <th className="text-right py-3 px-4 caption text-muted-foreground font-medium">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {data.teamEngagement.map((team, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                  <td className="py-3 px-4 font-medium">{team.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{team.department}</td>
                  <td className="py-3 px-4 text-right">{team.members}</td>
                  <td className="py-3 px-4 text-right">{team.posts}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 ${
                      team.engagement >= 80 ? 'text-accent-success' :
                      team.engagement >= 50 ? 'text-accent-warning' :
                      'text-accent-critical'
                    }`}>
                      {team.engagement}%
                      {team.engagement >= 80 ? '↑' : team.engagement >= 50 ? '→' : '↓'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
