"use client";

import { CategoryModal } from "@/components/modals/category-modal";
import { PostModal } from "@/components/modals/post-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="hover:bg-neutral-100 transition-colors p-2 rounded-md focus:outline-none"
          data-test="home-dropdown-create">
          <Plus />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)} data-test="home-dropdown-post">
            Add post
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setCategoryModalOpen(true)}>Create category</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PostModal open={open} onClose={() => setOpen(false)} />
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
    </>
  );
};
