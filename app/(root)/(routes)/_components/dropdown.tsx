"use client";

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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-neutral-100 transition-colors p-2 rounded-md focus:outline-none">
          <Plus />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>Add post</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Create category</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PostModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
