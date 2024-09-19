import getCurrentUser from "@/lib/actions/get-current-user";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(req: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const currentUser = await getCurrentUser();
    const postId = params.postId;
    const { content } = await req.json();

    if (!postId) {
      return new NextResponse("Post ID is required", { status: 400 });
    }

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    if (existingPost.authorId !== currentUser.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const currentUser = await getCurrentUser();
    const postId = params.postId;

    if (!postId) {
      return new NextResponse("Post ID is required", { status: 400 });
    }

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    if (existingPost.authorId !== currentUser.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.comment.deleteMany({
      where: { post: { categoryId: existingPost.categoryId } },
    });

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json(deletedPost);
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
