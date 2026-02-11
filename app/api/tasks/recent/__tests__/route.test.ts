import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    task: {
      findMany: vi.fn(),
    },
  },
}));

import { GET } from '../route';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

describe('GET /api/tasks/recent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 when not authenticated', async () => {
    vi.mocked(auth).mockResolvedValue(null as any);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Unauthorized');
  });

  it('returns 401 when session has no user id', async () => {
    vi.mocked(auth).mockResolvedValue({ user: {} } as any);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Unauthorized');
  });

  it('filters tasks by authenticated user id', async () => {
    const mockUserId = 'user-123';
    vi.mocked(auth).mockResolvedValue({
      user: { id: mockUserId },
    } as any);

    vi.mocked(prisma.task.findMany).mockResolvedValue([]);

    await GET();

    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          userId: mockUserId,
        }),
      })
    );
  });

  it('returns formatted tasks for authenticated user', async () => {
    const mockUserId = 'user-123';
    vi.mocked(auth).mockResolvedValue({
      user: { id: mockUserId },
    } as any);

    const mockTasks = [
      {
        id: 'task-1',
        title: 'Test Task',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: new Date('2024-12-31'),
        user: { name: 'Test User', avatar: null },
      },
    ];

    vi.mocked(prisma.task.findMany).mockResolvedValue(mockTasks as any);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('title', 'Test Task');
    expect(data[0]).toHaveProperty('status', 'in-progress');
    expect(data[0]).toHaveProperty('priority', 'high');
  });

  it('only fetches TODO and IN_PROGRESS tasks', async () => {
    vi.mocked(auth).mockResolvedValue({
      user: { id: 'user-123' },
    } as any);

    vi.mocked(prisma.task.findMany).mockResolvedValue([]);

    await GET();

    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: { in: ['TODO', 'IN_PROGRESS'] },
        }),
      })
    );
  });

  it('limits results to 5 tasks', async () => {
    vi.mocked(auth).mockResolvedValue({
      user: { id: 'user-123' },
    } as any);

    vi.mocked(prisma.task.findMany).mockResolvedValue([]);

    await GET();

    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 5,
      })
    );
  });
});
