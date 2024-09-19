import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { EditModal } from "../modals/edit-modal";

interface PostPopoverProps {
  modalOpen: () => void;
  id: string;
  content: string;
}

export const PostPopover = ({ modalOpen, id, content }: PostPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical size={20} className="hover:text-red-500 transition-colors" />
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 flex flex-col">
        <EditModal id={id} content={content} />
        <Button type="button" variant="destructive" size="sm" onClick={modalOpen} className="rounded-t-none">
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
};
