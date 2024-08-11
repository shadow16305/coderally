"use client";

import { CategoryModal } from "@/components/modals/category-modal";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/search-box";
import { useState } from "react";

export const CategoryNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-x-4">
        <SearchBox className="w-fit" />
        <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
          Create category
        </Button>
      </div>
      <CategoryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
