import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBox = () => {
  return (
    <form className="flex items-center gap-x-1 border border-input rounded-md pr-2">
      <Button variant="ghost" size="icon" type="submit">
        <Search />
      </Button>
      <Input className="border-none" placeholder="Search..." />
    </form>
  );
};
