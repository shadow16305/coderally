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
import { PostPopover } from "./post-popover";
import Link from "next/link";
import { EditModal } from "../modals/edit-modal";

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
  const [editModalOpen, setEditModalOpen] = useState(false);
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
      .delete(`/api/post/${id}`)
      .then(() => {
        toast.success("Post deleted.");
      })
      .catch(() => {
        toast.error("Failed to delete post.");
      })
      .finally(() => {
        setDeleteModalOpen(false);
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
        <Link
          href={`/categories/${categoryName}/${id}`}
          className="bg-neutral-100 absolute size-full rounded-lg inset-0 opacity-0 hover:opacity-100 z-0 transition"
        />
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-1 z-10">
              {authorInfo?.image && (
                <div className="relative size-8">
                  <Image src={authorInfo?.image} alt={author} fill className="rounded-full" />
                </div>
              )}
              <p className="text-sm">{authorInfo?.name}</p>
            </div>
            <div className="flex items-center gap-x-2 z-10">
              <span className="text-xs bg-neutral-100 w-fit rounded-xl px-2 py-1">/{categoryName}</span>
              <Button type="button" onClick={handleLike} className="gap-x-1 bg-blue-500 hover:bg-blue-400">
                <ThumbsUp size={16} fill={isLiked ? "#ffffff" : "#ffffff00"} />
                <p>{likes?.length}</p>
              </Button>
              {authorInfo?.id === currentUser?.id && (
                <PostPopover
                  setEditModalOpen={() => setEditModalOpen(true)}
                  setDeleteModalOpen={() => setDeleteModalOpen(true)}
                />
              )}
            </div>
          </div>
          <CardTitle className="text-2xl z-10 w-fit">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-base">
          <div
            className="max-h-[170px] overflow-hidden relative z-10 lg:max-w-md xl:max-w-xl 2xl:max-w-[810px] w-fit line-clamp-3"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </CardContent>
      </Card>
      <EditModal id={id} content={content} open={editModalOpen} onClose={() => setEditModalOpen(false)} />
      <DeleteModal
        onDelete={handleDelete}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        variant="post"
      />
    </>
  );
};
