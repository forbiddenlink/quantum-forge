import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        status: {
          in: ['TODO', 'IN_PROGRESS']
        }
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' }
      ],
      take: 5,
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        dueDate: true,
        user: {
          select: {
            name: true,
            avatar: true
          }
        }
      }
    });
    
    // Transform to match frontend interface
    const formattedTasks = tasks.map((task) => ({
      id: Number.parseInt(task.id, 36), // Convert cuid to number for display
      title: task.title,
      status: task.status.toLowerCase().replace('_', '-'),
      priority: task.priority.toLowerCase(),
      due: task.dueDate || new Date(),
      assignedTo: task.user.name,
      avatar: task.user.avatar
    }));
    
    return NextResponse.json(formattedTasks);
  } catch (error) {
    console.error('Failed to fetch recent tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}
