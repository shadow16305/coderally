"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/text-area";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditModalProps {
  id: string;
  content: string;
}

export const EditModal = ({ id, content }: EditModalProps) => {
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      content: content,
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    axios
      .patch(`/api/post/${id}`, data)
      .then(() => {
        toast.success("Post updated!");
      })
      .catch(() => {
        toast.error("Failed to update post :(");
      })
      .finally(() => {
        router.refresh();
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="content" className="text-base">
                  Content
                </Label>
                <Textarea id="content" {...register("content")} data-test="post-content-input" />
              </div>
              <Button type="submit" data-test="post-submit" className="mt-4">
                Confirm
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
