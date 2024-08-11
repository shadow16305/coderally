"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getAllUsers from "@/lib/actions/get-all-users";
import getCategories from "@/lib/actions/get-categories";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PostCardProps {
  title: string;
  content: string;
  categoryId: string;
  author: string;
  id: string;
}

export const PostCard = ({ title, content, categoryId, author, id }: PostCardProps) => {
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [authorInfo, setAuthorInfo] = useState<User | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        const users = await getAllUsers();

        const category = categories.find((cat) => cat.id === categoryId);
        const authorInfo = users?.find((user) => user.id === author);
        setCategoryName(category?.name ?? "Unknown Category");
        setAuthorInfo(authorInfo);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <Link href={`/categories/${categoryName}/${id}`}>
      <Card className="w-full relative hover:bg-neutral-100 transition-colors">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-1">
              {authorInfo?.image && (
                <div className="relative size-8">
                  <Image src={authorInfo?.image} alt={author} fill className="rounded-full" />
                </div>
              )}
              <p className="text-sm">{authorInfo?.name}</p>
            </div>
            <span className="text-xs bg-neutral-100 w-fit rounded-xl px-2 py-1">/{categoryName}</span>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-base text-ellipsis">
          <p className="max-h-[170px] overflow-hidden">{content}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
