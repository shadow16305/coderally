import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/actions/get-current-user";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { id, title, content, image, userId, category } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!title || !content || !userId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let post;

    if (id) {
      post = await prisma.posts.update({
        where: { id },
        data: { title, content, image, userId },
      });
    } else {
      post = await prisma.posts.create({
        data: { title, content, image, userId, category },
      });
    }

    return NextResponse.json(post);
  } catch (error: any) {
    console.error("Error creating or updating post:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
