import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // TODO: Get current user from session and filter by userId
    // For now, return recent tasks across all users
    
    const tasks = await prisma.task.findMany({
      where: {
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
