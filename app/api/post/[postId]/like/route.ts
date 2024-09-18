import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/actions/get-current-user";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { postId } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!postId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let like;

    like = await prisma.like.create({
      data: {
        postId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(like);
  } catch (error: any) {
    console.error("Error liking a post:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { postId } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingLike = await prisma.like.findFirst({
      where: { userId: currentUser.id, postId },
    });

    if (!existingLike) {
      return new NextResponse("ID not found", { status: 400 });
    }

    const unlike = await prisma.like.delete({
      where: {
        userId_postId: {
          userId: currentUser.id,
          postId,
        },
      },
    });

    return NextResponse.json(unlike);
  } catch (error: any) {
    console.error("Error liking a post:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
