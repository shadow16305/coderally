"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/text-area";
import { Button } from "../ui/button";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { CategoryModal } from "./category-modal";
import getCategories from "@/lib/actions/get-categories";
import { CategorySelect } from "../posts/category-select";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import getCurrentUser from "@/lib/actions/get-current-user";
import { useParams, usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PostEditor from "../posts/post-editor";

interface PostModalProps {
  open: boolean;
  onClose: () => void;
}

export const PostModal = ({ open, onClose }: PostModalProps) => {
  const [categories, setCategories] = useState<Category[]>();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const { categorySlug } = useParams();

  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const currentUser = await getCurrentUser();
    let categoryId: string | undefined;

    if (pathname === "/") {
      const selectedCategory = categories?.find((category) => category.name === categoryValue);
      categoryId = selectedCategory?.id;
    } else {
      const slugCategory = categories?.find((category) => category.name === categorySlug);
      categoryId = slugCategory?.id;
    }
    axios
      .post("/api/post", {
        ...data,
        content,
        categoryId,
        authorId: currentUser?.id,
      })
      .then(() => {
        toast.success("Post created :)");
      })
      .catch(() => {
        toast.error("Failed to create a post :(");
      })
      .finally(() => {
        reset();
        router.refresh();
        onClose();
      });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-[91%] md:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Post something!</DialogTitle>
            <DialogDescription>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Label className="text-base" htmlFor="title">
                    Title
                  </Label>
                  <Input id="title" {...register("title")} data-test="post-title-input" />
                </div>
                <div>
                  <Label htmlFor="content" className="text-base">
                    Content
                  </Label>
                  <PostEditor onChange={setContent} />
                </div>
                {pathname === "/" && (
                  <div>
                    <span className="font-medium text-base">Category</span>
                    <div className="flex flex-col md:flex-row md:items-center gap-x-4">
                      <CategorySelect
                        categories={categories}
                        value={categoryValue}
                        setValue={setCategoryValue}
                        data-test="post-category-select"
                      />
                      <span>or</span>
                      <Button
                        variant="secondary"
                        onClick={() => setCategoryModalOpen(true)}
                        type="button"
                        data-test="post-create-category">
                        Create category
                      </Button>
                    </div>
                  </div>
                )}
                <Button type="submit" data-test="post-submit">
                  Post
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
    </>
  );
};
