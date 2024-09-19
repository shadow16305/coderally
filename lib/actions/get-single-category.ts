"use server";

import prisma from "@/lib/prismadb";

const getSingleCategory = async (categoryName: string) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        name: categoryName,
      },
      include: {
        posts: {
          include: {
            likes: true,
            author: true,
          },
        },
        _count: {
          select: { followers: true },
        },
      },
    });
    return category;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

export default getSingleCategory;
