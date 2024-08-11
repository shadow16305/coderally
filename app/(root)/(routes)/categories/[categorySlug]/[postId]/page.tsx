const PostPage = ({ params }: { params: { postId: string } }) => {
  return <div>{params.postId}</div>;
};

export default PostPage;
