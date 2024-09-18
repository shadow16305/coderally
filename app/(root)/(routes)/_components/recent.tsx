import { PostCard } from "@/components/posts/post-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Like, Post } from "@prisma/client";

export const Recent = ({ posts }: { posts: (Post & { likes: Like[] })[] }) => {
  return (
    <ScrollArea className="w-full h-full pb-10 pr-10">
      <div className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            categoryId={post.categoryId}
            author={post.authorId}
            likes={post.likes}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
