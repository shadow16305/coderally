"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PostEditor from "../posts/post-editor";
import { useState } from "react";

interface EditModalProps {
  id: string;
  content: string;
  open: boolean;
  onClose: () => void;
}

export const EditModal = ({ id, content, open, onClose }: EditModalProps) => {
  const [editedContent, setEditedContent] = useState("");

  const { handleSubmit } = useForm<FieldValues>();

  const router = useRouter();

  const onSubmit = async () => {
    axios
      .patch(`/api/post/${id}`, { content: editedContent })
      .then(() => {
        toast.success("Post updated!");
      })
      .catch(() => {
        toast.error("Failed to update post :(");
      })
      .finally(() => {
        onClose();
        router.refresh();
      });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[91%] md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="content" className="text-base">
                  Content
                </Label>
                <PostEditor onChange={setEditedContent} defaultContent={content} />
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
