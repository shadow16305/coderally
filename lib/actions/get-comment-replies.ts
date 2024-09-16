"use server";

import prisma from "@/lib/prismadb";

const getCommentReplies = async (commentId: string) => {
  try {
    const replies = await prisma.reply.findMany({
      where: { commentId },
      include: {
        author: true,
        children: {
          include: {
            author: true,
          },
        },
      },
    });

    return replies;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export default getCommentReplies;
