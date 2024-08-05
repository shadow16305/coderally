"use server";

import prisma from "@/lib/prismadb";

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return null;
    }

    return users;
  } catch (error: any) {
    return null;
  }
};

export default getAllUsers;
