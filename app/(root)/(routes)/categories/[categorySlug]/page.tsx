import { SearchBox } from "@/components/ui/search-box";
import getSingleCategory from "@/lib/actions/get-single-category";
import { PostGrid } from "./_components/post-grid";
import { Separator } from "@/components/ui/separator";
import getAllUsers from "@/lib/actions/get-all-users";
import { CategoryInfo } from "./_components/category-info";
import getCurrentUser from "@/lib/actions/get-current-user";
import getFollowedCategories from "@/lib/actions/get-followed-categories";

const CategoryPage = async ({ params }: { params: { categorySlug: string } }) => {
  const { categorySlug } = params;

  const category = await getSingleCategory(categorySlug);
  const users = await getAllUsers();
  const currentUser = await getCurrentUser();
  const categoryFollowers = await getFollowedCategories();

  const author = users?.find((user) => user.id === category?.authorId);

  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 size-full">
        <h1 className="font-semibold text-4xl">{categorySlug}</h1>
        <SearchBox className="w-fit" />
        <div className="flex justify-between h-[91%]">
          <div className="w-8/12">
            {category?.posts && <PostGrid posts={category?.posts} categoryId={category.id} />}
          </div>
          <Separator orientation="vertical" />
          <CategoryInfo
            category={category}
            author={author}
            userId={currentUser!.id}
            categoryFollowers={categoryFollowers.filter((follower) => follower.categoryId === category!.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
