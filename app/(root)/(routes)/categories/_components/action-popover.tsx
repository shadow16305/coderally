"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { CategoryFollower } from "@prisma/client";
import axios from "axios";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

interface ActionPopoverProps {
  categoryId: string;
  authorId: string;
  userId: string;
  categoryFollowers: CategoryFollower[];
}

export const ActionPopover = ({ categoryId, authorId, userId, categoryFollowers }: ActionPopoverProps) => {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(categoryFollowers.some((follower) => follower.userId === userId));
  }, [categoryFollowers, userId]);

  const handleDelete = async () => {
    axios
      .delete("/api/category", { data: { id: categoryId } })
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
      .post("/api/category/follow", { categoryId })
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
      .delete("/api/category/follow", { data: { categoryId } })
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
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical size={16} className="hover:text-red-500 transition-colors" />
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        {isFollowing ? (
          <Button variant="ghost" onClick={handleUnfollow}>
            Unfollow
          </Button>
        ) : (
          <Button variant="ghost" onClick={handleFollow}>
            Follow
          </Button>
        )}
        <Separator />
        {authorId === userId && (
          <Button variant="destructive" className="rounded-t-none" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};
