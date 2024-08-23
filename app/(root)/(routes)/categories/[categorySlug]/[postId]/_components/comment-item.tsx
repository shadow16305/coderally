"use client";

import { DeleteModal } from "@/components/modals/delete-modal";
import { Button } from "@/components/ui/button";
import { Comment, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CommentItemProps {
  comment: Comment;
  author: User;
  currentUser: User;
}

export const CommentItem = ({ comment, author, currentUser }: CommentItemProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const router = useRouter();

  const deleteHandler = async () => {
    axios
      .delete("/api/comment", { data: { id: comment.id } })
      .then(() => {
        toast.success("Comment deleted!");
      })
      .catch(() => {
        toast.error("Failed to delete comment :(");
      })
      .finally(() => {
        router.refresh();
      });
  };

  return (
    <>
      <div key={comment.id} className="space-y-2 p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            {author && (
              <>
                <div className="relative size-8">
                  <Image src={author.image || "/default-avatar.png"} alt={author.name} fill className="rounded-full" />
                </div>
                <span className="font-medium">{author.name}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-x-2">
            {currentUser.id === author.id && (
              <>
                <Button variant="destructive" size="sm" onClick={() => setDeleteModalOpen(true)}>
                  Delete
                </Button>
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
              </>
            )}
            <Button size="sm">Reply</Button>
          </div>
        </div>
        <p className="text-gray-700">{comment.content}</p>
      </div>
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        variant="comment"
        onDelete={deleteHandler}
      />
    </>
  );
};
