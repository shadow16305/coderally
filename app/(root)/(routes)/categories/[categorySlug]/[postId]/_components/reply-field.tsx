"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/text-area";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

interface ReplyFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  placeholder?: string;
}

export const ReplyField = ({ onSubmit, placeholder = "Write a reply..." }: ReplyFormProps) => {
  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const handleReplySubmit = async (data: FieldValues) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleReplySubmit)} className="mt-4">
      <Textarea
        placeholder={placeholder}
        className="border-none bg-neutral-100 min-h-[60px]"
        id="content"
        {...register("content")}
      />
      <Button type="submit" variant="secondary" className="mt-4">
        Post reply
      </Button>
    </form>
  );
};
