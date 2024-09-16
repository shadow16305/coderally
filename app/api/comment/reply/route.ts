import getCurrentUser from "@/lib/actions/get-current-user";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { id, authorId, content, commentId } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!content || !authorId || !commentId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let reply;

    if (id) {
      reply = await prisma.reply.update({
        where: { id },
        data: { authorId, content },
      });
    } else {
      reply = await prisma.reply.create({
        data: { authorId, content, commentId },
      });
    }

    return NextResponse.json(reply);
  } catch (error) {
    console.error("Error creating or updating comment:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
