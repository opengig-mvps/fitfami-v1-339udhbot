import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type PostRequestBody = {
  userId: number;
  description: string;
  imageUrl?: string;
};

export async function POST(request: Request) {
  try {
    const body: PostRequestBody = await request.json();

    const { userId, description, imageUrl } = body;

    if (!userId || !description) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        userId,
        description,
        imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      data: { postId: post.id.toString() },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}