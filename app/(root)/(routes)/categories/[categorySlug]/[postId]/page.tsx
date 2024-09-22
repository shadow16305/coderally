import getSinglePost from "@/lib/actions/get-single-post";
import { Post } from "@prisma/client";
import { CommentGrid } from "./_components/comment-grid";
import { Separator } from "@/components/ui/separator";
import getAllUsers from "@/lib/actions/get-all-users";
import Image from "next/image";
import getPosts from "@/lib/actions/get-posts";
import { PostCard } from "@/components/posts/post-card";
import getComments from "@/lib/actions/get-comments";
import getCurrentUser from "@/lib/actions/get-current-user";

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const post = (await getSinglePost(params.postId)) as Post | null;
  const users = await getAllUsers();
  const posts = await getPosts();
  const comments = await getComments(params.postId);
  const currentUser = await getCurrentUser();

  const author = users?.find((user) => post?.authorId === user.id);
  const filteredPosts = posts.filter(
    (postItem) => postItem.categoryId === post?.categoryId && postItem.id != params.postId
  );

  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 size-full">
        <div className="flex items-center gap-x-4">
          {author?.image && (
            <div className="relative size-12">
              <Image src={author?.image} alt={author?.name} fill className="rounded-full" />
            </div>
          )}
          <h1 className="font-semibold text-3xl lg:text-4xl">{post?.title}</h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:h-[91%]">
          <div className="lg:w-8/12 space-y-4">
            <div dangerouslySetInnerHTML={{ __html: post!.content }} />
            <Separator />
            <CommentGrid postId={params.postId} comments={comments} users={users!} currentUser={currentUser!} />
          </div>
          <Separator orientation="vertical" className="hidden lg:block" />
          <aside className="space-y-4 lg:w-[29%]">
            <h2 className="text-2xl font-semibold">Other posts</h2>
            <div className="flex flex-col gap-y-4">
              {filteredPosts.slice(0, 4).map((postItem) => (
                <PostCard
                  key={postItem.id}
                  id={postItem.id}
                  title={postItem.title}
                  content={postItem.content}
                  categoryId={postItem.categoryId}
                  author={postItem.author.id}
                  likes={postItem.likes}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
