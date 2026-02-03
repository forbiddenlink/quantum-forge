import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        theme: true,
        language: true,
        timezone: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      theme: user.theme || 'system',
      language: user.language || 'en',
      timezone: user.timezone || 'UTC',
    });
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { theme, language, timezone } = body;

    // Validate theme
    const validThemes = ['light', 'dark', 'system'];
    if (theme && !validThemes.includes(theme)) {
      return NextResponse.json(
        { error: 'Invalid theme value' },
        { status: 400 }
      );
    }

    // Validate language
    const validLanguages = ['en', 'es', 'fr', 'de'];
    if (language && !validLanguages.includes(language)) {
      return NextResponse.json(
        { error: 'Invalid language value' },
        { status: 400 }
      );
    }

    // Validate timezone
    const validTimezones = [
      'UTC',
      'America/Los_Angeles',
      'America/Denver',
      'America/Chicago',
      'America/New_York',
    ];
    if (timezone && !validTimezones.includes(timezone)) {
      return NextResponse.json(
        { error: 'Invalid timezone value' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(theme !== undefined && { theme }),
        ...(language !== undefined && { language }),
        ...(timezone !== undefined && { timezone }),
      },
      select: {
        theme: true,
        language: true,
        timezone: true,
      },
    });

    return NextResponse.json({
      theme: updatedUser.theme || 'system',
      language: updatedUser.language || 'en',
      timezone: updatedUser.timezone || 'UTC',
    });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
