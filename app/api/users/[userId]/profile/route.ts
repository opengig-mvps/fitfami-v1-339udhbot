import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const userProfile = await prisma.userProfile.findFirst({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
            username: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!userProfile) {
      return NextResponse.json({ success: false, message: 'User profile not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'User profile fetched successfully',
      data: {
        userId: userProfile.userId,
        profilePicture: userProfile.profilePicture,
        bio: userProfile.bio,
        createdAt: userProfile.createdAt.toISOString(),
        updatedAt: userProfile.updatedAt.toISOString(),
        user: {
          email: userProfile.user.email,
          username: userProfile.user.username,
          name: userProfile.user.name,
          role: userProfile.user.role,
          createdAt: userProfile.user.createdAt.toISOString(),
          updatedAt: userProfile.user.updatedAt.toISOString(),
        },
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}