"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/text-area";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CommentFormProps {
  postId: string;
  currentUser: User;
}

export const CommentForm = ({ postId, currentUser }: CommentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { register, handleSubmit } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    axios
      .post(`/api/comment`, {
        ...data,
        postId,
        authorId: currentUser?.id,
      })
      .then(() => {
        toast.success("Comment posted!");
      })
      .catch(() => {
        toast.error("Failed to post comment :(");
      })
      .finally(() => {
        router.refresh();
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        placeholder="Write a comment..."
        className="border-none bg-neutral-100 min-h-[60px]"
        id="content"
        {...register("content")}
      />
      <Button type="submit" variant="secondary" className="mt-4" disabled={isLoading}>
        Post
      </Button>
    </form>
  );
};
