import { ScrollArea } from "@/components/ui/scroll-area";
import { CommentForm } from "./comment-form";
import { Comment, User } from "@prisma/client";
import { CommentItem } from "./comment-item";

interface CommentGridProps {
  postId: string;
  comments: Comment[];
  users: User[];
  currentUser: User;
}

const getCommentItems = (comments: Comment[], users: User[]) => {
  return comments.map((comment) => {
    const author = users.find((user) => user.id === comment.authorId);
    return { comment, author };
  });
};

export const CommentGrid = ({ postId, comments, users, currentUser }: CommentGridProps) => {
  const commentItems = getCommentItems(comments, users);

  return (
    <>
      <CommentForm postId={postId} currentUser={currentUser} />
      <ScrollArea className="w-full h-full pb-10 pr-10">
        <div className="flex flex-col gap-y-4">
          {commentItems.map(({ comment, author }) => (
            <CommentItem key={comment.id} author={author!} comment={comment} currentUser={currentUser} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};
