import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export const SearchBox = ({ className }: { className?: string }) => {
  return (
    <form className={cn("flex items-center gap-x-1 border border-input rounded-md pr-2", className)}>
      <Button variant="ghost" size="icon" type="submit">
        <Search />
      </Button>
      <Input className="border-none" placeholder="Search..." />
    </form>
  );
};
