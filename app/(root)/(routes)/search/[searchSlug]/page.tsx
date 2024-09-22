import { SearchBox } from "@/components/ui/search-box";
import { Dropdown } from "../../_components/dropdown";
import getPosts from "@/lib/actions/get-posts";
import { PostCard } from "@/components/posts/post-card";

const SearchValuePage = async ({ params }: { params: { searchSlug: string } }) => {
  const posts = await getPosts();

  const filteredPosts =
    posts && posts.filter((post) => post.title.toLowerCase().includes(params.searchSlug.toLowerCase()));

  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 size-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-semibold text-3xl lg:text-4xl">Search</h1>
          <div className="flex items-center gap-x-2">
            <Dropdown />
          </div>
        </div>
        <div className="w-1/2 mt-4">
          <SearchBox />
        </div>
        <div className="flex flex-wrap gap-x-4 w-full mt-4">
          {filteredPosts.map((post) => (
            <div className="w-5/12">
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
      </div>
    </div>
  );
};

export default SearchValuePage;
