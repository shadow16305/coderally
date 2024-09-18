import getCurrentUser from "@/lib/actions/get-current-user";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const categoryId = body.categoryId || body.data?.categoryId;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const categoryFollower = await prisma.categoryFollower.create({
      data: {
        userId: currentUser.id,
        categoryId,
      },
    });

    return NextResponse.json(categoryFollower);
  } catch (error) {
    console.error("Error following category:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { categoryId } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const categoryFollower = await prisma.categoryFollower.findFirst({
      where: {
        userId: currentUser.id,
        categoryId,
      },
    });

    if (!categoryFollower) {
      return new NextResponse("Not following", { status: 400 });
    }

    await prisma.categoryFollower.delete({
      where: {
        id: categoryFollower.id,
      },
    });

    return new NextResponse("Unfollowed successfully", { status: 200 });
  } catch (error) {
    console.error("Error unfollowing category:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
