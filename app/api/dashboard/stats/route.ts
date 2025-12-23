import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // TODO: Get current user from session
    // For now, calculate aggregate stats across all users
    
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Calculate real metrics from database
    const [
      completedTasksCount,
      totalUsers,
      avgFocusScore,
      totalTasksThisWeek,
      completedTasksThisWeek
    ] = await Promise.all([
      prisma.task.count({
        where: {
          status: 'DONE',
          completedAt: { gte: weekAgo }
        }
      }),
      prisma.user.count(),
      prisma.user.aggregate({
        _avg: { focusScore: true }
      }),
      prisma.task.count({
        where: {
          createdAt: { gte: weekAgo }
        }
      }),
      prisma.task.count({
        where: {
          status: 'DONE',
          completedAt: { gte: weekAgo }
        }
      })
    ]);
    
    // Calculate derived metrics
    const teamEngagement = totalUsers > 0 
      ? Math.round((completedTasksCount / totalUsers) * 10) 
      : 0;
    
    const slaCompliance = totalTasksThisWeek > 0
      ? Math.round((completedTasksThisWeek / totalTasksThisWeek) * 100)
      : 100;
    
    return NextResponse.json({
      focusScore: Math.round(avgFocusScore._avg.focusScore || 0),
      tasksCompleted: completedTasksCount,
      teamEngagement: Math.min(teamEngagement, 100),
      slaCompliance: Math.min(slaCompliance, 100),
    });
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
