"use client";

import { Button } from "@/components/ui/button";
import getCurrentUser from "@/lib/actions/get-current-user";
import { ReplyWithChildren } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ReplyField } from "./reply-field";

interface RepliesProps {
  replies: ReplyWithChildren[];
  commentId: string;
  fetchReplies: () => Promise<void>;
}

export const Replies = ({ replies, commentId, fetchReplies }: RepliesProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [replyFieldId, setReplyFieldId] = useState<string | null>(null);

  const router = useRouter();
  const { reset } = useForm<FieldValues>();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  const handleReply: SubmitHandler<FieldValues> = async (data) => {
    if (!currentUser) {
      toast.error("You must be logged in to reply.");
      return;
    }

    axios
      .post("/api/comment/reply", {
        content: data.content,
        authorId: currentUser.id,
        commentId,
        parentId,
      })
      .then(() => {
        toast.success("Reply posted!");
        reset();
        setParentId(null);
        setReplyFieldId(null);
      })
      .catch(() => {
        toast.error("Failed to post reply :(");
      })
      .finally(() => {
        router.refresh();
        fetchReplies();
      });
  };

  const renderReplies = (reply: ReplyWithChildren) => (
    <div key={reply.id} className="pl-6 border-l border-neutral-300 my-4 flex justify-between">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-1">
          <div className="size-8 relative">
            <Image
              src={reply.author.image || "/default-avatar.png"}
              alt={reply.author.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span>{reply.author.name}</span>
        </div>
        <p className="text-gray-700">{reply.content}</p>
        {replyFieldId === reply.id && <ReplyField onSubmit={handleReply} />}
      </div>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setReplyFieldId(replyFieldId === reply.id ? null : reply.id)}>
        {replyFieldId === reply.id ? "Cancel" : "Reply"}
      </Button>
      {reply.children?.map((childReply) => renderReplies(childReply))}
    </div>
  );

  return <div className="mt-4">{replies.map((reply) => renderReplies(reply))}</div>;
};
