"use server";

import prisma from "@/lib/prismadb";

const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        category: true,
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export default getPosts;
