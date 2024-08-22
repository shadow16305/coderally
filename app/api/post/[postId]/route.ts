import getCurrentUser from "@/lib/actions/get-current-user";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { id } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!existingPost) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    if (existingPost.authorId !== currentUser.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedPost);
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
