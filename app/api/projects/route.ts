import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        team: {
          select: {
            name: true,
            department: true,
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
      orderBy: [
        { status: 'asc' },
        { startDate: 'desc' },
      ],
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, status, startDate, targetDate } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Get user's team membership
    const userTeamMembership = await prisma.teamMember.findFirst({
      where: { userId: session.user.id },
      select: { teamId: true }
    });

    if (!userTeamMembership) {
      return NextResponse.json(
        { error: 'You must be a member of a team to create projects' },
        { status: 400 }
      );
    }

    const teamId = userTeamMembership.teamId;

    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        status: status || 'ACTIVE',
        startDate: startDate ? new Date(startDate) : null,
        targetDate: targetDate ? new Date(targetDate) : null,
        ownerId: session.user.id,
        teamId,
        progress: 0,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        team: {
          select: {
            name: true,
            department: true,
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
