"use client";

import { DeleteModal } from "@/components/modals/delete-modal";
import { PostModal } from "@/components/modals/post-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category, CategoryFollower, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CategoryInfoProps {
  category: (Category & { _count: { followers: number } }) | null;
  author?: User;
  userId: string;
  categoryFollowers: CategoryFollower[];
}

export const CategoryInfo = ({ category, author, userId, categoryFollowers }: CategoryInfoProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsFollowing(categoryFollowers.some((follower) => follower.userId === userId));
  }, [categoryFollowers, userId]);

  const handleFollow = async () => {
    await axios
      .post("/api/category/follow", { categoryId: category?.id })
      .then(() => {
        setIsFollowing(true);
        toast.success("Followed!");
      })
      .catch(() => {
        toast.error("Failed to follow category.");
      })
      .finally(() => {
        router.refresh();
      });
  };

  const handleUnfollow = async () => {
    await axios
      .delete("/api/category/follow", { data: { categoryId: category?.id } })
      .then(() => {
        setIsFollowing(false);
        toast.success("Unfollowed!");
      })
      .catch(() => {
        toast.error("Failed to unfollow category.");
      })
      .finally(() => {
        router.refresh();
      });
  };

  const handleDelete = async () => {
    axios
      .delete("/api/category", { data: { id: category?.id } })
      .then(() => {
        toast.success("Category deleted.");
      })
      .catch(() => {
        toast.error("Failed to delete category.");
      })
      .finally(() => {
        router.refresh();
      });
  };

  const isAuthor = author?.id === userId;

  return (
    <>
      <aside className="space-y-4 w-1/4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Information</h2>
          <p className="text-sm">
            <span className="text-neutral-600">Followers:</span> {category?._count.followers}
          </p>
        </div>
        <p className="text-neutral-600">{category?.description}</p>
        <div className="flex items-center gap-x-4">
          {isFollowing ? (
            <Button
              type="button"
              className={cn("w-1/2", !isAuthor && "w-full")}
              variant="secondary"
              onClick={handleUnfollow}>
              Unfollow
            </Button>
          ) : (
            <Button type="button" className={cn("w-1/2", !isAuthor && "w-full")} onClick={handleFollow}>
              Follow
            </Button>
          )}
          {isAuthor && (
            <Button type="button" variant="destructive" className="w-1/2" onClick={() => setDeleteModalOpen(true)}>
              Delete
            </Button>
          )}
        </div>
        <Button type="button" className="w-full" onClick={() => setPostModalOpen(true)}>
          Post +
        </Button>
      </aside>
      <DeleteModal
        category={category}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        variant="category"
      />
      <PostModal open={postModalOpen} onClose={() => setPostModalOpen(false)} />
    </>
  );
};
