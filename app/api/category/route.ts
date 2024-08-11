import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/actions/get-current-user";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { name, description, authorId } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });

    let category;

    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 409 });
    } else {
      category = await prisma.category.create({
        data: { name, description, authorId },
      });
    }

    return NextResponse.json(category);
  } catch (error: any) {
    console.error("Error creating category:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
