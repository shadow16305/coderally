import { ScrollArea } from "@/components/ui/scroll-area";

export const CommentGrid = () => {
  return (
    <ScrollArea className="w-full h-full pb-10 pr-10">
      <div className="flex flex-col gap-y-4">
        {/* {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            categoryId={post.categoryId}
            author={post.authorId}
          />
        ))} */}
      </div>
    </ScrollArea>
  );
};
