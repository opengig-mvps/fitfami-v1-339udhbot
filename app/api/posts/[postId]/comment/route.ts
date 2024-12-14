import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type CommentRequestBody = {
  content: string;
  userId: string;
};

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = parseInt(params.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ success: false, message: 'Invalid post ID' }, { status: 400 });
    }

    const body: CommentRequestBody = await request.json();
    const { content, userId } = body;

    if (!content || !userId) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    const user = await prisma.user.findFirst({
      where: { id: userIdInt },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        userId: userIdInt,
        content,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment added successfully',
      data: comment,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}