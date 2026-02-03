import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash admin password
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);

  // Create admin user (only real user needed for initial setup)
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
      focusScore: 0,
      focusMinutes: 0,
      theme: 'dark'
    }
  });

  console.log('✅ Created admin user:', admin.email);
  console.log('🎉 Seeding complete! You can now sign in and create real data.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

