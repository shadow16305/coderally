import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/text-area";
import { Button } from "../ui/button";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface PostModalProps {
  open: boolean;
  onClose: () => void;
}

export const PostModal = ({ open, onClose }: PostModalProps) => {
  const { register, handleSubmit } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("/api/posts", data).then(() => {
      onClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Post something!</DialogTitle>
          <DialogDescription>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label className="text-base" htmlFor="title">
                  Title
                </Label>
                <Input id="title" {...register("title")} />
              </div>
              <div>
                <Label htmlFor="content" className="text-base">
                  Content
                </Label>
                <Textarea id="content" {...register("content")} />
              </div>
              <div>
                <span className="font-medium text-base">Category</span>
                <div className="flex items-center gap-x-4">
                  <Input />
                </div>
              </div>
              <Button type="submit">Post</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
