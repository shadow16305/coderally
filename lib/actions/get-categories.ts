"use server";

import prisma from "@/lib/prismadb";

const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { followers: true },
        },
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default getCategories;
