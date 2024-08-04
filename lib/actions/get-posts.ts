"use server";

import prisma from "@/lib/prismadb";

const getPosts = async () => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        poster: true,
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export default getPosts;
