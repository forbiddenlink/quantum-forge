import { prisma } from '@/lib/prisma';
import type { NotificationType } from '@prisma/client';

interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
}

export async function createNotification({
  userId,
  type,
  title,
  message,
  link,
}: CreateNotificationParams) {
  return prisma.notification.create({
    data: {
      userId,
      type,
      title,
      message,
      link,
    },
  });
}

export async function notifyTaskAssigned(
  assigneeId: string,
  taskTitle: string,
  taskId: string,
  assignerName: string
) {
  return createNotification({
    userId: assigneeId,
    type: 'TASK_ASSIGNED',
    title: 'New task assigned',
    message: `${assignerName} assigned you: "${taskTitle}"`,
    link: `/tasks?id=${taskId}`,
  });
}

export async function notifyTaskCompleted(
  userId: string,
  taskTitle: string,
  taskId: string
) {
  return createNotification({
    userId,
    type: 'TASK_COMPLETED',
    title: 'Task completed',
    message: `You completed: "${taskTitle}"`,
    link: `/tasks?id=${taskId}`,
  });
}

export async function notifyTaskDue(
  userId: string,
  taskTitle: string,
  taskId: string,
  dueIn: string
) {
  return createNotification({
    userId,
    type: 'TASK_DUE',
    title: 'Task due soon',
    message: `"${taskTitle}" is due ${dueIn}`,
    link: `/tasks?id=${taskId}`,
  });
}

export async function notifyProjectUpdate(
  userId: string,
  projectName: string,
  projectId: string,
  updateMessage: string
) {
  return createNotification({
    userId,
    type: 'PROJECT_UPDATE',
    title: `Update: ${projectName}`,
    message: updateMessage,
    link: `/projects?id=${projectId}`,
  });
}

export async function notifyTeamMention(
  userId: string,
  mentionedBy: string,
  context: string,
  link?: string
) {
  return createNotification({
    userId,
    type: 'TEAM_MENTION',
    title: 'You were mentioned',
    message: `${mentionedBy} mentioned you: "${context}"`,
    link,
  });
}

export async function notifySystem(
  userId: string,
  title: string,
  message: string,
  link?: string
) {
  return createNotification({
    userId,
    type: 'SYSTEM',
    title,
    message,
    link,
  });
}
