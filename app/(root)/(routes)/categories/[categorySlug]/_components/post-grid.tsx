import { PostCard } from "@/components/posts/post-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Like, Post } from "@prisma/client";

interface PostGridProps {
  posts: (Post & { likes: Like[] })[];
  categoryId: string;
}

export const PostGrid = ({ posts, categoryId }: PostGridProps) => {
  const filteredPosts = posts.filter((post) => post.categoryId === categoryId);

  return (
    <ScrollArea className="w-full h-full pb-10 pr-10">
      <div className="flex flex-col gap-y-4">
        {filteredPosts.map((post) => (
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
