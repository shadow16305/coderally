"use client";

import { useState, useEffect, useCallback } from "react";
import { Comment, User } from "@prisma/client";
import getCommentReplies from "@/lib/actions/get-comment-replies";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { DeleteModal } from "@/components/modals/delete-modal";
import { ReplyWithChildren } from "@/types";
import { Replies } from "./replies";
import { ReplyField } from "./reply-field";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface CommentItemProps {
  comment: Comment;
  author: User;
  currentUser: User;
}

export const CommentItem = ({ comment, author, currentUser }: CommentItemProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [replies, setReplies] = useState<ReplyWithChildren[]>([]);
  const [replyFieldOpen, setReplyFieldOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const router = useRouter();

  const fetchReplies = useCallback(async () => {
    const commentReplies = await getCommentReplies(comment.id);
    setReplies(commentReplies);
  }, [comment.id]);

  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);

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

  const handleReply: SubmitHandler<FieldValues> = async (data) => {
    axios
      .post("/api/comment/reply", {
        content: data.content,
        authorId: currentUser.id,
        commentId: comment.id,
        parentId: null,
      })
      .then(() => {
        toast.success("Reply posted!");
      })
      .catch(() => {
        toast.error("Failed to post reply :(");
      })
      .finally(() => {
        router.refresh();
        fetchReplies();
        setReplyFieldOpen(false);
        setShowReplies(true);
      });
  };

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
          <Button size="sm" onClick={() => setReplyFieldOpen(!replyFieldOpen)}>
            {replyFieldOpen ? "Cancel" : "Reply"}
          </Button>
        </div>
      </div>
      <p className="text-gray-700 mt-4">{comment.content}</p>
      {replyFieldOpen && <ReplyField onSubmit={handleReply} />}
      {showReplies && <Replies replies={replies} commentId={comment.id} fetchReplies={fetchReplies} />}
      {replies.length > 0 && (
        <Button type="button" variant="ghost" onClick={() => setShowReplies(!showReplies)} className="w-full">
          {showReplies ? "Hide replies" : `Show replies (${replies.length})`}
        </Button>
      )}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        variant="comment"
        onDelete={deleteHandler}
      />
    </div>
  );
};
