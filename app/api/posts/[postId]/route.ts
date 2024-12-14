import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = parseInt(params.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ success: false, message: 'Invalid post ID' }, { status: 400 });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ success: true, message: 'Post deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = parseInt(params.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ success: false, message: 'Invalid post ID' }, { status: 400 });
    }

    const body = await request.json();
    const { description, imageUrl } = body;

    if (!description) {
      return NextResponse.json({ success: false, message: 'Description is required' }, { status: 400 });
    }

    const updatedPost = await prisma.post.updateMany({
      where: { id: postId },
      data: {
        description: String(description),
        imageUrl: imageUrl ? String(imageUrl) : undefined,
        updatedAt: new Date().toISOString(),
      },
    });

    if (updatedPost.count === 0) {
      return NextResponse.json({ success: false, message: 'Post not found or not updated' }, { status: 404 });
    }

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}