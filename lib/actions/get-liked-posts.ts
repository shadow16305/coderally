"use server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "./get-current-user";

const getLikedPosts = async () => {
  try {
    const currentUser = await getCurrentUser();
    const posts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            userId: currentUser?.id,
          },
        },
      },
      include: {
        author: true,
        category: true,
        likes: true,
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export default getLikedPosts;
