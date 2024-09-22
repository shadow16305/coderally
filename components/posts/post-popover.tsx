import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";

interface PostPopoverProps {
  setDeleteModalOpen: () => void;
  setEditModalOpen: () => void;
}

export const PostPopover = ({ setDeleteModalOpen, setEditModalOpen }: PostPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical size={20} className="hover:text-red-500 transition-colors" />
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 flex flex-col">
        <Button type="button" variant="secondary" size="sm" onClick={setEditModalOpen} className="rounded-b-none">
          Edit
        </Button>
        <Button type="button" variant="destructive" size="sm" onClick={setDeleteModalOpen} className="rounded-t-none">
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
};
