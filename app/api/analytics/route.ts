import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Fetch metrics for the last 30 days
    const metrics = await prisma.metric.findMany({
      where: {
        timestamp: { gte: thirtyDaysAgo }
      },
      orderBy: { timestamp: 'asc' }
    });

    // Fetch task completion trends
    const taskCompletions = await prisma.task.groupBy({
      by: ['status'],
      _count: true,
      where: {
        createdAt: { gte: thirtyDaysAgo }
      }
    });

    // Fetch user activity
    const activeUsers = await prisma.user.count({
      where: {
        activities: {
          some: {
            createdAt: { gte: thirtyDaysAgo }
          }
        }
      }
    });

    // Fetch project progress
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        progress: true,
        status: true,
        _count: {
          select: { tasks: true }
        }
      },
      where: {
        status: 'ACTIVE'
      }
    });

    // Team engagement by department
    const teamStats = await prisma.team.findMany({
      select: {
        name: true,
        department: true,
        _count: {
          select: {
            members: true,
            posts: true
          }
        }
      }
    });

    // Calculate weekly trend data (last 4 weeks)
    const weeklyData = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now.getTime() - (i * 7 + 7) * 24 * 60 * 60 * 1000);
      const weekEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      
      const weekTasks = await prisma.task.count({
        where: {
          completedAt: {
            gte: weekStart,
            lt: weekEnd
          },
          status: 'DONE'
        }
      });

      const weekActivities = await prisma.activity.count({
        where: {
          createdAt: {
            gte: weekStart,
            lt: weekEnd
          }
        }
      });

      weeklyData.push({
        week: `Week ${4 - i}`,
        tasksCompleted: weekTasks,
        activities: weekActivities,
        date: weekStart.toISOString().split('T')[0]
      });
    }

    return NextResponse.json({
      overview: {
        activeUsers,
        totalProjects: projects.length,
        totalTasks: taskCompletions.reduce((sum, t) => sum + t._count, 0),
        completedTasks: taskCompletions.find((t) => t.status === 'DONE')?._count || 0
      },
      weeklyTrend: weeklyData,
      taskDistribution: taskCompletions.map((t) => ({
        status: t.status,
        count: t._count
      })),
      projects: projects.map((p) => ({
        name: p.name,
        progress: p.progress,
        taskCount: p._count.tasks
      })),
      teamEngagement: teamStats.map((t) => ({
        name: t.name,
        department: t.department || 'General',
        members: t._count.members,
        posts: t._count.posts,
        engagement: Math.round((t._count.posts / Math.max(t._count.members, 1)) * 100)
      })),
      metrics: metrics.slice(-20) // Last 20 metric entries
    });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
