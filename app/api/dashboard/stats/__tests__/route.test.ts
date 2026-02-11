import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
    task: {
      count: vi.fn(),
    },
    teamMember: {
      count: vi.fn(),
    },
  },
}));

import { GET } from '../route';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

describe('GET /api/dashboard/stats', () => {
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

  it('returns user-specific stats for authenticated user', async () => {
    const mockUserId = 'user-123';
    vi.mocked(auth).mockResolvedValue({
      user: { id: mockUserId },
    } as any);

    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      focusScore: 85,
      teamMemberships: [{ teamId: 'team-1' }],
    } as any);

    vi.mocked(prisma.task.count).mockResolvedValue(10);
    vi.mocked(prisma.teamMember.count).mockResolvedValue(5);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('focusScore');
    expect(data).toHaveProperty('tasksCompleted');
    expect(data).toHaveProperty('teamEngagement');
    expect(data).toHaveProperty('slaCompliance');
  });

  it('filters task counts by authenticated user id', async () => {
    const mockUserId = 'user-123';
    vi.mocked(auth).mockResolvedValue({
      user: { id: mockUserId },
    } as any);

    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      focusScore: 75,
      teamMemberships: [],
    } as any);

    vi.mocked(prisma.task.count).mockResolvedValue(5);
    vi.mocked(prisma.teamMember.count).mockResolvedValue(1);

    await GET();

    // Verify task counts are filtered by userId
    expect(prisma.task.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          userId: mockUserId,
        }),
      })
    );
  });

  it('returns focus score from current user', async () => {
    const mockUserId = 'user-123';
    const expectedFocusScore = 92;

    vi.mocked(auth).mockResolvedValue({
      user: { id: mockUserId },
    } as any);

    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      focusScore: expectedFocusScore,
      teamMemberships: [],
    } as any);

    vi.mocked(prisma.task.count).mockResolvedValue(0);
    vi.mocked(prisma.teamMember.count).mockResolvedValue(1);

    const response = await GET();
    const data = await response.json();

    expect(data.focusScore).toBe(expectedFocusScore);
  });

  it('handles user with no team membership', async () => {
    vi.mocked(auth).mockResolvedValue({
      user: { id: 'user-123' },
    } as any);

    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      focusScore: 80,
      teamMemberships: [],
    } as any);

    vi.mocked(prisma.task.count).mockResolvedValue(3);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('focusScore', 80);
    // Team member count should not be queried for users without teams
    expect(prisma.teamMember.count).not.toHaveBeenCalled();
  });

  it('caps team engagement and sla compliance at 100', async () => {
    vi.mocked(auth).mockResolvedValue({
      user: { id: 'user-123' },
    } as any);

    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      focusScore: 100,
      teamMemberships: [{ teamId: 'team-1' }],
    } as any);

    // Return very high numbers that would exceed 100%
    vi.mocked(prisma.task.count).mockResolvedValue(100);
    vi.mocked(prisma.teamMember.count).mockResolvedValue(1);

    const response = await GET();
    const data = await response.json();

    expect(data.teamEngagement).toBeLessThanOrEqual(100);
    expect(data.slaCompliance).toBeLessThanOrEqual(100);
  });
});
