"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getAllUsers from "@/lib/actions/get-all-users";
import getCategories from "@/lib/actions/get-categories";
import getCurrentUser from "@/lib/actions/get-current-user";
import { Like, User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteModal } from "../modals/delete-modal";
import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  title: string;
  content: string;
  categoryId: string;
  author: string;
  id: string;
  likes: Like[];
}

export const PostCard = ({ title, content, categoryId, author, id, likes }: PostCardProps) => {
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authorInfo, setAuthorInfo] = useState<User | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        const users = await getAllUsers();
        const user = await getCurrentUser();

        const category = categories.find((cat) => cat.id === categoryId);
        const authorInfo = users?.find((user) => user.id === author);
        setCategoryName(category?.name ?? "Unknown Category");
        setAuthorInfo(authorInfo);
        setCurrentUser(user);

        // Determine if the current user has liked this post
        const userHasLiked = likes.some((like) => like.userId === user?.id);
        setIsLiked(userHasLiked);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryId, author, likes]);

  const handleDelete = async () => {
    axios
      .delete(`/api/post/${id}`, { data: { id } })
      .then(() => {
        toast.success("Post deleted.");
      })
      .catch(() => {
        toast.error("Failed to delete post.");
      })
      .finally(() => {
        router.refresh();
      });
  };

  const handleLike = async () => {
    if (isLiked) {
      await axios
        .delete(`/api/post/${id}/like`, { data: { postId: id } })
        .then(() => {
          setIsLiked(!isLiked);
        })
        .catch(() => {
          toast.error("Failed to dislike post.");
        })
        .finally(() => {
          router.refresh();
        });
    } else {
      await axios
        .post(`/api/post/${id}/like`, { postId: id })
        .then(() => {
          setIsLiked(true);
        })
        .catch(() => {
          toast.error("Failed to like post.");
        })
        .finally(() => {
          router.refresh();
        });
    }
  };

  return (
    <>
      <Card className="w-full relative">
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
            <div className="flex items-center gap-x-2">
              <span className="text-xs bg-neutral-100 w-fit rounded-xl px-2 py-1">/{categoryName}</span>
              {authorInfo?.id === currentUser?.id && (
                <Button variant="destructive" size="sm" onClick={() => setDeleteModalOpen(true)}>
                  Delete
                </Button>
              )}
              <Button onClick={() => router.push(`/categories/${categoryName}/${id}`)} size="sm">
                See post
              </Button>
              <Button type="button" onClick={handleLike} className="gap-x-1 bg-blue-500 hover:bg-blue-400">
                <ThumbsUp size={16} fill={isLiked ? "#ffffff" : "#ffffff00"} />
                <p>{likes?.length}</p>
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-base text-ellipsis">
          <p className="max-h-[170px] overflow-hidden">{content}</p>
        </CardContent>
      </Card>
      <DeleteModal
        onDelete={handleDelete}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        variant="post"
      />
    </>
  );
};
