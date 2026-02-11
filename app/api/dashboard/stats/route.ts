import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get current user's data for focus score and team membership
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        focusScore: true,
        teamMemberships: {
          select: { teamId: true },
          take: 1
        }
      }
    });

    const userTeamId = currentUser?.teamMemberships[0]?.teamId;

    // Calculate user-specific metrics
    const [
      completedTasksCount,
      totalTasksThisWeek,
      completedTasksThisWeek,
      teamMemberCount
    ] = await Promise.all([
      prisma.task.count({
        where: {
          userId,
          status: 'DONE',
          completedAt: { gte: weekAgo }
        }
      }),
      prisma.task.count({
        where: {
          userId,
          createdAt: { gte: weekAgo }
        }
      }),
      prisma.task.count({
        where: {
          userId,
          status: 'DONE',
          completedAt: { gte: weekAgo }
        }
      }),
      userTeamId
        ? prisma.teamMember.count({ where: { teamId: userTeamId } })
        : Promise.resolve(1)
    ]);

    // Calculate derived metrics based on user's performance
    const teamEngagement = teamMemberCount > 0
      ? Math.round((completedTasksCount / teamMemberCount) * 10)
      : 0;

    const slaCompliance = totalTasksThisWeek > 0
      ? Math.round((completedTasksThisWeek / totalTasksThisWeek) * 100)
      : 100;

    return NextResponse.json({
      focusScore: currentUser?.focusScore ?? 0,
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
