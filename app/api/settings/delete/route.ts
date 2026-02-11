import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { password, confirmation } = body;

    if (confirmation !== 'DELETE MY ACCOUNT') {
      return NextResponse.json(
        { error: 'Please type "DELETE MY ACCOUNT" to confirm' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true }
    });

    if (user?.password) {
      if (!password) {
        return NextResponse.json(
          { error: 'Password is required to delete account' },
          { status: 400 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Password is incorrect' },
          { status: 400 }
        );
      }
    }

    // Delete user - Prisma cascade will handle related records
    await prisma.user.delete({
      where: { id: session.user.id }
    });

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Failed to delete account:', error);
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
}
