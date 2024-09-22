import { PostCard } from "@/components/posts/post-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import getLikedPosts from "@/lib/actions/get-liked-posts";

const LikedPage = async () => {
  const posts = await getLikedPosts();

  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 size-full">
        <h1 className="font-semibold text-3xl lg:text-4xl">Liked posts</h1>
        {posts && posts.length > 0 ? (
          <ScrollArea className="h-3/4 w-full">
            <div className="flex flex-col lg:flex-row flex-wrap gap-4 w-full">
              {posts.map((post) => (
                <div className="lg:w-5/12">
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    categoryId={post.categoryId}
                    content={post.content}
                    author={post.authorId}
                    likes={post.likes}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p>No liked posts...</p>
        )}
      </div>
    </div>
  );
};

export default LikedPage;
