'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Validation schemas
const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  status: z.enum(['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'CANCELLED']).default('TODO'),
  dueDate: z.string().optional(),
  projectId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  estimatedHours: z.number().positive().optional(),
});

const updateTaskSchema = createTaskSchema.partial().extend({
  id: z.string(),
});

const deleteTaskSchema = z.object({
  id: z.string(),
});

type ActionResponse<T = void> = 
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Create a new task
 */
export async function createTask(
  input: z.infer<typeof createTaskSchema>
): Promise<ActionResponse<{ id: string }>> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = createTaskSchema.parse(input);

    const task = await prisma.task.create({
      data: {
        title: validated.title,
        description: validated.description,
        priority: validated.priority,
        status: validated.status,
        dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
        projectId: validated.projectId,
        tags: validated.tags || [],
        estimatedHours: validated.estimatedHours,
        userId: session.user.id,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'TASK_CREATED',
        description: `Created task: ${task.title}`,
        userId: session.user.id,
        metadata: { taskId: task.id },
      },
    });

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return { success: true, data: { id: task.id } };
  } catch (error) {
    console.error('Failed to create task:', error);
    
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation error' };
    }
    
    return { success: false, error: 'Failed to create task' };
  }
}

/**
 * Update an existing task
 */
export async function updateTask(
  input: z.infer<typeof updateTaskSchema>
): Promise<ActionResponse> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = updateTaskSchema.parse(input);
    const { id, ...data } = validated;

    // Check if task exists and user has permission
    const existingTask = await prisma.task.findUnique({
      where: { id },
      select: { userId: true, title: true },
    });

    if (!existingTask) {
      return { success: false, error: 'Task not found' };
    }

    if (existingTask.userId !== session.user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Update task
    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.dueDate !== undefined) updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    if (data.projectId !== undefined) updateData.projectId = data.projectId;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.estimatedHours !== undefined) updateData.estimatedHours = data.estimatedHours;

    // Set completedAt if status changed to DONE
    if (data.status === 'DONE') {
      updateData.completedAt = new Date();
    }

    await prisma.task.update({
      where: { id },
      data: updateData,
    });

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'TASK_COMPLETED',
        description: `Updated task: ${existingTask.title}`,
        userId: session.user.id,
        metadata: { taskId: id },
      },
    });

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return { success: true, data: undefined };
  } catch (error) {
    console.error('Failed to update task:', error);
    
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation error' };
    }
    
    return { success: false, error: 'Failed to update task' };
  }
}

/**
 * Delete a task
 */
export async function deleteTask(
  input: z.infer<typeof deleteTaskSchema>
): Promise<ActionResponse> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const validated = deleteTaskSchema.parse(input);

    // Check if task exists and user has permission
    const existingTask = await prisma.task.findUnique({
      where: { id: validated.id },
      select: { userId: true, title: true },
    });

    if (!existingTask) {
      return { success: false, error: 'Task not found' };
    }

    if (existingTask.userId !== session.user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    await prisma.task.delete({
      where: { id: validated.id },
    });

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return { success: true, data: undefined };
  } catch (error) {
    console.error('Failed to delete task:', error);
    
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation error' };
    }
    
    return { success: false, error: 'Failed to delete task' };
  }
}

/**
 * Toggle task completion status
 */
export async function toggleTaskCompletion(taskId: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { userId: true, status: true, title: true },
    });

    if (!task) {
      return { success: false, error: 'Task not found' };
    }

    if (task.userId !== session.user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';
    
    await prisma.task.update({
      where: { id: taskId },
      data: {
        status: newStatus,
        completedAt: newStatus === 'DONE' ? new Date() : null,
      },
    });

    if (newStatus === 'DONE') {
      await prisma.activity.create({
        data: {
          type: 'TASK_COMPLETED',
          description: `Completed task: ${task.title}`,
          userId: session.user.id,
          metadata: { taskId },
        },
      });
    }

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return { success: true, data: undefined };
  } catch (error) {
    console.error('Failed to toggle task:', error);
    return { success: false, error: 'Failed to toggle task' };
  }
}

