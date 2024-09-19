import { PostCard } from "@/components/posts/post-card";
import { Like, Post } from "@prisma/client";

export const PopularPosts = ({ posts }: { posts: (Post & { likes: Like[] })[] }) => {
  return (
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
  );
};
