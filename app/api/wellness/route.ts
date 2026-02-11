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
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Get user focus data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        focusScore: true,
        focusMinutes: true,
      }
    });

    // Get wellness activities for the past 7 days
    const activities = await prisma.activity.findMany({
      where: {
        userId,
        type: { in: ['TASK_CREATED', 'TASK_COMPLETED'] },
        createdAt: { gte: sevenDaysAgo }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate daily focus minutes (mock calculation based on activities)
    const dailyFocus = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayActivities = activities.filter((a: any) => {
        const actDate = new Date(a.createdAt);
        return actDate.toDateString() === date.toDateString();
      });
      
      // Estimate focus minutes based on activity count
      const minutes = dayActivities.length * 30; // 30 min per activity
      dailyFocus.push({
        day: days[date.getDay()],
        minutes,
        label: `${Math.floor(minutes / 60)}h ${minutes % 60}m`
      });
    }

    // Calculate streak
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayActivities = activities.filter((a: any) => {
        const actDate = new Date(a.createdAt);
        return actDate.toDateString() === date.toDateString();
      });
      
      if (dayActivities.length > 0) {
        streak++;
      } else {
        break;
      }
    }

    // Count completed tasks today
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayTasks = await prisma.task.count({
      where: {
        userId,
        status: 'DONE',
        completedAt: { gte: todayStart }
      }
    });

    return NextResponse.json({
      focusScore: user?.focusScore ?? 0,
      totalFocusMinutes: user?.focusMinutes ?? 0,
      weeklyStreak: streak,
      sessionsToday: todayTasks,
      breaksTaken: Math.floor(todayTasks / 2), // Estimate
      weeklyFocusData: dailyFocus,
    });
  } catch (error) {
    console.error('Failed to fetch wellness data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wellness data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { focusMinutes } = await request.json();

    // Update user's focus time and recalculate score
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        focusMinutes: { increment: focusMinutes },
        focusScore: {
          increment: Math.min(Math.floor(focusMinutes / 10), 5) // +1 score per 10 min, max +5
        }
      }
    });

    return NextResponse.json({
      focusScore: user.focusScore,
      focusMinutes: user.focusMinutes,
    });
  } catch (error) {
    console.error('Failed to update wellness data:', error);
    return NextResponse.json(
      { error: 'Failed to update wellness data' },
      { status: 500 }
    );
  }
}
