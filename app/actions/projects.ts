'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().optional(),
  status: z.enum(['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED']).default('PLANNING'),
  startDate: z.string().datetime().optional(),
  targetDate: z.string().datetime().optional(),
  teamId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string(),
  progress: z.number().min(0).max(100).optional(),
});

type ActionResponse<T = void> = 
  | { success: true; data: T }
  | { success: false; error: string };

export async function createProject(
  input: z.infer<typeof createProjectSchema>
): Promise<ActionResponse<{ id: string }>> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = createProjectSchema.parse(input);

    const project = await prisma.project.create({
      data: {
        name: validated.name,
        description: validated.description,
        status: validated.status,
        startDate: validated.startDate ? new Date(validated.startDate) : null,
        targetDate: validated.targetDate ? new Date(validated.targetDate) : null,
        teamId: validated.teamId,
        tags: validated.tags || [],
        ownerId: session.user.id,
      },
    });

    await prisma.activity.create({
      data: {
        type: 'PROJECT_CREATED',
        description: `Created project: ${project.name}`,
        userId: session.user.id,
        metadata: { projectId: project.id },
      },
    });

    revalidatePath('/projects');
    revalidatePath('/dashboard');

    return { success: true, data: { id: project.id } };
  } catch (error) {
    console.error('Failed to create project:', error);
    
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Validation error' };
    }
    
    return { success: false, error: 'Failed to create project' };
  }
}

export async function updateProject(
  input: z.infer<typeof updateProjectSchema>
): Promise<ActionResponse> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = updateProjectSchema.parse(input);
    const { id, ...data } = validated;

    const existingProject = await prisma.project.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!existingProject) {
      return { success: false, error: 'Project not found' };
    }

    if (existingProject.ownerId !== session.user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.startDate !== undefined) updateData.startDate = data.startDate ? new Date(data.startDate) : null;
    if (data.targetDate !== undefined) updateData.targetDate = data.targetDate ? new Date(data.targetDate) : null;
    if (data.teamId !== undefined) updateData.teamId = data.teamId;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.progress !== undefined) updateData.progress = data.progress;

    await prisma.project.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/projects');
    revalidatePath('/dashboard');

    return { success: true, data: undefined };
  } catch (error) {
    console.error('Failed to update project:', error);
    
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Validation error' };
    }
    
    return { success: false, error: 'Failed to update project' };
  }
}

export async function deleteProject(projectId: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project) {
      return { success: false, error: 'Project not found' };
    }

    if (project.ownerId !== session.user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    revalidatePath('/projects');
    revalidatePath('/dashboard');

    return { success: true, data: undefined };
  } catch (error) {
    console.error('Failed to delete project:', error);
    return { success: false, error: 'Failed to delete project' };
  }
}

