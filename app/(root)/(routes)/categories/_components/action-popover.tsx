"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Category, CategoryFollower } from "@prisma/client";
import axios from "axios";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { DeleteModal } from "@/components/modals/delete-modal";

interface ActionPopoverProps {
  category: Category;
  authorId: string;
  userId: string | undefined;
  categoryFollowers: CategoryFollower[];
  isLoggedIn: Session | null;
}

export const ActionPopover = ({ category, authorId, userId, categoryFollowers, isLoggedIn }: ActionPopoverProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsFollowing(categoryFollowers.some((follower) => follower.userId === userId));
  }, [categoryFollowers, userId]);

  const handleDelete = async () => {
    axios
      .delete("/api/category", { data: { id: category.id } })
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

  const handleFollow = async () => {
    await axios
      .post("/api/category/follow", { data: { categoryId: category?.id } })
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

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical size={16} className="hover:text-red-500 transition-colors" />
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          {isFollowing ? (
            <Button variant="ghost" onClick={handleUnfollow}>
              Unfollow
            </Button>
          ) : isLoggedIn ? (
            <Button variant="ghost" onClick={handleFollow}>
              Follow
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Log in to follow
            </Button>
          )}
          <Separator />
          {authorId === userId && (
            <Button variant="destructive" className="rounded-t-none w-full" onClick={() => setDeleteModalOpen(true)}>
              Delete
            </Button>
          )}
        </PopoverContent>
      </Popover>
      <DeleteModal
        category={category}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
        variant="category"
      />
    </>
  );
};
