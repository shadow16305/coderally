import { Dropdown } from "./_components/dropdown";
import { SearchBox } from "../../../components/ui/search-box";
import { Recent } from "./_components/recent";
import { Separator } from "@/components/ui/separator";
import { PopularPosts } from "./_components/popular-posts";
import getPosts from "@/lib/actions/get-posts";

export default async function Home() {
  const posts = await getPosts();

  const sortedPosts = [...posts];

  const recentPosts = sortedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const topPopularPosts = sortedPosts.sort((a, b) => b.likes.length - a.likes.length).slice(0, 3);

  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 size-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-semibold text-3xl lg:text-4xl">Home</h1>
          <div className="flex items-center gap-x-2">
            <Dropdown />
            <SearchBox />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-full h-[91%] mt-8">
          <div className="w-full lg:w-[62%] space-y-2">
            <h2 className="text-2xl font-semibold">Recent</h2>
            <Recent posts={recentPosts} />
          </div>
          <Separator orientation="vertical" className="hidden lg:block" />
          <div className="w-full lg:w-1/3 space-y-2">
            <h3 className="text-2xl font-semibold">Popular</h3>
            <PopularPosts posts={topPopularPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
