"use server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "./get-current-user";

const getFollowedCategories = async () => {
  try {
    const currentUser = await getCurrentUser();
    const followedCategories = await prisma.categoryFollower.findMany({
      where: {
        userId: currentUser?.id,
      },
    });
    return followedCategories;
  } catch (error) {
    console.error("Error fetching followed categories:", error);
    return [];
  }
};

export default getFollowedCategories;
