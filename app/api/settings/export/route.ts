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

    // Fetch all user data
    const [user, tasks, projects, documents, activities] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          department: true,
          title: true,
          bio: true,
          location: true,
          timezone: true,
          theme: true,
          language: true,
          focusScore: true,
          focusMinutes: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.task.findMany({
        where: { userId },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          dueDate: true,
          completedAt: true,
          tags: true,
          estimatedHours: true,
          actualHours: true,
          createdAt: true,
          updatedAt: true,
          project: {
            select: { name: true }
          }
        }
      }),
      prisma.project.findMany({
        where: { ownerId: userId },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          startDate: true,
          targetDate: true,
          progress: true,
          tags: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.document.findMany({
        where: { uploaderId: userId },
        select: {
          id: true,
          title: true,
          description: true,
          fileType: true,
          fileSize: true,
          category: true,
          tags: true,
          createdAt: true
        }
      }),
      prisma.activity.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 100,
        select: {
          type: true,
          description: true,
          createdAt: true
        }
      })
    ]);

    const exportData = {
      exportedAt: new Date().toISOString(),
      user,
      tasks,
      projects,
      documents,
      recentActivity: activities
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="quantum-forge-export-${new Date().toISOString().split('T')[0]}.json"`
      }
    });
  } catch (error) {
    console.error('Failed to export user data:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
