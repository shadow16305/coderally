import getSinglePost from "@/lib/actions/get-single-post";
import { Post } from "@prisma/client";
import { CommentGrid } from "./_components/comment-grid";
import { Separator } from "@/components/ui/separator";
import getAllUsers from "@/lib/actions/get-all-users";
import Image from "next/image";

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const post = (await getSinglePost(params.postId)) as Post | null;
  const users = await getAllUsers();
  const author = users?.find((user) => post?.authorId === user.id);

  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 size-full">
        <div className="flex items-center gap-x-4">
          {author?.image && (
            <div className="relative size-12">
              <Image src={author?.image} alt={author?.name} fill className="rounded-full" />
            </div>
          )}
          <h1 className="font-semibold text-4xl">{post?.title}</h1>
        </div>
        <div className="flex justify-between h-[91%]">
          <div className="w-8/12">
            <p className="pb-4">{post?.content}</p>
            <Separator />
            <CommentGrid />
          </div>
          <Separator orientation="vertical" />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
