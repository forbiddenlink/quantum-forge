import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash default password
  const hashedPassword = await bcrypt.hash('password123', 10);
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'purplegumdropz@gmail.com' },
    update: {},
    create: {
      email: 'purplegumdropz@gmail.com',
      name: 'Admin User',
      password: hashedAdminPassword,
      role: 'ADMIN',
      department: 'Engineering',
      title: 'System Administrator',
      focusScore: 95,
      focusMinutes: 2400,
      theme: 'dark'
    }
  });

  // Create demo users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'sarah.chen@quantumforge.dev' },
      update: {},
      create: {
        email: 'sarah.chen@quantumforge.dev',
        name: 'Sarah Chen',
        password: hashedPassword,
        role: 'MANAGER',
        department: 'Engineering',
        title: 'Engineering Manager',
        focusScore: 88,
        focusMinutes: 1920
      }
    }),
    prisma.user.upsert({
      where: { email: 'marcus.rodriguez@quantumforge.dev' },
      update: {},
      create: {
        email: 'marcus.rodriguez@quantumforge.dev',
        name: 'Marcus Rodriguez',
        password: hashedPassword,
        role: 'EMPLOYEE',
        department: 'Engineering',
        title: 'Senior Frontend Developer',
        focusScore: 92,
        focusMinutes: 2160
      }
    }),
    prisma.user.upsert({
      where: { email: 'priya.patel@quantumforge.dev' },
      update: {},
      create: {
        email: 'priya.patel@quantumforge.dev',
        name: 'Priya Patel',
        password: hashedPassword,
        role: 'EMPLOYEE',
        department: 'Design',
        title: 'Product Designer',
        focusScore: 85,
        focusMinutes: 1800
      }
    })
  ]);

  console.log('✅ Created users:', users.length + 1);

  // Create team
  const engineeringTeam = await prisma.team.create({
    data: {
      name: 'Engineering',
      description: 'Product engineering team building Quantum Forge',
      department: 'Engineering',
      members: {
        create: [
          { userId: admin.id, role: 'LEADER' },
          { userId: users[0].id, role: 'LEADER' },
          { userId: users[1].id, role: 'MEMBER' }
        ]
      }
    }
  });

  console.log('✅ Created team:', engineeringTeam.name);

  // Create project
  const project = await prisma.project.create({
    data: {
      name: 'Q1 Portal Modernization',
      description: 'Migrate employee portal to Next.js 15 with modern architecture',
      status: 'ACTIVE',
      ownerId: users[0].id,
      startDate: new Date('2025-01-01'),
      targetDate: new Date('2025-03-31'),
      progress: 45,
      tags: ['modernization', 'frontend', 'priority']
    }
  });

  console.log('✅ Created project:', project.name);

  // Create tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Design new dashboard layout',
        description: 'Create Figma mockups for modernized dashboard with glassmorphism',
        status: 'DONE',
        priority: 'HIGH',
        userId: users[2].id,
        projectId: project.id,
        completedAt: new Date(),
        estimatedHours: 8,
        actualHours: 6.5,
        tags: ['design', 'ui']
      }
    }),
    prisma.task.create({
      data: {
        title: 'Implement authentication with NextAuth',
        description: 'Set up NextAuth.js with PostgreSQL adapter and session management',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        userId: users[1].id,
        projectId: project.id,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        estimatedHours: 12,
        tags: ['backend', 'auth', 'security']
      }
    }),
    prisma.task.create({
      data: {
        title: 'Build Command Bar (Cmd+K)',
        description: 'Create global command palette with fuzzy search and keyboard navigation',
        status: 'TODO',
        priority: 'MEDIUM',
        userId: users[1].id,
        projectId: project.id,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        estimatedHours: 8,
        tags: ['frontend', 'ux']
      }
    }),
    prisma.task.create({
      data: {
        title: 'Set up Prisma database schema',
        description: 'Define complete data models and run initial migration',
        status: 'DONE',
        priority: 'HIGH',
        userId: admin.id,
        projectId: project.id,
        completedAt: new Date(),
        estimatedHours: 4,
        actualHours: 3,
        tags: ['backend', 'database']
      }
    }),
    prisma.task.create({
      data: {
        title: 'Integrate AI Copilot features',
        description: 'Add task suggestions, auto-triage, and smart content generation',
        status: 'TODO',
        priority: 'MEDIUM',
        userId: users[1].id,
        projectId: project.id,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        estimatedHours: 16,
        tags: ['ai', 'copilot', 'frontend']
      }
    })
  ]);

  console.log('✅ Created tasks:', tasks.length);

  // Create announcement post
  const post = await prisma.post.create({
    data: {
      title: '🚀 Welcome to Quantum Forge',
      content: 'We\'re excited to launch our new employee portal! Built with Next.js 15, React 19, and powered by AI, this platform brings together everything you need to stay productive and connected.',
      type: 'ANNOUNCEMENT',
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
      teamId: engineeringTeam.id,
      featured: true,
      pinned: true,
      tags: ['announcement', 'launch'],
      views: 42,
      likes: 18
    }
  });

  console.log('✅ Created post:', post.title);

  // Create notifications
  await Promise.all([
    prisma.notification.create({
      data: {
        type: 'ANNOUNCEMENT',
        title: 'Welcome to Quantum Forge',
        message: 'Check out the new features in your dashboard',
        link: '/dashboard',
        userId: users[1].id
      }
    }),
    prisma.notification.create({
      data: {
        type: 'TASK_ASSIGNED',
        title: 'New task assigned',
        message: 'Implement authentication with NextAuth',
        link: `/tasks/${tasks[1].id}`,
        userId: users[1].id
      }
    })
  ]);

  console.log('✅ Created notifications');

  // Create sample metrics
  const now = new Date();
  await Promise.all([
    prisma.metric.create({
      data: {
        name: 'focus_sessions',
        value: 156,
        dimension: 'weekly',
        tags: { department: 'Engineering' },
        timestamp: now
      }
    }),
    prisma.metric.create({
      data: {
        name: 'tasks_completed',
        value: 42,
        dimension: 'weekly',
        tags: { department: 'Engineering' },
        timestamp: now
      }
    }),
    prisma.metric.create({
      data: {
        name: 'team_engagement',
        value: 0.89,
        dimension: 'daily',
        tags: { team: engineeringTeam.id },
        timestamp: now
      }
    })
  ]);

  console.log('✅ Created metrics');
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
