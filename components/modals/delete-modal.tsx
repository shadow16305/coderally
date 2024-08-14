"use client";

import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";

interface DeleteModalProps {
  category: Category | null;
  open: boolean;
  onClose: () => void;
}

export const DeleteModal = ({ category, onClose, open }: DeleteModalProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    axios
      .delete("/api/category", { data: { id: category?.id } })
      .then(() => {
        toast.success("Category deleted.");
      })
      .catch(() => {
        toast.error("Failed to delete category.");
      })
      .finally(() => {
        router.refresh();
      });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Delete {category?.name}</DialogTitle>
          <DialogDescription>Are you sure you want to delete this category?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" className="w-1/2" onClick={onClose}>
            Cancel
          </Button>
          <Link href="/categories" onClick={handleDelete} className="w-1/2">
            <Button variant="destructive" className="w-full">
              Delete
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
