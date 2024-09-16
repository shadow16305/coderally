"use client";

import { useState, useEffect } from "react";
import { Comment, User } from "@prisma/client";
import getCommentReplies from "@/lib/actions/get-comment-replies";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { DeleteModal } from "@/components/modals/delete-modal";
import { ReplyWithChildren } from "@/types";

interface CommentItemProps {
  comment: Comment;
  author: User;
  currentUser: User;
}

export const CommentItem = ({ comment, author, currentUser }: CommentItemProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [replies, setReplies] = useState<ReplyWithChildren[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchReplies = async () => {
      const commentReplies = await getCommentReplies(comment.id);
      setReplies(commentReplies);
    };
    fetchReplies();
  }, []);

  const handleReply = async (content: string, parentId?: string) => {
    axios
      .post("/api/comment/reply", {
        content,
        authorId: currentUser.id,
        commentId: comment.id,
        parentId,
      })
      .then(() => {
        toast.success("Reply posted!");
      })
      .catch(() => {
        toast.error("Failed to post reply :(");
      })
      .finally(() => {
        router.refresh();
      });
  };

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

  const renderReplies = (reply: ReplyWithChildren) => (
    <div key={reply.id} className="pl-6 border-l border-neutral-300 my-4 flex justify-between">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-1">
          <div className="size-8 relative">
            <Image
              src={author.image || "/default-avatar.png"}
              alt={author.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span>{author.name}</span>
        </div>
        <p className="text-gray-700">{reply.content}</p>
      </div>
      <Button size="sm" onClick={() => handleReply("Replying to this comment", reply.id)}>
        Reply
      </Button>
      {reply.children?.map((childReply) => renderReplies(childReply))}
    </div>
  );

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 relative">
            <Image
              src={author.image || "/default-avatar.png"}
              alt={author.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span>{author.name}</span>
        </div>
        <div className="flex items-center gap-2">
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
          <Button size="sm" onClick={() => handleReply("Replying to this comment")}>
            Reply
          </Button>
        </div>
      </div>
      <p className="text-gray-700">{comment.content}</p>
      <div className="mt-4">{replies.map((reply) => renderReplies(reply))}</div>
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        variant="comment"
        onDelete={deleteHandler}
      />
    </div>
  );
};
