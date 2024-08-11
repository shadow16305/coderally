"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/text-area";
import { Label } from "../ui/label";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
}

export const CategoryModal = ({ open, onClose }: CategoryModalProps) => {
  const { register, handleSubmit } = useForm<FieldValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/category", data)
      .then(() => {
        toast.success("Created a new category!");
      })
      .catch(() => {
        toast.error("Failed to create a new category :(");
      })
      .finally(() => {
        router.refresh();
        onClose();
      });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Create a category</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input {...register("name")} id="name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Textarea {...register("description")} id="description" />
              </div>
              <Button type="submit">Create</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
