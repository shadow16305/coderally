import getCurrentUser from "@/lib/actions/get-current-user";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { id, authorId, content, postId } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!content || !authorId || !postId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let comment;

    if (id) {
      comment = await prisma.comment.update({
        where: { id },
        data: { authorId, content, postId },
      });
    } else {
      comment = await prisma.comment.create({
        data: { authorId, content, postId },
      });
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating or updating comment:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { id } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingComment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!existingComment) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    if (existingComment.authorId !== currentUser.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const deletedComment = await prisma.comment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedComment);
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
