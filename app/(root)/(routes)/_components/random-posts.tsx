import { PostCard } from "@/components/posts/post-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const RandomPosts = () => {
  return (
    <ScrollArea className="w-full h-screen">
      <div className="flex flex-col gap-y-4">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </ScrollArea>
  );
};
