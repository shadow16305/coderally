import { Category } from "@prisma/client";
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
  category?: Category | null;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  variant: "post" | "category" | "comment";
}

export const DeleteModal = ({ category, onClose, open, onDelete, variant }: DeleteModalProps) => {
  const variantLabels: { [key in DeleteModalProps["variant"]]: string } = {
    post: "post",
    category: "category",
    comment: "comment",
  };

  const variantLabel = variantLabels[variant];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[91%] sm:max-w-lg">
        <DialogHeader className="space-y-2 lg:space-y-4">
          <DialogTitle>Delete {category?.name}</DialogTitle>
          <DialogDescription>Are you sure you want to delete this {variantLabel}?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" className="w-1/2" onClick={onClose}>
            Cancel
          </Button>
          {variant === "category" ? (
            <Link href="/categories" onClick={onDelete} className="w-1/2">
              <Button variant="destructive" className="w-full">
                Delete
              </Button>
            </Link>
          ) : (
            <Button variant="destructive" className="w-1/2" onClick={onDelete}>
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
