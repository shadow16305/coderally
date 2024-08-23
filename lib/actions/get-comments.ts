"use server";

import prisma from "@/lib/prismadb";

const getComments = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export default getComments;
