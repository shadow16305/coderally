"use server";

import prisma from "@/lib/prismadb";

const getSinglePost = async (postId: string) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        author: true,
        category: true,
      },
    });

    return post;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export default getSinglePost;
