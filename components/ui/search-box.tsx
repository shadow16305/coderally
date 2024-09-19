"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export const SearchBox = ({ className }: { className?: string }) => {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/search/${inputValue}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex items-center gap-x-1 border border-input rounded-md pr-2", className)}>
      <Button variant="ghost" size="icon" type="submit">
        <Search />
      </Button>
      <Input className="border-none" placeholder="Search..." onChange={inputHandler} />
    </form>
  );
};
